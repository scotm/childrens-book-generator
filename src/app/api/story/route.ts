import { auth } from '@clerk/nextjs/server';
import { storySchema } from '@/types/stories';
import { createSuccessResponse, handleError } from '@/lib/responseHelpers';
import { StoryService } from '@/services/storyService';
import { UnauthorizedError, ValidationError } from '@/lib/errors';

// Create a singleton instance of the story service
const storyService = new StoryService();

// Higher-order function to handle auth and error handling
const withAuth = async (
  handler: (userId: string, req: Request) => Promise<Response>,
  req: Request
) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new UnauthorizedError();
    return await handler(userId, req);
  } catch (error) {
    return handleError(error);
  }
};

// GET /api/story - Get all stories for the current user
export async function GET(req: Request) {
  return withAuth(async (userId) => {
    const stories = await storyService.getAllStories(userId);
    return createSuccessResponse(stories);
  }, req);
}

// POST /api/story - Create a new story
export async function POST(req: Request) {
  return withAuth(async (userId, req) => {
    const body = await req.json();
    const validationResult = storySchema.safeParse(body);

    if (!validationResult.success)
      throw new ValidationError('Invalid request body', validationResult.error.format());

    const newStory = await storyService.createStory(validationResult.data, userId);
    return createSuccessResponse(newStory);
  }, req);
}
