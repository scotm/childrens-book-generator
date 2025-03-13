import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { type GenerateStorySchema, generateStorySchema, storySchema } from '@/types/stories';
import { env } from '@/env.mjs';

export async function POST(req: Request, openaiConfig?: { model: string }) {
  if (env.AUTH_NEEDED) {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  // Parse and validate request body
  const validationResult = generateStorySchema.safeParse(await req.json());

  if (!validationResult.success) return new NextResponse('Invalid request body', { status: 400 });

  const prompt = constructStoryPrompt(validationResult.data);

  const model = openai(openaiConfig?.model || 'gpt-4o-mini');

  try {
    const storyResponse = await generateObject({
      model,
      schema: storySchema,
      system:
        "You are a children's book author. Create engaging stories appropriate for the specified age group. Include descriptive image suggestions at key moments. Output *only* JSON, strictly conforming to the structure { title: string, content: Array<{type: 'text' | 'image', content?: string, alt?: string}> }.",
      prompt,
    });
    return NextResponse.json(storyResponse);
  } catch (error) {
    if (error instanceof Error && error.message.includes('OpenAI')) {
      // Example: Check for OpenAI errors
      return new NextResponse('Error communicating with OpenAI.', {
        status: 500,
      });
    }
    if (error instanceof Error && error.message.includes('validation')) {
      return new NextResponse('Invalid request body', { status: 400 });
    }
    if (error instanceof Error && error.message.includes('rate limit')) {
      return new NextResponse('Rate limit exceeded', { status: 429 });
    }

    return new NextResponse('Failed to generate story', {
      status: 500,
    });
  }
}
const constructStoryPrompt = (validationResult: GenerateStorySchema) => {
  const { childName, childAge, readingLevel, petName, petType, storyTheme, additionalDetails } =
    validationResult;

  const ageRange =
    readingLevel === 'beginner'
      ? 'ages 3-5'
      : readingLevel === 'intermediate'
        ? 'ages 6-8'
        : 'ages 9-12';

  const basePrompt = `Create a children's story with the following details:
- Main character: ${childName}, who is ${childAge} years old
- Reading level: ${readingLevel} (${ageRange})
- Theme: ${storyTheme}`;

  let prompt = basePrompt;

  if (petName && petType) prompt += `\n- Pet: ${petName} the ${petType}`;

  if (additionalDetails) prompt += `\n- Additional details: ${additionalDetails}`;

  prompt +=
    '\nPlease structure the story in JSON format with a title and content array. The content array should alternate between text and places for illustrations.';

  return prompt;
};
