import { motion, type Variants } from 'framer-motion';
import React from 'react';

// Fade in component
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  [key: string]: unknown;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration,
        delay 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in component
export const SlideIn = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 50,
  ...props 
}: { 
  children: React.ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  [key: string]: unknown;
}) => {
  const getDirectionValues = () => {
    switch (direction) {
      case 'up': return { hidden: { y: distance }, visible: { y: 0 } };
      case 'down': return { hidden: { y: -distance }, visible: { y: 0 } };
      case 'left': return { hidden: { x: distance }, visible: { x: 0 } };
      case 'right': return { hidden: { x: -distance }, visible: { x: 0 } };
      default: return { hidden: { y: distance }, visible: { y: 0 } };
    }
  };

  const directionValues = getDirectionValues();
  
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      ...directionValues.hidden 
    },
    visible: { 
      opacity: 1, 
      ...directionValues.visible,
      transition: { 
        duration,
        delay 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
export const StaggerContainer = ({ 
  children, 
  delay = 0.1,
  staggerDelay = 0.1,
  ...props 
}: { 
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  [key: string]: unknown;
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      {React.Children.map(children, child => (
        <motion.div variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Scroll-triggered reveal
export const ScrollReveal = ({ 
  children,
  threshold = 0.1,
  ...props 
}: { 
  children: React.ReactNode;
  threshold?: number;
  [key: string]: unknown;
}) => {
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