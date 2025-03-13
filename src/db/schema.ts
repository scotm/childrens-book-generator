import { integer, jsonb, pgTable, timestamp, varchar, text, pgEnum } from 'drizzle-orm/pg-core';

export const readingLevelEnum = pgEnum('reading_level', ['beginner', 'intermediate', 'advanced']);

export const storiesTable = pgTable('stories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: text('user_id').notNull(),
  title: varchar({ length: 255 }).notNull(),
  thumbnail: text('thumbnail').notNull(),
  readingLevel: readingLevelEnum('reading_level').notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Story = typeof storiesTable.$inferSelect;

export const storyChaptersTable = pgTable('story_chapters', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  story_id: integer('story_id').references(() => storiesTable.id),
  chapter_number: integer('chapter_number').notNull(),
  title: varchar({ length: 255 }).notNull(),
});

export const contentTypeEnum = pgEnum('content_type', ['text', 'image']);

export const storyContentTable = pgTable('story_content', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chapter_id: integer('chapter_id').references(() => storyChaptersTable.id),
  content_number: integer('content_number').notNull(),
  type: contentTypeEnum('type').notNull(),
  content: jsonb().notNull(),
});
