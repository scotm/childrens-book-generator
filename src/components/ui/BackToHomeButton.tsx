import Link from 'next/link';
import React from 'react';
import { AnimatedButton } from './enhanced/animated-button';

export const BackToHomeButton = () => {
  return (
    <Link href="/">
      <AnimatedButton
        animationType="bounce"
        className="font-display border border-primary/10 pb-2 text-lg"
        variant="ghost"
      >
        ← Back to Home
      </AnimatedButton>
    </Link>
  );
};
