'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { CSSButton } from '@/components/ui/animation/css-button';
import dynamic from 'next/dynamic';

// Dynamically import the AnimatedButton for below-the-fold content
const AnimatedButton = dynamic(
  () => import('@/components/ui/enhanced/animated-button').then(mod => mod.AnimatedButton),
  {
    ssr: false,
    loading: () => <CSSButton size="lg" className="rounded-full px-8">Loading...</CSSButton>
  }
);

export function HeroButtons() {
  return (
    <div className="flex gap-4 flex-wrap">
      <SignedOut>
        <SignInButton mode="modal">
          <CSSButton size="lg" className="rounded-full px-8" animationType="bounce">
            Start Your Story
          </CSSButton>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Link href="/create">
          <CSSButton size="lg" className="rounded-full px-8" animationType="bounce">
            Create New Story
          </CSSButton>
        </Link>
      </SignedIn>

      <Link href="#how-it-works">
        <CSSButton
          variant="outline"
          size="lg"
          animationType="none"
          className="rounded-full px-8"
        >
          How It Works
        </CSSButton>
      </Link>
    </div>
  );
}
