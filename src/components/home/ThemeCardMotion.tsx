'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';

type ThemeCardMotionProps = {
  graphic: React.ReactNode;
  className?: string;
};

export const ThemeCardMotion = ({ graphic, className }: ThemeCardMotionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className={cn('text-8xl', className)}
    >
      {graphic}
    </motion.div>
  );
};
