import { motion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'bounce' | 'pulse' | 'none';
}

export const AnimatedButton = ({
  className,
  animationType = 'bounce',
  children,
  ...props
}: AnimatedButtonProps) => {
  const getAnimationProps = () => {
    switch (animationType) {
      case 'bounce':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        };
      case 'pulse':
        return {
          whileHover: {
            boxShadow: '0 0 15px 5px rgba(99, 102, 241, 0.5)',
            scale: 1.02,
          },
          transition: { duration: 0.2 },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div className="inline-block" {...getAnimationProps()}>
      <Button
        className={cn(
          'font-medium transition-all duration-200',
          animationType === 'bounce' && 'active:translate-y-1',
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};
