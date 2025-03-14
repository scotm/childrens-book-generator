'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient with subtle animation - different for light/dark modes */}
      <motion.div
        className="absolute inset-0 hero-gradient -z-10"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />

      {/* Add this style block for the hero gradient */}
      <style jsx global>{`
        .hero-gradient {
          background: linear-gradient(to bottom right, rgba(165, 180, 252, 0.3), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
          animation: gradientShift 20s ease infinite alternate;
        }
        
        @keyframes gradientShift {
          0% {
            background: linear-gradient(to bottom right, rgba(165, 180, 252, 0.3), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
          }
          50% {
            background: linear-gradient(to bottom right, rgba(165, 180, 252, 0.1), rgba(255, 209, 102, 0.1), rgba(255, 255, 255, 1));
          }
          100% {
            background: linear-gradient(to bottom right, rgba(165, 180, 252, 0.3), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
          }
        }
        
        @media (prefers-color-scheme: dark) {
          .hero-gradient {
            background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(10, 10, 10, 1), rgba(10, 10, 10, 1));
            animation: darkGradientShift 20s ease infinite alternate;
          }
          
          @keyframes darkGradientShift {
            0% {
              background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(10, 10, 10, 1), rgba(10, 10, 10, 1));
            }
            50% {
              background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(255, 209, 102, 0.05), rgba(10, 10, 10, 1));
            }
            100% {
              background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(10, 10, 10, 1), rgba(10, 10, 10, 1));
            }
          }
        }
      `}</style>

      {/* Hero content */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Magical Stories, <br />
              Uniquely Theirs
            </motion.h1>

            <motion.p
              className="text-xl text-foreground/80 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create personalized stories featuring your child as the hero, with their pets,
              friends, and favorite adventures. Bring their imagination to life!
            </motion.p>

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
          </motion.div>

          {/* Right column - Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md mx-auto h-[300px]">
              <motion.div
                initial={{ rotateY: -30, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src="/main-hero.svg"
                  alt="Magical story book"
                  width={400}
                  height={300}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                }}
                className="absolute top-[-30px] right-[50px]"
              >
                <div className="w-10 h-10 text-yellow text-3xl">✨</div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  x: [0, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                  delay: 0.5,
                }}
                className="absolute bottom-[40px] left-[40px]"
              >
                <div className="w-12 h-12 text-coral text-3xl">🧚</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
