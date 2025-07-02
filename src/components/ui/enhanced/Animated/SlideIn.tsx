'use client';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

type SlideInProps = {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  [key: string]: unknown;
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
