'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';

export function CallToActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <SignedOut>
        <SignInButton mode="modal">
          <AnimatedButton
            size="lg"
            className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
            animationType="bounce"
          >
            Start Creating Stories
          </AnimatedButton>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Link href="/create">
          <AnimatedButton
            size="lg"
            className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
            animationType="bounce"
          >
            Create Your Next Story
          </AnimatedButton>
        </Link>
      </SignedIn>
    </div>
  );
}
