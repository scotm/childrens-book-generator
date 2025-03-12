"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - this would come from your database in a real application
const mockStories = [
  {
    id: "story-1",
    title: "Emily's Magical Adventure",
    createdAt: "2025-03-10",
    thumbnail: "/story-thumbnail-1.jpg",
    readingLevel: "beginner",
  },
  {
    id: "story-2",
    title: "Max and Rex the Dinosaur",
    createdAt: "2025-03-08",
    thumbnail: "/story-thumbnail-2.jpg",
    readingLevel: "intermediate",
  },
  {
    id: "story-3",
    title: "Sophie's Journey to Space",
    createdAt: "2025-03-05",
    thumbnail: "/story-thumbnail-3.jpg",
    readingLevel: "advanced",
  },
];

export default function Dashboard() {
  const { user } = useUser();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stories from an API
    const loadStories = async () => {
      try {
        // In a real app, this would be an API call like:
        // const response = await fetch('/api/stories');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setStories(mockStories);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading stories:", error);
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

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
              Welcome back, {user?.firstName || "Reader"}! Here are your created stories.
            </p>
          </div>
          <Link href="/create">
            <Button size="lg">Create New Story</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-12">
            <p>Loading your stories...</p>
          </div>
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
                      <p className="text-lg font-medium">{story.title.split(" ")[0]}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Created {new Date(story.createdAt).toLocaleDateString()}</span>
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