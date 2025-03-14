import { auth } from '@clerk/nextjs/server';
import { createSuccessResponse, handleError } from '@/lib/responseHelpers';
import { StoryService } from '@/services/storyService';
import { NotFoundError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { UpdateStoryDto } from '@/types/dtos';

// Create a singleton instance of the story service
const storyService = new StoryService();

// GET /api/story/[storyId] - Get a specific story with its chapters and content
export async function GET(req: Request, { params }: { params: { storyId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new UnauthorizedError();
    }

    const id = Number.parseInt(params.storyId, 10);
    if (Number.isNaN(id)) {
      throw new ValidationError('Invalid story ID');
    }

    const story = await storyService.getStoryById(id, userId);
    if (!story) {
      throw new NotFoundError('Story not found');
    }

    return createSuccessResponse(story);
  } catch (error) {
    return handleError(error);
  }
}

// PUT /api/story/[storyId] - Update a story
export async function PUT(req: Request, { params }: { params: { storyId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new UnauthorizedError();
    }

    const id = Number.parseInt(params.storyId, 10);
    if (Number.isNaN(id)) {
      throw new ValidationError('Invalid story ID');
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = UpdateStoryDto.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError('Invalid request body', validationResult.error.format());
    }

    const updatedStory = await storyService.updateStory(id, userId, validationResult.data);

    if (!updatedStory) {
      throw new NotFoundError('Story not found');
    }

    return createSuccessResponse(updatedStory);
  } catch (error) {
    return handleError(error);
  }
}

// DELETE /api/story/[storyId] - Delete a story
export async function DELETE(req: Request, { params }: { params: { storyId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new UnauthorizedError();
    }

    const id = Number.parseInt(params.storyId, 10);
    if (Number.isNaN(id)) {
      throw new ValidationError('Invalid story ID');
    }

    const success = await storyService.deleteStory(id, userId);

    if (!success) {
      throw new NotFoundError('Story not found');
    }

    return createSuccessResponse({ message: 'Story deleted successfully' });
  } catch (error) {
    return handleError(error);
  }
}
