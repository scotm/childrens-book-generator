'use client';
import { motion } from 'framer-motion';

type ScrollRevealProps = {
  children: React.ReactNode;
  threshold?: number;
  [key: string]: unknown;
};

// Scroll-triggered reveal
export const ScrollReveal = ({ children, threshold = 0.1, ...props }: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
