import Link from 'next/link';
import React from 'react';
import { CSSButton } from './animation/css-button';

export const BackToHomeButton = () => {
  return (
    <Link href="/">
      <CSSButton
        animationType="bounce"
        className="font-display border border-primary/10 pb-2 text-lg"
        variant="ghost"
      >
        ← Back to Home
      </CSSButton>
    </Link>
  );
};
