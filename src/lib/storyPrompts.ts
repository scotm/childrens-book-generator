import type { GenerateStorySchema } from '@/types/stories';

export const constructStoryPrompt = (validationResult: GenerateStorySchema) => {
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
