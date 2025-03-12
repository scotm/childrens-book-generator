'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm flex">
        <h1 className="text-4xl font-bold tracking-tight">Story Sprout</h1>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline">My Stories</Button>
            </Link>
          </SignedIn>
        </div>
      </div>

      <div className="relative flex place-items-center my-16">
        <Image
          src="/main-hero.svg"
          alt="Story Sprout Logo"
          width={300}
          height={300}
          priority
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        />
      </div>

      <div className="mb-32 grid gap-8 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2">
        <SignedOut>
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-2xl">Create Personalized Stories for Your Child</CardTitle>
              <CardDescription>
                Sign in to create magical stories featuring your child and their pets
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignInButton mode="modal">
                <Button size="lg">Get Started</Button>
              </SignInButton>
            </CardContent>
          </Card>
        </SignedOut>

        <SignedIn>
          <Card>
            <CardHeader>
              <CardTitle>Create a New Story</CardTitle>
              <CardDescription>
                Add characters, upload photos, and customize a story for your child
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/create">
                <Button size="lg">Create Story</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Stories</CardTitle>
              <CardDescription>View and read stories you've already created</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  View Library
                </Button>
              </Link>
            </CardContent>
          </Card>
        </SignedIn>
      </div>
    </main>
  );
}
