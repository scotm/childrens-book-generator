'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStories } from '@/hooks/use-stories';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  // Fetch stories using Tanstack Query
  const { data: stories = [], isLoading, isError } = useStories();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isUserLoaded && !user) {
      router.push('/');
    }
  }, [isUserLoaded, user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                ← Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">My Stories</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.firstName || 'Reader'}! Here are your created stories.
            </p>
          </div>
          <Link href="/create">
            <Button size="lg">Create New Story</Button>
          </Link>
        </div>

        {isLoading || !isUserLoaded ? (
          <div className="flex justify-center my-12">
            <p>Loading your stories...</p>
          </div>
        ) : isError ? (
          <Card className="text-center my-12 p-6">
            <CardHeader>
              <CardTitle>Error loading stories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">There was a problem loading your stories. Please try again.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        ) : stories.length === 0 ? (
          <Card className="text-center my-12 p-6">
            <CardHeader>
              <CardTitle>You haven't created any stories yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create your first personalized story for your child!</p>
              <Link href="/create">
                <Button>Create Your First Story</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Link key={story.id} href={`/story/${story.id}`}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-[4/3] relative">
                    {/* Placeholder image - your app would use real thumbnails */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                      <p className="text-lg font-medium">{story.title.split(' ')[0]}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Created{' '}
                        {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : ''}
                      </span>
                      <span className="capitalize">{story.readingLevel}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
