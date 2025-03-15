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
  hoverEffect?: 'lift' | 'glow' | 'none';
  variant?: 'default' | 'gradient' | 'outlined';
  animateEntry?: boolean;
}

const variantClasses: Map<NonNullable<EnhancedCardProps['variant']>, string> = new Map([
  ['default', ''],
  ['gradient', 'bg-gradient-to-br from-white to-lavender/20 border-lavender/30'],
  ['outlined', 'bg-transparent border-2 border-primary/30'],
]);

const hoverClasses: Map<NonNullable<EnhancedCardProps['hoverEffect']>, string> = new Map([
  ['lift', 'transition-transform duration-300 hover:-translate-y-2'],
  ['glow', 'transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20'],
  ['none', ''],
]);

export const EnhancedCard = ({
  className,
  hoverEffect = 'lift',
  variant = 'default',
  animateEntry = true,
  children,
  ...props
}: EnhancedCardProps) => {
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
      initial={animateEntry ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
    >
      <Card
        className={cn(
          'rounded-xl overflow-hidden',
          variantClasses.get(variant) ?? '',
          hoverClasses.get(hoverEffect) ?? '',
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
