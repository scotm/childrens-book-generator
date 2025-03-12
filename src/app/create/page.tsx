'use client';

import { useUser } from '@clerk/nextjs';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Form schema with validation rules
const formSchema = z.object({
  childName: z.string().min(1, { message: "Child's name is required" }),
  childAge: z.string().min(1, { message: "Child's age is required" }),
  childPhoto: z.any().optional(),
  readingLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  petName: z.string().optional(),
  petType: z.string().optional(),
  petPhoto: z.any().optional(),
  storyTheme: z.enum(['adventure', 'fantasy', 'space', 'underwater', 'dinosaurs', 'jungle']),
  additionalDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateStory() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      childName: '',
      childAge: '',
      childPhoto: null,
      readingLevel: 'beginner',
      petName: '',
      petType: '',
      petPhoto: null,
      storyTheme: 'adventure',
      additionalDetails: '',
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
    validatorAdapter: zodValidator,
  });

  // Handle file changes separately since they're special inputs
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'childPhoto' | 'petPhoto'
  ) => {
    const file = e.target.files?.[0] || null;
    form.setFieldValue(fieldName, file);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create a New Story</h1>
        </div>

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
                      {field.state.meta.touchedErrors ? (
                        <p className="text-sm text-red-500">{field.state.meta.touchedErrors}</p>
                      ) : null}
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
                      {field.state.meta.touchedErrors ? (
                        <p className="text-sm text-red-500">{field.state.meta.touchedErrors}</p>
                      ) : null}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Child's Photo Field */}
              <form.Field name="childPhoto">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Upload Child's Photo (Optional)</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'childPhoto')}
                    />
                  </div>
                )}
              </form.Field>

              {/* Reading Level Field */}
              <form.Field name="readingLevel">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Reading Level</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reading level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (Ages 3-5)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (Ages 6-8)</SelectItem>
                        <SelectItem value="advanced">Advanced (Ages 9-12)</SelectItem>
                      </SelectContent>
                    </Select>
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
              </div>

              {/* Pet's Photo Field */}
              <form.Field name="petPhoto">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Upload Pet's Photo (Optional)</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'petPhoto')}
                    />
                  </div>
                )}
              </form.Field>
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
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Story Theme</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="space">Space</SelectItem>
                        <SelectItem value="underwater">Underwater</SelectItem>
                        <SelectItem value="dinosaurs">Dinosaurs</SelectItem>
                        <SelectItem value="jungle">Jungle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
          {form.state.errors ? (
            <div className="text-red-500 text-sm">
              {form.state.errors.map((error) => (
                <p key={error.path?.join('.')}>{error.message}</p>
              ))}
            </div>
          ) : null}

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
      </div>
    </main>
  );
}
