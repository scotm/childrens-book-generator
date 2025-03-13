import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import db from '@/db';
import { storiesTable, storyChaptersTable, storyContentTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { storySchema } from '@/types/stories';
import { createErrorResponse, createSuccessResponse } from '@/lib/responseHelpers';

// GET /api/story - Get all stories for the current user
export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return createErrorResponse(401, 'Unauthorized', 'UNAUTHORIZED');
    }

    const url = new URL(req.url);
    const storyId = url.searchParams.get('id');

    // If storyId is provided, get a specific story with its chapters and content
    if (storyId) {
      const id = Number.parseInt(storyId, 10);
      if (Number.isNaN(id)) {
        return createErrorResponse(400, 'Invalid story ID', 'INVALID_ID');
      }

      // Get the story
      const story = await db
        .select()
        .from(storiesTable)
        .where(and(eq(storiesTable.id, id), eq(storiesTable.user_id, userId)))
        .limit(1)
        .then((rows) => rows[0]);

      if (!story) {
        return createErrorResponse(404, 'Story not found', 'NOT_FOUND');
      }

      // Get the chapters
      const chapters = await db
        .select()
        .from(storyChaptersTable)
        .where(eq(storyChaptersTable.story_id, id))
        .orderBy(storyChaptersTable.chapter_number);

      // Get content for each chapter
      const chaptersWithContent = await Promise.all(
        chapters.map(async (chapter) => {
          const content = await db
            .select()
            .from(storyContentTable)
            .where(eq(storyContentTable.chapter_id, chapter.id))
            .orderBy(storyContentTable.content_number);

          return {
            ...chapter,
            content,
          };
        })
      );

      return createSuccessResponse({
        ...story,
        chapters: chaptersWithContent,
      });
    }

    // Otherwise, get all stories for the user
    const stories = await db
      .select()
      .from(storiesTable)
      .where(eq(storiesTable.user_id, userId))
      .orderBy(storiesTable.createdAt);

    return createSuccessResponse(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return createErrorResponse(
      500,
      'Failed to fetch stories',
      'DATABASE_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}

// POST /api/story - Create a new story
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return createErrorResponse(401, 'Unauthorized', 'UNAUTHORIZED');
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = storySchema.safeParse(body);

    if (!validationResult.success) {
      return createErrorResponse(
        400,
        'Invalid request body',
        'VALIDATION_ERROR',
        validationResult.error.format()
      );
    }

    const { title, chapters, thumbnail, readingLevel } = validationResult.data;

    // Start a transaction
    return await db.transaction(async (tx) => {
      // Create the story
      const [newStory] = await tx
        .insert(storiesTable)
        .values({
          title,
          user_id: userId,
          thumbnail: thumbnail,
          readingLevel: readingLevel,
        })
        .returning();

      // Create chapters and content
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];

        // Create the chapter
        const [newChapter] = await tx
          .insert(storyChaptersTable)
          .values({
            story_id: newStory.id,
            chapter_number: i + 1,
            title: chapter.title,
          })
          .returning();

        // Create content for the chapter
        for (let j = 0; j < chapter.content.length; j++) {
          const contentItem = chapter.content[j];

          await tx.insert(storyContentTable).values({
            chapter_id: newChapter.id,
            content_number: j + 1,
            type: contentItem.type,
            content: contentItem,
          });
        }
      }

      return createSuccessResponse({
        id: newStory.id,
        title: newStory.title,
        user_id: newStory.user_id,
        createdAt: newStory.createdAt,
        updatedAt: newStory.updatedAt,
      });
    });
  } catch (error) {
    console.error('Error creating story:', error);
    return createErrorResponse(
      500,
      'Failed to create story',
      'DATABASE_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}

// PUT /api/story/:id - Update a story
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return createErrorResponse(401, 'Unauthorized', 'UNAUTHORIZED');
    }

    const url = new URL(req.url);
    const storyId = url.searchParams.get('id');

    if (!storyId) {
      return createErrorResponse(400, 'Story ID is required', 'MISSING_ID');
    }

    const id = Number.parseInt(storyId, 10);
    if (Number.isNaN(id)) {
      return createErrorResponse(400, 'Invalid story ID', 'INVALID_ID');
    }

    // Check if the story exists and belongs to the user
    const existingStory = await db
      .select()
      .from(storiesTable)
      .where(and(eq(storiesTable.id, id), eq(storiesTable.user_id, userId)))
      .limit(1)
      .then((rows) => rows[0]);

    if (!existingStory) {
      return createErrorResponse(404, 'Story not found', 'NOT_FOUND');
    }

    // Parse and validate request body
    const updateSchema = z.object({
      title: z.string().min(1),
      thumbnail: z.string(),
      readingLevel: z.enum(['beginner', 'intermediate', 'advanced']),
    });

    const body = await req.json();
    const validationResult = updateSchema.safeParse(body);

    if (!validationResult.success) {
      return createErrorResponse(
        400,
        'Invalid request body',
        'VALIDATION_ERROR',
        validationResult.error.format()
      );
    }

    const { title, thumbnail, readingLevel } = validationResult.data;

    // Update the story
    const [updatedStory] = await db
      .update(storiesTable)
      .set({
        title,
        thumbnail,
        readingLevel,
      })
      .where(eq(storiesTable.id, id))
      .returning();

    return createSuccessResponse(updatedStory);
  } catch (error) {
    console.error('Error updating story:', error);
    return createErrorResponse(
      500,
      'Failed to update story',
      'DATABASE_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}

// DELETE /api/story/:id - Delete a story
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return createErrorResponse(401, 'Unauthorized', 'UNAUTHORIZED');
    }

    const url = new URL(req.url);
    const storyId = url.searchParams.get('id');

    if (!storyId) {
      return createErrorResponse(400, 'Story ID is required', 'MISSING_ID');
    }

    const id = Number.parseInt(storyId, 10);
    if (Number.isNaN(id)) {
      return createErrorResponse(400, 'Invalid story ID', 'INVALID_ID');
    }

    // Check if the story exists and belongs to the user
    const existingStory = await db
      .select()
      .from(storiesTable)
      .where(and(eq(storiesTable.id, id), eq(storiesTable.user_id, userId)))
      .limit(1)
      .then((rows) => rows[0]);

    if (!existingStory) {
      return createErrorResponse(404, 'Story not found', 'NOT_FOUND');
    }

    // Delete the story (cascade delete should handle chapters and content)
    await db.delete(storiesTable).where(eq(storiesTable.id, id));

    return createSuccessResponse({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting story:', error);
    return createErrorResponse(
      500,
      'Failed to delete story',
      'DATABASE_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}
