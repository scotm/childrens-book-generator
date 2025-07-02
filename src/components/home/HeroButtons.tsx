'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { CSSButton } from '@/components/ui/animation/css-button';
import { motion } from 'framer-motion';

export const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
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
          <CSSButton variant="outline" size="lg" animationType="none" className="rounded-full px-8">
            How It Works
          </CSSButton>
        </Link>
      </div>
    </motion.div>
  );
};
