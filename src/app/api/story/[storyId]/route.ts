import { auth } from '@clerk/nextjs/server';
import { createSuccessResponse, handleError } from '@/lib/responseHelpers';
import { StoryService } from '@/services/storyService';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import { validateId } from '@/lib/utils/validateId';
import { UpdateStoryDto } from '@/types/dtos';

// Create a singleton instance of the story service
const storyService = new StoryService();

// Utility function to validate authentication
async function validateAuth() {
  const { userId } = await auth();
  if (!userId) throw new UnauthorizedError();
  return userId;
}

// Utility function to parse and validate story ID
// Accept the storyId value from the URL path parameters
export function validateStoryId(storyId: string | undefined) {
  return validateId(storyId);
}

// Higher-order function to handle route execution with error handling
async function executeRoute<T>(handler: () => Promise<T>) {
  try {
    const result = await handler();
    return createSuccessResponse(result);
  } catch (error) {
    return handleError(error);
  }
}

// GET /api/story/[storyId] - Get a specific story with its chapters and content
export async function GET(
  req: Request,
  context: { params: { storyId: string } }
) {
  return executeRoute(async () => {
    const userId = await validateAuth();
    const id = validateStoryId(context.params.storyId);

    const story = await storyService.getStoryById(id, userId);
    if (!story) throw new NotFoundError('Story not found');

    return story;
  });
}

// PUT /api/story/[storyId] - Update a story
export async function PUT(
  req: Request,
  context: { params: { storyId: string } }
) {
  return executeRoute(async () => {
    const userId = await validateAuth();
    const id = validateStoryId(context.params.storyId);

    const body = await req.json();
    const validationResult = UpdateStoryDto.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError('Invalid request body', validationResult.error.format());
    }

    const updatedStory = await storyService.updateStory(id, userId, validationResult.data);
    if (!updatedStory) throw new NotFoundError('Story not found');

    return updatedStory;
  });
}

// DELETE /api/story/[storyId] - Delete a story
export async function DELETE(
  req: Request,
  context: { params: { storyId: string } }
) {
  return executeRoute(async () => {
    const userId = await validateAuth();
    const id = validateStoryId(context.params.storyId);

    const success = await storyService.deleteStory(id, userId);
    if (!success) throw new NotFoundError('Story not found');

    return { message: 'Story deleted successfully' };
  });
}
