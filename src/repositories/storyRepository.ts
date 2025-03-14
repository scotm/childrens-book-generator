import db from '@/db';
import { storiesTable, storyChaptersTable, storyContentTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Repository for story-related database operations
 */
export class StoryRepository {
  /**
   * Get all stories for a user
   */
  async findAllByUserId(userId: string) {
    return await db
      .select()
      .from(storiesTable)
      .where(eq(storiesTable.user_id, userId))
      .orderBy(storiesTable.createdAt);
  }

  /**
   * Find a story by ID and user ID
   */
  async findByIdAndUserId(storyId: number, userId: string) {
    return await db
      .select()
      .from(storiesTable)
      .where(and(eq(storiesTable.id, storyId), eq(storiesTable.user_id, userId)))
      .limit(1)
      .then((rows) => rows[0] || null);
  }

  /**
   * Get chapters for a story
   */
  async findChaptersByStoryId(storyId: number) {
    return await db
      .select()
      .from(storyChaptersTable)
      .where(eq(storyChaptersTable.story_id, storyId))
      .orderBy(storyChaptersTable.chapter_number);
  }

  /**
   * Get content for a chapter
   */
  async findContentByChapterId(chapterId: number) {
    return await db
      .select()
      .from(storyContentTable)
      .where(eq(storyContentTable.chapter_id, chapterId))
      .orderBy(storyContentTable.content_number);
  }

  /**
   * Create a new story
   */
  async createStory(storyData: {
    title: string;
    user_id: string;
    thumbnail: string;
    readingLevel: 'beginner' | 'intermediate' | 'advanced';
  }) {
    const [newStory] = await db.insert(storiesTable).values(storyData).returning();

    return newStory;
  }

  /**
   * Create a new chapter
   */
  async createChapter(chapterData: {
    story_id: number;
    chapter_number: number;
    title: string;
  }) {
    const [newChapter] = await db.insert(storyChaptersTable).values(chapterData).returning();

    return newChapter;
  }

  /**
   * Create content for a chapter
   */
  async createContent(contentData: {
    chapter_id: number;
    content_number: number;
    type: 'text' | 'image';
    content: Record<string, unknown>;
  }) {
    return await db.insert(storyContentTable).values(contentData);
  }

  /**
   * Update a story
   */
  async updateStory(
    storyId: number,
    data: {
      title: string;
      thumbnail: string;
      readingLevel: 'beginner' | 'intermediate' | 'advanced';
    }
  ) {
    const [updatedStory] = await db
      .update(storiesTable)
      .set(data)
      .where(eq(storiesTable.id, storyId))
      .returning();

    return updatedStory;
  }

  /**
   * Delete a story
   */
  async deleteStory(storyId: number) {
    await db.delete(storiesTable).where(eq(storiesTable.id, storyId));
  }

  /**
   * Execute a transaction
   */
  async transaction<T>(callback: (tx: unknown) => Promise<T>): Promise<T> {
    return await db.transaction(callback as (tx: unknown) => Promise<T>);
  }
}
