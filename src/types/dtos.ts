import { z } from 'zod';

/**
 * DTO for updating a story
 */
export const UpdateStoryDto = z.object({
  title: z.string().min(1),
  thumbnail: z.string(),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

export type UpdateStoryDto = z.infer<typeof UpdateStoryDto>;

/**
 * DTO for story response
 */
export interface StoryResponseDto {
  id: number;
  title: string;
  user_id: string;
  thumbnail: string;
  readingLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO for story with chapters response
 */
export interface StoryWithChaptersDto extends StoryResponseDto {
  chapters: ChapterWithContentDto[];
}

/**
 * DTO for chapter with content response
 */
export interface ChapterWithContentDto {
  id: number;
  story_id: number;
  chapter_number: number;
  title: string;
  content: ContentDto[];
}

/**
 * DTO for content response
 */
export interface ContentDto {
  id: number;
  chapter_id: number;
  content_number: number;
  type: 'text' | 'image';
  content: Record<string, unknown>;
}
