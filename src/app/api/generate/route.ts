import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { type GenerateStorySchema, generateStorySchema, storySchema } from '@/types/stories';
import { env } from '@/env.mjs';

export async function POST(req: Request) {
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

  const model = openai('gpt-4o-mini');

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
    console.error('Failed to generate story:', error);
    return new NextResponse('Failed to generate story', {
      status: 500,
    });
  }
}

const constructStoryPrompt = (validationResult: GenerateStorySchema) => {
  const { childName, childAge, readingLevel, petName, petType, storyTheme, additionalDetails } =
    validationResult;

  const promptPieces: string[] = [];

  promptPieces.push(`Create a children's story with the following details:
- Main character: ${childName}, who is ${childAge} years old
- Reading level: ${readingLevel} (${readingLevel === 'beginner' ? 'ages 3-5' : readingLevel === 'intermediate' ? 'ages 6-8' : 'ages 9-12'})
- Theme: ${storyTheme}`);

  if (petName && petType) promptPieces.push(`- Pet: ${petName} the ${petType}`);

  if (additionalDetails) promptPieces.push(`- Additional details: ${additionalDetails}`);

  promptPieces.push(
    '\nPlease structure the story in JSON format with a title and content array. The content array should alternate between text and places for illustrations.'
  );

  return promptPieces.join('\n');
};
