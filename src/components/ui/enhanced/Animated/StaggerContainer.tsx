'use client';

import { motion, type Variants } from 'framer-motion';
import React from 'react';

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type StaggerContainerProps = {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  [key: string]: unknown;
};

// Staggered children animation
export const StaggerContainer = ({
  children,
  delay = 0.1,
  staggerDelay = 0.1,
  ...props
}: StaggerContainerProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={staggerChildVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};
