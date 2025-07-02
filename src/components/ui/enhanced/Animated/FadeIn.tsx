'use client';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Type definitions
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  [key: string]: unknown;
};

// Fade in component
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }: FadeInProps) => {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} {...props}>
      {children}
    </motion.div>
  );
};
