import { z } from 'zod';

// Validate request body
export const generateStorySchema = z.object({
  childName: z.string().min(1),
  childAge: z.string().min(1),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  petName: z.string().optional(),
  petType: z.string().optional(),
  storyTheme: z.string().min(1),
  additionalDetails: z.string().optional(),
});

export type GenerateStorySchema = z.infer<typeof generateStorySchema>;

// Define Zod schema for the expected story structure
export const storyContentSchema = z.array(
  z.object({
    type: z.enum(['text', 'image']),
    content: z.string().optional(), // Text content might be optional
    alt: z.string().optional(), // Image alt text
  }),
);

export const storyChapterSchema = z.object({
  title: z.string(),
  content: storyContentSchema,
});

export const storySchema = z.object({
  title: z.string(),
  chapters: z.array(storyChapterSchema),
  thumbnail: z.string(),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

// Define the type based on the schema
export type Story = z.infer<typeof storySchema>;
