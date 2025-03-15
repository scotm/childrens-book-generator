'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';
import { motion } from 'framer-motion';

export function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex gap-4 flex-wrap"
    >
      <SignedOut>
        <SignInButton mode="modal">
          <AnimatedButton size="lg" className="rounded-full px-8">
            Start Your Story
          </AnimatedButton>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Link href="/create">
          <AnimatedButton size="lg" className="rounded-full px-8">
            Create New Story
          </AnimatedButton>
        </Link>
      </SignedIn>

      <Link href="#how-it-works">
        <AnimatedButton
          variant="outline"
          size="lg"
          animationType="none"
          className="rounded-full px-8"
        >
          How It Works
        </AnimatedButton>
      </Link>
    </motion.div>
  );
}
