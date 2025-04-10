'use client';

import { motion } from 'framer-motion';

interface StepCardProps {
  number: number;
  emoji: string;
  title: string;
  description: string;
  isReversed?: boolean;
}

export function StepCard({ number, emoji, title, description, isReversed }: StepCardProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full md:w-1/2 relative">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-lavender/20 to-background rounded-lg p-6 relative overflow-hidden"
        >
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white font-display text-3xl font-bold">
            {number}
          </div>
          <div className="h-64 flex items-center justify-center">
            <span className="text-9xl">{emoji}</span>
          </div>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
        <p className="text-lg text-foreground/70 mb-4">{description}</p>
      </div>
    </div>
  );
}
