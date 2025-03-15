'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { CSSButton } from '@/components/ui/animation/css-button';

export function CallToActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <SignedOut>
        <SignInButton mode="modal">
          <CSSButton
            size="lg"
            className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
            animationType="bounce"
          >
            Start Creating Stories
          </CSSButton>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Link href="/create">
          <CSSButton
            size="lg"
            className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
            animationType="bounce"
          >
            Create Your Next Story
          </CSSButton>
        </Link>
      </SignedIn>
    </div>
  );
}
