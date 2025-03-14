import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type React from 'react';

export interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  id: string;
  hoverEffect?: 'lift' | 'glow' | 'none';
  variant?: 'default' | 'gradient' | 'outlined';
  animateEntry?: boolean;
}

export const EnhancedCard = ({
  id,
  className,
  hoverEffect = 'lift',
  variant = 'default',
  animateEntry = true,
  children,
  ...props
}: EnhancedCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-white to-lavender/20 border-lavender/30';
      case 'outlined':
        return 'bg-transparent border-2 border-primary/30';
      default:
        return '';
    }
  };

  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'transition-transform duration-300 hover:-translate-y-2';
      case 'glow':
        return 'transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20';
      default:
        return '';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial={animateEntry ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
    >
      <Card
        className={cn(
          'rounded-xl overflow-hidden',
          getVariantClasses(),
          getHoverClasses(),
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};

// Re-export all card components
export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
