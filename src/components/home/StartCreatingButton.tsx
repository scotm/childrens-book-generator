'use client';

import { AnimatedButton } from '@/components/ui/enhanced/animated-button';
import Link from 'next/link';

export function StartCreatingButton() {
  return (
    <div className="text-center mt-12">
      <Link href="/create">
        <AnimatedButton size="lg" className="rounded-full px-8">
          Start Creating Now
        </AnimatedButton>
      </Link>
    </div>
  );
}
