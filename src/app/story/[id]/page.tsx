'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock stories data - in a real app, this would come from your database
const mockStories = {
  'story-1': {
    id: 'story-1',
    title: "Emily's Magical Adventure",
    createdAt: '2025-03-10',
    readingLevel: 'beginner',
    content: [
      { type: 'text', content: 'Once upon a time, there was a little girl named Emily.' },
      {
        type: 'text',
        content: 'She had a pet cat named Whiskers who could talk, but only to her.',
      },
      { type: 'image', alt: 'Emily and Whiskers', src: '/placeholder-story-1-1.jpg' },
      { type: 'text', content: '"Let\'s go on an adventure," Whiskers said one sunny morning.' },
      { type: 'text', content: '"Where should we go?" asked Emily.' },
      {
        type: 'text',
        content: '"To the magical garden at the end of the rainbow," Whiskers replied.',
      },
      {
        type: 'image',
        alt: 'Emily and Whiskers looking at a rainbow',
        src: '/placeholder-story-1-2.jpg',
      },
      {
        type: 'text',
        content:
          'And so, Emily and Whiskers set off on an amazing journey that would change their lives forever.',
      },
      { type: 'text', content: 'The End.' },
    ],
  },
  'story-2': {
    id: 'story-2',
    title: 'Max and Rex the Dinosaur',
    createdAt: '2025-03-08',
    readingLevel: 'intermediate',
    content: [
      { type: 'text', content: 'Max was digging in his backyard when he found a strange egg.' },
      { type: 'image', alt: 'Max finding an egg', src: '/placeholder-story-2-1.jpg' },
      {
        type: 'text',
        content: 'The egg was big and speckled with blue dots. Max carefully took it inside.',
      },
      {
        type: 'text',
        content: 'That night, Max was awakened by a cracking sound. The egg was hatching!',
      },
      { type: 'text', content: 'Out came a baby dinosaur! Max named him Rex.' },
      { type: 'image', alt: 'Rex hatching from the egg', src: '/placeholder-story-2-2.jpg' },
      { type: 'text', content: '"How am I going to explain this to Mom?" Max wondered.' },
      {
        type: 'text',
        content:
          'But as it turned out, Mom had a secret of her own - she had been a dinosaur trainer before Max was born!',
      },
      { type: 'image', alt: "Max's mom with Rex", src: '/placeholder-story-2-3.jpg' },
      {
        type: 'text',
        content: 'And that was how Max and his family began their prehistoric adventure.',
      },
      { type: 'text', content: 'The End.' },
    ],
  },
  'story-3': {
    id: 'story-3',
    title: "Sophie's Journey to Space",
    createdAt: '2025-03-05',
    readingLevel: 'advanced',
    content: [
      {
        type: 'text',
        content:
          'Sophie had always dreamed of going to space. She read every book about astronomy and built her own telescope.',
      },
      {
        type: 'text',
        content:
          'One night, while looking at the stars, she saw something strange - a small spaceship landing in her garden!',
      },
      { type: 'image', alt: 'Sophie seeing a spaceship', src: '/placeholder-story-3-1.jpg' },
      { type: 'text', content: 'From the spaceship emerged a small green alien named Zorb.' },
      {
        type: 'text',
        content:
          '"Greetings, Earth child," said Zorb. "I am on a mission to explore your planet, but I need a guide."',
      },
      {
        type: 'text',
        content: '"I\'ll help you," Sophie said, "but in return, can you take me to space?"',
      },
      {
        type: 'text',
        content: "Zorb agreed, and thus began Sophie's incredible journey across the galaxy.",
      },
      { type: 'image', alt: 'Sophie and Zorb in space', src: '/placeholder-story-3-2.jpg' },
      {
        type: 'text',
        content:
          'They visited planets with rings of ice, moons with oceans of methane, and stars being born in nebulas of colorful gas.',
      },
      {
        type: 'text',
        content:
          'When it was time for Sophie to return home, Zorb gave her a special gift - a small device that could project the stars on her ceiling, exactly as they looked from any planet she had visited.',
      },
      {
        type: 'image',
        alt: 'Sophie back on Earth with star projector',
        src: '/placeholder-story-3-3.jpg',
      },
      { type: 'text', content: '"Will you come back?" Sophie asked.' },
      {
        type: 'text',
        content:
          '"Of course," said Zorb. "The universe is vast, and there\'s still so much for us to explore together."',
      },
      { type: 'text', content: 'The End.' },
    ],
  },
};

export default function StoryPage({ params }: { params: { id: string } }) {
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    const loadStory = async () => {
      try {
        // In a real app, you would fetch from an API:
        // const response = await fetch(`/api/stories/${id}`);
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setStory(mockStories[id] || null);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading story:', error);
        setIsLoading(false);
      }
    };

    loadStory();
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6 md:p-24">
        <p>Loading story...</p>
      </main>
    );
  }

  if (!story) {
    return (
      <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-6">Story Not Found</h1>
          <p className="mb-6">The story you're looking for doesn't exist or has been removed.</p>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline">← Back to My Stories</Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Created: {new Date(story.createdAt).toLocaleDateString()}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-3xl">{story.title}</CardTitle>
            <div className="text-sm text-muted-foreground capitalize">
              Reading level: {story.readingLevel}
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-10">
            <div className="prose prose-lg max-w-none">
              {story.content.map((item, index) => (
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
          <CardFooter className="flex justify-center border-t p-6 space-x-4">
            <Link href={`/story/${id}/edit`}>
              <Button variant="outline">Edit Story</Button>
            </Link>
            <Button variant="default">Read Aloud</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
