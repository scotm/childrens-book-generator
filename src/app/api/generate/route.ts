import { env } from '@/env.mjs';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// Validate request body
const generateStorySchema = z.object({
  childName: z.string().min(1),
  childAge: z.string().min(1),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  petName: z.string().optional(),
  petType: z.string().optional(),
  storyTheme: z.string().min(1),
  additionalDetails: z.string().optional(),
});

// Define Zod schema for the expected story structure
const storyContentSchema = z.array(
  z.object({
    type: z.enum(['text', 'image']),
    content: z.string().optional(), // Text content might be optional
    alt: z.string().optional(), // Image alt text
  })
);

const storySchema = z.object({
  title: z.string(),
  content: storyContentSchema,
});

// Define the type based on the schema
type Story = z.infer<typeof storySchema>;

export async function POST(req: Request) {
  try {
    // Validate authentication
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = generateStorySchema.safeParse(body);

    if (!validationResult.success) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const { childName, childAge, readingLevel, petName, petType, storyTheme, additionalDetails } =
      validationResult.data;

    // Build prompt for OpenAI
    let prompt = `Create a children's story with the following details:
- Main character: ${childName}, who is ${childAge} years old
- Reading level: ${readingLevel} (${readingLevel === 'beginner' ? 'ages 3-5' : readingLevel === 'intermediate' ? 'ages 6-8' : 'ages 9-12'})
- Theme: ${storyTheme}`;

    if (petName && petType) {
      prompt += `\n- Pet: ${petName} the ${petType}`;
    }

    if (additionalDetails) {
      prompt += `\n- Additional details: ${additionalDetails}`;
    }

    prompt +=
      '\n\nPlease structure the story in JSON format with a title and content array. The content array should alternate between text and places for illustrations.'; // Removed example, as it's handled by response_format

    // Call OpenAI API with JSON mode
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Ensure you're using a model that supports JSON mode
      response_format: { type: 'json_object' }, // Enable JSON mode
      messages: [
        {
          role: 'system',
          content:
            "You are a children's book author. Create engaging stories appropriate for the specified age group. Include descriptive image suggestions at key moments.  Output *only* JSON, strictly conforming to the structure { title: string, content: Array<{type: 'text' | 'image', content?: string, alt?: string}> }.",
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      return new NextResponse('No content returned from OpenAI', {
        status: 500,
      });
    }

    // Parse and validate JSON from the response
    try {
      const parsedResponse = JSON.parse(responseContent);
      const validatedStory = storySchema.parse(parsedResponse); // Validate and get typed object

      // Return the generated story
      return NextResponse.json(validatedStory);
    } catch (error) {
      console.error('Failed to parse or validate JSON from AI response:', error);
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        return new NextResponse(`AI response did not match expected schema: ${error.message}`, {
          status: 500,
        });
      }
      return new NextResponse('Failed to generate story', { status: 500 });
    }
  } catch (error) {
    console.error('Error generating story:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
