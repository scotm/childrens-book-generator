'use client';

import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';

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
