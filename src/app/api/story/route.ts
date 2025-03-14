import { auth } from '@clerk/nextjs/server';
import { storySchema } from '@/types/stories';
import { createSuccessResponse, handleError } from '@/lib/responseHelpers';
import { StoryService } from '@/services/storyService';
import { UnauthorizedError, ValidationError } from '@/lib/errors';

// Create a singleton instance of the story service
const storyService = new StoryService();

// GET /api/story - Get all stories for the current user
export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new UnauthorizedError();
    }

    // Get all stories for the user
    const stories = await storyService.getAllStories(userId);
    return createSuccessResponse(stories);
  } catch (error) {
    return handleError(error);
  }
}

// POST /api/story - Create a new story
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new UnauthorizedError();
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = storySchema.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError('Invalid request body', validationResult.error.format());
    }

    const storyData = validationResult.data;
    const newStory = await storyService.createStory(storyData, userId);

    return createSuccessResponse(newStory);
  } catch (error) {
    return handleError(error);
  }
}
