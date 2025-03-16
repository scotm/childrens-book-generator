import type { readingLevelOptionsArray, storyThemeOptionArray } from '@/lib/constants';

export type StoryTheme = (typeof storyThemeOptionArray)[number];
export type ReadingLevel = (typeof readingLevelOptionsArray)[number];
