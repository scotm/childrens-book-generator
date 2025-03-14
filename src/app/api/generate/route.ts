import { env } from '@/env.mjs';
import { STORY_SYSTEM_PROMPT } from '@/lib/constants';
import { UnauthorizedError, ValidationError } from '@/lib/errors';
import { createSuccessResponse, handleError } from '@/lib/responseHelpers';
import { constructStoryPrompt } from '@/lib/storyPrompts';
import { generateStorySchema, storySchema } from '@/types/stories';
import { openai } from '@ai-sdk/openai';
import { auth } from '@clerk/nextjs/server';
import { generateObject } from 'ai';

// Create OpenAI model instance - could be moved to a shared config if used elsewhere
const model = openai('gpt-4o-mini');

export async function POST(req: Request) {
  try {
    // Auth check
    if (env.AUTH_NEEDED) {
      const { userId } = await auth();
      if (!userId) {
        throw new UnauthorizedError();
      }
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = generateStorySchema.safeParse(body);

    if (!validationResult.success) {
      throw new ValidationError('Invalid request body', validationResult.error.format());
    }

    // Generate story
    const prompt = constructStoryPrompt(validationResult.data);
    const storyResponse = await generateObject({
      model,
      schema: storySchema,
      system: STORY_SYSTEM_PROMPT,
      prompt,
    });

    return createSuccessResponse(storyResponse);
  } catch (error) {
    return handleError(error);
  }
}
