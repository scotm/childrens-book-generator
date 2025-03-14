'use client';

import { motion } from 'framer-motion';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';

export const CallToActionSection = () => {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-teal/10 -z-10" />
      
      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse"
        }}
        className="absolute top-12 left-12 opacity-60"
      >
        <div className="text-5xl">✨</div>
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute bottom-12 right-12 opacity-60"
      >
        <div className="text-5xl">☁️</div>
      </motion.div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-display font-bold mb-6 leading-tight">
            Begin Your Child's Magical Story Journey Today
          </h2>
          <p className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto">
            Give your child the gift of personalized adventure where they're the hero of their own tale
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <AnimatedButton 
                  size="lg" 
                  className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
                  animationType="bounce"
                >
                  Start Creating Stories
                </AnimatedButton>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link href="/create">
                <AnimatedButton 
                  size="lg" 
                  className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
                  animationType="bounce"
                >
                  Create Your Next Story
                </AnimatedButton>
              </Link>
            </SignedIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
};