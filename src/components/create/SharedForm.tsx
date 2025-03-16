import { formOptions } from '@tanstack/react-form';

export const createStoryFormOpts = formOptions({
  defaultValues: {
    childName: '',
    childAge: '',
    readingLevel: 'beginner',
    childPhoto: '',
    petName: '',
    petType: '',
    petPhoto: '',
    storyTheme: 'adventure',
    additionalDetails: '',
  },
});
