'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock generated story data
const mockStory = {
  title: "Emma's Adventure with Buddy the Dog",
  content: [
    {
      type: 'text',
      content:
        'Once upon a time, there was a little girl named Emma. Emma was 7 years old and had a wonderful dog named Buddy.',
    },
    {
      type: 'image',
      alt: 'Emma and Buddy playing in the park',
      src: '/placeholder-illustration-1.jpg',
    },
    {
      type: 'text',
      content:
        'Emma and Buddy loved to play in the park. They would run and jump and chase squirrels together.',
    },
    {
      type: 'text',
      content:
        'One day, Emma and Buddy were playing in the park when they saw something strange. It was a glowing blue ball!',
    },
    {
      type: 'image',
      alt: 'Emma and Buddy finding a glowing blue ball',
      src: '/placeholder-illustration-2.jpg',
    },
    {
      type: 'text',
      content:
        '"What is that?" Emma wondered. Buddy barked excitedly. Emma reached out and touched the ball. Suddenly, there was a flash of bright light!',
    },
    {
      type: 'text',
      content:
        'Emma and Buddy found themselves in a magical forest. The trees had purple leaves and the grass was blue.',
    },
    {
      type: 'image',
      alt: 'Emma and Buddy in a magical forest',
      src: '/placeholder-illustration-3.jpg',
    },
    {
      type: 'text',
      content: '"Where are we?" Emma asked. Buddy wagged his tail, not seeming worried at all.',
    },
    {
      type: 'text',
      content:
        'A small creature with big ears and a friendly smile approached them. "Welcome to the Magic Forest! I\'m Pip," the creature said.',
    },
    {
      type: 'text',
      content: 'Emma was surprised. "You can talk!" she exclaimed.',
    },
    {
      type: 'text',
      content:
        '"Of course I can," Pip replied with a laugh. "All creatures can talk in the Magic Forest. Would you like to explore?"',
    },
    {
      type: 'image',
      alt: 'Emma, Buddy, and Pip exploring the magical forest',
      src: '/placeholder-illustration-4.jpg',
    },
    {
      type: 'text',
      content:
        'Emma and Buddy had an amazing adventure in the Magic Forest with their new friend Pip. They saw rainbow waterfalls, met friendly dragons, and even had tea with the Forest Queen.',
    },
    {
      type: 'text',
      content:
        'But as the day came to an end, Emma knew it was time to go home. "How do we get back?" she asked Pip.',
    },
    {
      type: 'text',
      content:
        '"Just think about home and hold the blue ball," Pip told her, handing her the glowing ball.',
    },
    {
      type: 'text',
      content:
        'Emma held the ball tight, closed her eyes, and thought about home. Buddy put his paw on the ball too. There was another flash of light!',
    },
    {
      type: 'image',
      alt: 'Emma and Buddy back in the park',
      src: '/placeholder-illustration-5.jpg',
    },
    {
      type: 'text',
      content:
        'When Emma opened her eyes, she and Buddy were back in the park. The sun was setting, and it was time to go home.',
    },
    {
      type: 'text',
      content:
        '"What an adventure!" Emma said to Buddy, who barked happily. "I wonder if we\'ll ever see Pip and the Magic Forest again?"',
    },
    {
      type: 'text',
      content:
        'As they walked home, Emma noticed something in her pocket. It was a small purple leaf from the Magic Forest. Emma smiled. Their adventure had been real, and maybe someday, they would have another one.',
    },
    {
      type: 'text',
      content: 'The End.',
    },
  ],
};

export default function StoryPreview() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save the story
      // In a real app, this would be something like:
      // await fetch('/api/stories', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title: mockStory.title, content: mockStory.content })
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard after saving
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving story:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/create">
            <Button variant="outline">← Back to Editor</Button>
          </Link>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/create')}>
              Regenerate
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Story'}
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-3xl">{mockStory.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-10">
            <div className="prose prose-lg max-w-none">
              {mockStory.content.map((item, index) => (
                <div key={index} className="my-6">
                  {item.type === 'text' ? (
                    <p>{item.content}</p>
                  ) : item.type === 'image' ? (
                    <div className="my-8 flex justify-center">
                      {/* Placeholder for images - your app would use real images */}
                      <div className="aspect-[4/3] w-full max-w-md bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center p-12">
                        <p className="text-center text-gray-600 font-medium">
                          [Illustration: {item.alt}]
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <Button variant="outline" size="lg" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save to My Stories'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
