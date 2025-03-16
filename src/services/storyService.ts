import type { Story } from '@/types/stories';
import { DatabaseError } from '@/lib/errors';
import { StoryRepository } from '@/repositories/storyRepository';

export class StoryService {
  private repository: StoryRepository;

  constructor() {
    this.repository = new StoryRepository();
  }

  /**
   * Get all stories for a user
   */
  async getAllStories(userId: string) {
    try {
      return await this.repository.findAllByUserId(userId);
    } catch (error) {
      throw new DatabaseError('Failed to fetch stories', error);
    }
  }

  /**
   * Get a single story with all its chapters and content
   */
  async getStoryById(storyId: number, userId: string) {
    try {
      // Get the story
      const story = await this.repository.findByIdAndUserId(storyId, userId);

      if (!story) {
        return null;
      }

      // Get the chapters
      const chapters = await this.repository.findChaptersByStoryId(storyId);

      // Get content for each chapter
      const chaptersWithContent = await Promise.all(
        chapters.map(async (chapter) => {
          const content = await this.repository.findContentByChapterId(chapter.id);

          return {
            ...chapter,
            content,
          };
        })
      );

      return {
        ...story,
        chapters: chaptersWithContent,
      };
    } catch (error) {
      throw new DatabaseError('Failed to fetch story', error);
    }
  }

  /**
   * Create a new story with chapters and content
   */
  async createStory(storyData: Story, userId: string) {
    try {
      return await this.repository.transaction(async (tx) => {
        // Create the story
        const newStory = await this.repository.createStory({
          title: storyData.title,
          user_id: userId,
          thumbnail: storyData.thumbnail,
          readingLevel: storyData.readingLevel,
          storyTheme: storyData.storyTheme,
        });

        // Create chapters and content
        for (let i = 0; i < storyData.chapters.length; i++) {
          const chapter = storyData.chapters[i];

          // Create the chapter
          const newChapter = await this.repository.createChapter({
            story_id: newStory.id,
            chapter_number: i + 1,
            title: chapter.title,
          });

          // Create content for the chapter
          for (let j = 0; j < chapter.content.length; j++) {
            const contentItem = chapter.content[j];

            await this.repository.createContent({
              chapter_id: newChapter.id,
              content_number: j + 1,
              type: contentItem.type,
              content: contentItem,
            });
          }
        }

        return {
          id: newStory.id,
          title: newStory.title,
          user_id: newStory.user_id,
          createdAt: newStory.createdAt,
          updatedAt: newStory.updatedAt,
        };
      });
    } catch (error) {
      throw new DatabaseError('Failed to create story', error);
    }
  }

  /**
   * Update a story's metadata
   */
  async updateStory(
    storyId: number,
    userId: string,
    data: {
      title: string;
      thumbnail: string;
      readingLevel: 'beginner' | 'intermediate' | 'advanced';
    }
  ) {
    try {
      // Check if the story exists and belongs to the user
      const existingStory = await this.repository.findByIdAndUserId(storyId, userId);

      if (!existingStory) {
        return null;
      }

      // Update the story
      return await this.repository.updateStory(storyId, data);
    } catch (error) {
      throw new DatabaseError('Failed to update story', error);
    }
  }

  /**
   * Delete a story and all its related data
   */
  async deleteStory(storyId: number, userId: string) {
    try {
      // Check if the story exists and belongs to the user
      const existingStory = await this.repository.findByIdAndUserId(storyId, userId);

      if (!existingStory) {
        return false;
      }

      // Delete the story (cascade delete should handle chapters and content)
      await this.repository.deleteStory(storyId);

      return true;
    } catch (error) {
      throw new DatabaseError('Failed to delete story', error);
    }
  }
}
