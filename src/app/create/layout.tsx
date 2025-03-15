'use client';

import { BackToHomeButton } from '@/components/ui/BackToHomeButton';
import { FadeIn } from '@/components/ui/enhanced/Animated/FadeIn';
import { SlideIn } from '@/components/ui/enhanced/Animated/SlideIn';
import type React from 'react';

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender/10 via-background to-background -z-10 animate-gradient-shift" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 opacity-20 -z-5 hidden md:block">
        <div className="text-6xl animate-float-slow">✨</div>
      </div>
      <div className="absolute bottom-20 left-10 opacity-20 -z-5 hidden md:block">
        <div className="text-6xl animate-float">🌟</div>
      </div>

      <div className="w-full max-w-3xl relative">
        <SlideIn direction="down" duration={0.7}>
          <div className="mb-8 flex items-center justify-between">
            <BackToHomeButton />
            <FadeIn delay={0.3}>
              <h1 className="text-3xl font-display font-bold tracking-tight bg-clip-text bg-gradient-to-r from-primary to-teal">
                Create a New Story
              </h1>
            </FadeIn>
          </div>
        </SlideIn>

        {/* Add a subtle card container for the form */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10 p-6 relative overflow-hidden">
          {/* Subtle corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 opacity-10 border-t border-l border-primary rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10 border-b border-r border-primary rounded-br-xl" />

          {children}
        </div>
      </div>
    </main>
  );
}
