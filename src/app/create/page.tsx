// src/app/create/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import { ThemeSelector } from '@/components/create/theme-selector';
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
import { CloseIcon, LoadingSpinner } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '@/lib/utils/uploadthing';
import { motion } from 'framer-motion';

// Form schema with validation rules
const formSchema = z.object({
  childName: z.string().min(1, { message: "Child's name is required" }),
  childAge: z.string().min(1, { message: "Child's age is required" }),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced'] as const),
  childPhoto: z.string().url(),
  petName: z.string(),
  petType: z.string(),
  petPhoto: z.string().url(),
  storyTheme: z.enum([
    'adventure',
    'fantasy',
    'space',
    'underwater',
    'dinosaurs',
    'jungle',
  ] as const),
  additionalDetails: z.string(),
});

type FormError = {
  message?: string;
  path?: string[];
};

// Theme options with icons and colors
const themeOptions = [
  { value: 'adventure', label: 'Adventure', icon: '🏕️', color: '#FFD166' },
  { value: 'fantasy', label: 'Fantasy', icon: '🧙‍♂️', color: '#A5B4FC' },
  { value: 'space', label: 'Space', icon: '🚀', color: '#818CF8' },
  { value: 'underwater', label: 'Underwater', icon: '🐠', color: '#06D6A0' },
  { value: 'dinosaurs', label: 'Dinosaurs', icon: '🦖', color: '#FF6B6B' },
  { value: 'jungle', label: 'Jungle', icon: '🦁', color: '#06D6A0' },
];

// Reading level options
const readingLevelOptions = [
  { value: 'beginner', label: 'Beginner (Ages 3-5)' },
  { value: 'intermediate', label: 'Intermediate (Ages 6-8)' },
  { value: 'advanced', label: 'Advanced (Ages 9-12)' },
];

export default function CreateStory() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
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
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      try {
        // TODO: Implement API call to generate story
        console.log('Form submitted with values:', value);
        // For now, we'll just redirect to a mock result
        router.push('/story/preview');
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
              </div>

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

              {/* Child's Photo Field */}
              <form.Field name="childPhoto">
                {(field) => (
                  <EnhancedFormField
                    label="Child's Photo"
                    htmlFor={field.name}
                    hint="Optional"
                    error={field.state.meta.errors}
                  >
                    <div className="mt-2">
                      {field.state.value ? (
                        <div className="relative w-full h-40 rounded-md overflow-hidden mb-2">
                          <img
                            src={field.state.value}
                            // biome-ignore lint/a11y/noRedundantAlt: <explanation>
                            alt="Child's photo"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => field.handleChange('')}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors">
                          <UploadButton
                            endpoint="childImageUploader"
                            onClientUploadComplete={(res) => {
                              console.log('Files: ', res[0].ufsUrl);
                              field.handleChange(res[0].ufsUrl);
                            }}
                            onUploadError={(error: Error) => {
                              alert(`ERROR UPLOADING CHILD PHOTO! ${error.message}`);
                            }}
                          />
                          <p className="text-xs mt-2">Upload a photo of your child (optional)</p>
                        </div>
                      )}
                    </div>
                  </EnhancedFormField>
                )}
              </form.Field>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pet's Name Field */}
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

              {/* Pet's Photo Field */}
              <form.Field name="petPhoto">
                {(field) => (
                  <EnhancedFormField
                    label="Pet's Photo"
                    htmlFor={field.name}
                    hint="Optional"
                    error={field.state.meta.errors}
                  >
                    <div className="mt-2">
                      {field.state.value ? (
                        <div className="relative w-full h-40 rounded-md overflow-hidden mb-2">
                          <img
                            src={field.state.value}
                            // biome-ignore lint/a11y/noRedundantAlt: <explanation>
                            alt="Pet's photo"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => field.handleChange('')}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors">
                          <UploadButton
                            endpoint="petImageUploader"
                            onClientUploadComplete={(res) => {
                              console.log('Files: ', res[0].ufsUrl);
                              field.handleChange(res[0].ufsUrl);
                            }}
                            onUploadError={(error: Error) => {
                              alert(`ERROR UPLOADING PET PHOTO! ${error.message}`);
                            }}
                          />
                          <p className="text-xs mt-2">Upload a photo of your pet (optional)</p>
                        </div>
                      )}
                    </div>
                  </EnhancedFormField>
                )}
              </form.Field>
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
                      themes={themeOptions}
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
            {(form.state.errors).map((error) => {
              if (!error) return null;
              console.log('Error:', error);

              const errorId = error.path?.join('.') || crypto.randomUUID();
              const message = error.message.join(",") || 'Unknown error';

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
