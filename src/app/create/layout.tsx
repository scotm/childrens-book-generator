import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type React from 'react';

interface Props {
  children: React.ReactNode;
}

export const layout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create a New Story</h1>
        </div>
        {children}
      </div>
    </main>
  );
};
