'use client';
import { useStory } from '@/hooks/use-stories';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { QueryClientProvider } from './providers/QueryClientProvider';

// Separate the component that uses React Query
function StoryContent({ id }: { id: string }) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  // Fetch story data using TanStack Query
  const { data: story, isLoading, isError, error } = useStory(id);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isUserLoaded && !user) {
      router.push('/');
    }
  }, [isUserLoaded, user, router]);

  // Show loading state
  if (isLoading || !isUserLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6 md:p-24">
        <p>Loading story...</p>
      </main>
    );
  }

  // Show error state
  if (isError || !story) {
    return (
      <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-6">Story Not Found</h1>
          <p className="mb-6">
            {error instanceof Error
              ? error.message
              : "The story you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Flatten chapters and content for display
  const flatContent =
    story.chapters?.flatMap((chapter) =>
      chapter.content.map((item) => ({
        ...item,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
      })),
    ) || [];

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline">← Back to My Stories</Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Created: {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : ''}
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
              {flatContent.map((item) => (
                <div key={`content-${item.id}`} className="my-6">
                  {item.type === 'text' ? (
                    <p>{item.content.text as string}</p>
                  ) : item.type === 'image' ? (
                    <div className="my-8 flex justify-center">
                      {/* Placeholder for images - your app would use real images */}
                      <div className="aspect-[4/3] w-full max-w-md bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center p-12">
                        <p className="text-center text-gray-600 font-medium">
                          [Illustration: {item.content.alt as string}]
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

// Wrapper component that provides the QueryClient
export const StoryPageComponent = ({ id }: { id: string }) => {
  return (
    <QueryClientProvider>
      <StoryContent id={id} />
    </QueryClientProvider>
  );
};
