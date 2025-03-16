// src/app/create/page.tsx
'use client';

import { createStoryFormOpts } from '@/components/create/SharedForm';
import { ThemeSelector } from '@/components/create/theme-selector';
import { UploadThingField } from '@/components/create/UploadThingField';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';
import { FadeIn, StaggerContainer } from '@/components/ui/enhanced/animated-elements';
import {
  CardContent,
  CardHeader,
  CardTitle,
  EnhancedCard,
} from '@/components/ui/enhanced/enhanced-card';
import { EnhancedFormField } from '@/components/ui/enhanced/enhanced-form-field';
import { EnhancedSelect } from '@/components/ui/enhanced/enhanced-select';
import { LoadingSpinner } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppForm } from '@/hooks/createForm';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { z } from 'zod';

// Form schema with validation rules
const storyThemeOptionArray = [
  'adventure',
  'fantasy',
  'space',
  'underwater',
  'dinosaurs',
  'jungle',
] as const;

const readingLevelOptionsArray = ['beginner', 'intermediate', 'advanced'] as const;

const createOutlineFormSchema = z.object({
  childName: z.string().min(1, { message: "Child's name is required" }),
  childAge: z.string().min(1, { message: "Child's age is required" }),
  readingLevel: z.enum(readingLevelOptionsArray),
  childPhoto: z.string().url(),
  petName: z.string(),
  petType: z.string(),
  petPhoto: z.string().url(),
  storyTheme: z.enum(storyThemeOptionArray),
  additionalDetails: z.string(),
});

export type CreateOutlineFormData = z.infer<typeof createOutlineFormSchema>;

// Reading level options
const readingLevelOptions: { value: (typeof readingLevelOptionsArray)[number]; label: string }[] = [
  { value: 'beginner', label: 'Beginner (Ages 3-5)' },
  { value: 'intermediate', label: 'Intermediate (Ages 6-8)' },
  { value: 'advanced', label: 'Advanced (Ages 9-12)' },
];

