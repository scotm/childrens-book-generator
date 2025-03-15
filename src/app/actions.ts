'use server';

import { z } from 'zod';

// Form schema with validation rules
const formSchema = z.object({
  childName: z.string().min(1, { message: "Child's name is required" }),
  childAge: z.string().min(1, { message: "Child's age is required" }),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced'] as const),
  childPhoto: z.string().url().optional(),
  petName: z.string().optional(),
  petType: z.string().optional(),
  petPhoto: z.string().url().optional(),
  storyTheme: z.enum([
    'adventure',
    'fantasy',
    'space',
    'underwater',
    'dinosaurs',
    'jungle',
  ] as const),
  additionalDetails: z.string().optional(),
});

export type StoryFormData = z.infer<typeof formSchema>;

export async function generateStory(formData: StoryFormData) {
  try {
    // Validate the form data
    const validatedData = formSchema.parse(formData);
    
    // TODO: Implement the actual story generation logic
    // This would typically involve calling an API or a service
    console.log('Generating story with data:', validatedData);
    
    // For now, we'll just return a mock result
    return {
      success: true,
      storyId: 'preview',
      message: 'Story generated successfully',
    };
  } catch (error) {
    console.error('Error generating story:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to generate story',
    };
  }
}