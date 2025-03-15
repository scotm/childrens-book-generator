import { motion, type Variants } from 'framer-motion';
import React from 'react';

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

const getDirectionValues = (direction: SlideInProps['direction'] = 'up', distance = 50) => {
  switch (direction) {
    case 'up':
      return { hidden: { y: distance }, visible: { y: 0 } };
    case 'down':
      return { hidden: { y: -distance }, visible: { y: 0 } };
    case 'left':
      return { hidden: { x: distance }, visible: { x: 0 } };
    case 'right':
      return { hidden: { x: -distance }, visible: { x: 0 } };
  }
};

type SlideInProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  [key: string]: unknown;
};

// Slide in component
export const SlideIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 50,
  ...props
}: SlideInProps) => {
  const directionValues = getDirectionValues(direction, distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionValues.hidden,
    },
    visible: {
      opacity: 1,
      ...directionValues.visible,
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
