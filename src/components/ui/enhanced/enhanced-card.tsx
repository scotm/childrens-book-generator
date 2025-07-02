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
}

const variantClasses: Map<NonNullable<EnhancedCardProps['variant']>, string> = new Map([
  ['default', ''],
  ['gradient', 'bg-gradient-to-br from-white to-lavender/20 border-lavender/30'],
  ['outlined', 'bg-transparent border-2 border-primary/30'],
]);

const hoverClasses: Map<NonNullable<EnhancedCardProps['hoverEffect']>, string> = new Map([
  ['lift', 'card-hover-lift'],
  ['glow', 'card-hover-glow'],
  ['none', ''],
]);

export const EnhancedCard = ({
  className,
  hoverEffect = 'lift',
  variant = 'default',
  children,
  ...props
}: EnhancedCardProps) => {
  return (
    <Card
      className={cn(
        'rounded-xl overflow-hidden',
        variantClasses.get(variant) ?? '',
        hoverClasses.get(hoverEffect) ?? '',
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

// Re-export all card components
export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
