import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';
import { HeroButtons } from './HeroButtons';

export function HeroContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-primary to-teal">
        Magical Stories, <br />
        Uniquely Theirs
      </h1>

      <p className="text-xl text-foreground/80 mb-8 max-w-lg">
        Create personalized stories featuring your child as the hero, with their pets, friends, and
        favorite adventures. Bring their imagination to life!
      </p>

      <HeroButtons />
    </div>
  );
}
