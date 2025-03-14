'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/enhanced/animated-elements';
import { AnimatedButton } from '@/components/ui/enhanced/animated-button';
import Link from 'next/link';

const steps = [
  {
    id: "step-1",
    number: 1,
    title: "Create a Profile",
    description: "Add your child's details and preferences",
    emoji: "👶"
  },
  {
    id: "step-2",
    number: 2,
    title: "Customize the Story",
    description: "Choose a theme, add characters, and set the scene",
    emoji: "✏️"
  },
  {
    id: "step-3",
    number: 3,
    title: "Generate & Enjoy",
    description: "We'll create a unique story featuring your child",
    emoji: "📚"
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Creating personalized stories is easy and fun with Story Sprout
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-120px)] bg-gradient-to-b from-primary via-teal to-coral hidden md:block" />
          
          {steps.map((step, index) => (
            <ScrollReveal key={step.id}>
              <div className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className="w-full md:w-1/2 relative">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-lavender/20 to-background rounded-lg p-6 relative overflow-hidden"
                  >
                    <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white font-display text-3xl font-bold">
                      {step.number}
                    </div>
                    <div className="h-64 flex items-center justify-center">
                      <span className="text-9xl">{step.emoji}</span>
                    </div>
                  </motion.div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-foreground/70 mb-4">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal>
          <div className="text-center mt-12">
            <Link href="/create">
              <AnimatedButton size="lg" className="rounded-full px-8">
                Start Creating Now
              </AnimatedButton>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};