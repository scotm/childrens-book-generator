'use client';

import { useUser } from '@clerk/nextjs';
import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '@uploadthing/react';

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

  if (!user || !user.primaryEmailAddress) {
    return (
      <div className="text-red-500 text-sm">
        <p>
          You must have a verified email address to create a new story. Please{' '}
          <Link href="/account">verify your email address</Link> to continue.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Form fields */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Child Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Child's Name Field */}
              <form.Field
                name="childName"
                validators={{
                  onChange: z.string().min(1, { message: "Child's name is required" }),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Child's Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter child's name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
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
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Child's Age</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter child's age"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500">{String(field.state.meta.errors[0])}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Reading Level Field */}
            <form.Field name="readingLevel">
              {(field) => (
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="beginner">Beginner (Ages 3-5)</option>
                  <option value="intermediate">Intermediate (Ages 6-8)</option>
                  <option value="advanced">Advanced (Ages 9-12)</option>
                </select>
              )}
            </form.Field>

            {/* Child's Photo Field */}
            <form.Field name="childPhoto">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Child's Photo (Optional)</Label>
                  <UploadButton<OurFileRouter, 'childImageUploader'>
                    endpoint="childImageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log('Files: ', res[0].ufsUrl);
                      field.handleChange(res[0].ufsUrl);
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR UPLOADING CHILD PHOTO! ${error.message}`);
                    }}
                  />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pet Information (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pet's Name Field */}
              <form.Field name="petName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Pet's Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter pet's name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              {/* Pet Type Field */}
              <form.Field name="petType">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Pet Type</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Cat, Dog, etc."
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
              {/* Pet's Photo Field */}
              <form.Field name="petPhoto">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Pet's Photo (Optional)</Label>
                    <UploadButton<OurFileRouter, 'petImageUploader'>
                      endpoint="petImageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log('Files: ', res[0].ufsUrl);
                        field.handleChange(res[0].ufsUrl);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR UPLOADING PET PHOTO! ${error.message}`);
                      }}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Story Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Story Theme Field */}
            <form.Field name="storyTheme">
              {(field) => (
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="adventure">Adventure</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="space">Space</option>
                  <option value="underwater">Underwater</option>
                  <option value="dinosaurs">Dinosaurs</option>
                  <option value="jungle">Jungle</option>
                </select>
              )}
            </form.Field>

            {/* Additional Details Field */}
            <form.Field name="additionalDetails">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Additional Details (Optional)</Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Any other details you'd like to include in the story"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Form-level error display */}
        {form.state.errors && form.state.errors.length > 0 && (
          <div className="text-red-500 text-sm">
            {(form.state.errors as unknown[]).map((error) => {
              if (!error || typeof error !== 'object') {
                return null;
              }

              const typedError = error as FormError;
              const errorId = typedError.path?.join('.') || crypto.randomUUID();
              const message = typedError.message || 'Unknown error';

              return message ? <p key={errorId}>{message}</p> : null;
            })}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || form.state.isSubmitting || !form.state.canSubmit}
          >
            {isLoading ? 'Generating Story...' : 'Generate Story'}
          </Button>
        </div>
      </form>
    </>
  );
}