export default function CreateStory() {
  // const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useAppForm({
    ...createStoryFormOpts,
    validators: {
      onChange: createOutlineFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      try {
        // TODO: Implement API call to generate story
        console.log('Form submitted with values:', value);
        // For now, we'll just redirect to a mock result
        // router.push('/story/preview');
      } catch (error) {
        console.error('Error generating story:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // if (!user || !user.primaryEmailAddress) {
  //   return (
  //     <FadeIn>
  //       <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
  //         <p className="text-sm">
  //           You must have a verified email address to create a new story. Please{' '}
  //           <Link href="/account" className="text-primary underline">
  //             verify your email address
  //           </Link>{' '}
  //           to continue.
  //         </p>
  //       </div>
  //     </FadeIn>
  //   );
  // }

  return (
    <FadeIn>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <StaggerContainer staggerDelay={0.15}>
          {/* Child Information Card */}
          <EnhancedCard
            className="form-card border-lavender/30 overflow-visible"
            variant="gradient"
            hoverEffect="none"
          >
            <CardHeader className="relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 text-4xl opacity-10">👶</div>
              <CardTitle className="text-2xl font-display bg-clip-text bg-gradient-to-r from-primary to-lavender text-background">
                Child Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  {/* Child's Name Field */}
                  <form.Field
                    name="childName"
                    validators={{
                      onChange: z.string().min(1, { message: "Child's name is required" }),
                    }}
                  >
                    {(field) => (
                      <EnhancedFormField
                        label="Child's Name"
                        htmlFor={field.name}
                        error={field.state.meta.errors}
                        required
                      >
                        <Input
                          id={field.name}
                          name={field.name}
                          placeholder="Enter child's name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="input-enhanced"
                        />
                      </EnhancedFormField>
                    )}
                  </form.Field>

                  {/* Child's Age Field */}
                  <form.Field
                    name="childAge"
                    validators={{
                      onChange: z.string().min(1, { message: "Child's age is required" }),
                    }}
                  >
                    {(field) => (
                      <EnhancedFormField
                        label="Child's Age"
                        htmlFor={field.name}
                        error={field.state.meta.errors}
                        required
                      >
                        <Input
                          id={field.name}
                          name={field.name}
                          placeholder="Enter child's age"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="input-enhanced"
                        />
                      </EnhancedFormField>
                    )}
                  </form.Field>

                  {/* Reading Level Field */}
                  <form.Field name="readingLevel">
                    {(field) => (
                      <EnhancedFormField
                        label="Reading Level"
                        htmlFor={field.name}
                        required
                        error={field.state.meta.errors}
                      >
                        <EnhancedSelect
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.setValue(e.target.value)}
                          options={readingLevelOptions}
                        />
                      </EnhancedFormField>
                    )}
                  </form.Field>
                </div>
                <div className="col-span-1">
                  {/* Child's Photo Field */}
                  <form.AppField name="childPhoto">
                    {() => <UploadThingField endpoint="childImageUploader" />}
                  </form.AppField>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>

          {/* Pet Information Card */}
          <EnhancedCard
            className="form-card border-teal/30 overflow-visible"
            variant="gradient"
            hoverEffect="none"
          >
            <CardHeader className="relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 text-4xl opacity-10">🐾</div>
              <CardTitle className="text-2xl font-display bg-clip-text bg-gradient-to-r from-teal to-primary text-background">
                Pet Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Pet's Name Field */}
                <div className="col-span-1">
                  <form.Field name="petName">
                    {(field) => (
                      <EnhancedFormField
                        label="Pet's Name"
                        htmlFor={field.name}
                        hint="Optional"
                        error={field.state.meta.errors}
                      >
                        <Input
                          id={field.name}
                          name={field.name}
                          placeholder="Enter pet's name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="input-enhanced"
                        />
                      </EnhancedFormField>
                    )}
                  </form.Field>

                  {/* Pet Type Field */}
                  <form.Field name="petType">
                    {(field) => (
                      <EnhancedFormField
                        label="Pet Type"
                        htmlFor={field.name}
                        hint="Optional"
                        error={field.state.meta.errors}
                      >
                        <Input
                          id={field.name}
                          name={field.name}
                          placeholder="Cat, Dog, etc."
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="input-enhanced"
                        />
                      </EnhancedFormField>
                    )}
                  </form.Field>
                </div>

                <div>
                  <form.AppField name="petPhoto">
                    {() => <UploadThingField endpoint="petImageUploader" />}
                  </form.AppField>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>

          {/* Story Details Card */}
          <EnhancedCard
            className="form-card border-yellow/30 overflow-visible"
            variant="gradient"
            hoverEffect="none"
          >
            <CardHeader className="relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 text-4xl opacity-10">📚</div>
              <CardTitle className="text-2xl font-display bg-clip-text bg-gradient-to-r from-yellow to-coral text-background">
                Story Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Story Theme Field */}
              <form.Field name="storyTheme">
                {(field) => (
                  <EnhancedFormField
                    label="Story Theme"
                    htmlFor={field.name}
                    required
                    error={field.state.meta.errors}
                  >
                    <ThemeSelector
                      value={field.state.value}
                      onChange={(value) => field.setValue(value)}
                    />
                  </EnhancedFormField>
                )}
              </form.Field>

              {/* Additional Details Field */}
              <form.Field name="additionalDetails">
                {(field) => (
                  <EnhancedFormField
                    label="Additional Details"
                    htmlFor={field.name}
                    hint="Optional"
                    error={field.state.meta.errors}
                  >
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Any other details you'd like to include in the story"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={4}
                      className="input-enhanced resize-none"
                    />
                  </EnhancedFormField>
                )}
              </form.Field>
            </CardContent>
          </EnhancedCard>
        </StaggerContainer>

        {/* Form-level error display */}
        {form.state.errors && form.state.errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20"
          >
            {form.state.errors.map((error) => {
              if (!error) return null;
              console.log('Error:', error);

              const errorId = error.path?.join('.') || crypto.randomUUID();
              const message = error.message.join(',') || 'Unknown error';

              return message ? (
                <p key={errorId} className="text-sm">
                  {message}
                </p>
              ) : null;
            })}
          </motion.div>
        )}

        <div className="flex justify-end">
          <AnimatedButton
            type="submit"
            size="lg"
            disabled={isLoading || form.state.isSubmitting || !form.state.canSubmit}
            className="rounded-full px-8 shadow-lg shadow-primary/20"
            animationType="bounce"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner />
                Generating Story...
              </div>
            ) : (
              <>
                Generate Story
                <span className="ml-2">✨</span>
              </>
            )}
          </AnimatedButton>
        </div>
      </form>
    </FadeIn>
  );
}
