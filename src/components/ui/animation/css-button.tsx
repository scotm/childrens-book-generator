'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CSSButtonProps extends ButtonProps {
  animationType?: 'bounce' | 'pulse' | 'none';
}

export const CSSButton = ({
  className,
  animationType = 'bounce',
  children,
  ...props
}: CSSButtonProps) => {
  return (
    <Button
      className={cn(
        'font-medium transition-all duration-200',
        animationType === 'bounce' && 'hover:scale-105 active:scale-95 active:translate-y-1',
        animationType === 'pulse' && 'hover:shadow-glow hover:scale-102',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};