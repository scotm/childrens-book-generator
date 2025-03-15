import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Story } from '@/db/schema';
import type { storySchema } from '@/types/stories';
import { z } from 'zod';

// API response type as Zod schema
const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string(),
  details: z.unknown().optional(),
});

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: apiErrorSchema.optional(),
  });

// Inferred type from the schema
type ApiResponse<T> = z.infer<ReturnType<typeof createApiResponseSchema<z.ZodType<T>>>>;

// Story with chapters and content
interface StoryWithChapters extends Story {
  chapters: Array<{
    id: number;
    story_id: number;
    chapter_number: number;
    title: string;
    content: Array<{
      id: number;
      chapter_id: number;
      content_number: number;
      type: 'text' | 'image';
      content: Record<string, unknown>;
    }>;
  }>;
}

// Type for story update data
interface UpdateStoryData {
  title: string;
  thumbnail: string;
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
}

// Fetch all stories
export function useStories() {
  return useQuery<Story[]>({
    queryKey: ['stories'],
    queryFn: async () => {
      const response = await fetch('/api/story');
      const rawData = await response.json();
      const result = createApiResponseSchema(z.array(z.custom<Story>())).parse(rawData);

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to fetch stories');
      }

      return result.data;
    },
  });
}

// Fetch a single story by ID
export function useStory(id: string) {
  return useQuery<StoryWithChapters>({
    queryKey: ['story', id],
    queryFn: async () => {
      const response = await fetch(`/api/story/${id}`);
      const rawData = await response.json();
      const result = createApiResponseSchema(z.custom<StoryWithChapters>()).parse(rawData);

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to fetch story');
      }

      return result.data;
    },
    enabled: !!id,
  });
}

// Create a new story
export function useCreateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storyData: z.infer<typeof storySchema>) => {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      });

      const rawData = await response.json();
      const result = createApiResponseSchema(z.custom<Story>()).parse(rawData);

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to create story');
      }

      return result.data;
    },
    onMutate: async (newStoryData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['stories'] });

      // Snapshot the previous value
      const previousStories = queryClient.getQueryData<Story[]>(['stories']) || [];

      // Create a temporary optimistic story
      const optimisticStory: Story = {
        id: Math.floor(Math.random() * -1000000), // Temporary negative ID
        user_id: 'current-user', // This will be replaced by the server
        title: newStoryData.title,
        thumbnail: newStoryData.thumbnail,
        readingLevel: newStoryData.readingLevel,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Optimistically update the stories list
      queryClient.setQueryData<Story[]>(['stories'], (old) => [...(old || []), optimisticStory]);

      return { previousStories };
    },
    onError: (err, newStory, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousStories) {
        queryClient.setQueryData<Story[]>(['stories'], context.previousStories);
      }
    },
    onSuccess: (newStory) => {
      // Invalidate the stories query to refetch the list with the actual server data
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

// Update a story
export function useUpdateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateStoryData }) => {
      const response = await fetch(`/api/story/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const rawData = await response.json();
      const result = createApiResponseSchema(z.custom<Story>()).parse(rawData);

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to update story');
      }

      return result.data;
    },
    onMutate: async ({ id, data }) => {
      // Convert id to number if needed (since our schema uses number IDs)
      const numericId = Number.parseInt(id, 10);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['story', id] });
      await queryClient.cancelQueries({ queryKey: ['stories'] });

      // Snapshot the previous values
      const previousStory = queryClient.getQueryData<StoryWithChapters>(['story', id]);
      const previousStories = queryClient.getQueryData<Story[]>(['stories']);

      // Update the single story in the cache
      if (previousStory) {
        const updatedStory = {
          ...previousStory,
          title: data.title,
          thumbnail: data.thumbnail,
          readingLevel: data.readingLevel,
          updatedAt: new Date(),
        };

        queryClient.setQueryData(['story', id], updatedStory);
      }

      // Update the story in the stories list
      if (previousStories) {
        const updatedStories = previousStories.map((story) =>
          story.id === numericId
            ? {
                ...story,
                title: data.title,
                thumbnail: data.thumbnail,
                readingLevel: data.readingLevel,
                updatedAt: new Date(),
              }
            : story,
        );

        queryClient.setQueryData<Story[]>(['stories'], updatedStories);
      }

      return { previousStory, previousStories };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousStory) {
        queryClient.setQueryData(['story', variables.id], context.previousStory);
      }

      if (context?.previousStories) {
        queryClient.setQueryData<Story[]>(['stories'], context.previousStories);
      }
    },
    onSuccess: (updatedStory, variables) => {
      // Invalidate queries to ensure consistency with server data
      queryClient.invalidateQueries({ queryKey: ['story', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

// Delete a story
export function useDeleteStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/story/${id}`, {
        method: 'DELETE',
      });

      const rawData = await response.json();
      const result = createApiResponseSchema(z.object({ message: z.string() })).parse(rawData);

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to delete story');
      }

      return result.data;
    },
    onMutate: async (id) => {
      // Convert id to number if needed
      const numericId = Number.parseInt(id, 10);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['stories'] });
      await queryClient.cancelQueries({ queryKey: ['story', id] });

      // Snapshot the previous values
      const previousStories = queryClient.getQueryData<Story[]>(['stories']);
      const previousStory = queryClient.getQueryData<StoryWithChapters>(['story', id]);

      // Optimistically remove the story from the stories list
      if (previousStories) {
        queryClient.setQueryData<Story[]>(
          ['stories'],
          previousStories.filter((story) => story.id !== numericId),
        );
      }

      // Optimistically remove the single story query
      queryClient.removeQueries({ queryKey: ['story', id] });

      return { previousStories, previousStory };
    },
    onError: (err, id, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousStories) {
        queryClient.setQueryData<Story[]>(['stories'], context.previousStories);
      }

      if (context?.previousStory) {
        queryClient.setQueryData(['story', id], context.previousStory);
      }
    },
    onSuccess: (_, id) => {
      // Invalidate the stories query to ensure consistency with server data
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      // Ensure the story is removed from the cache
      queryClient.removeQueries({ queryKey: ['story', id] });
    },
  });
}
