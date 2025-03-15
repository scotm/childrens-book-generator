import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps extends React.SVGProps<SVGSVGElement> {
  /** The size of the icon in pixels. @default 16 */
  size?: number;
}

/**
 * An animated loading spinner component that can be used to indicate loading states.
 * Uses CSS animation for smooth rotation.
 *
 * @example
 * ```tsx
 * <LoadingSpinner size={24} className="text-primary" />
 * ```
 */
export const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  ({ size = 16, className, ...props }, ref) => {
    return (
      <svg
        role="img"
        aria-label="Loading animation"
        className={cn('animate-spin -ml-1 mr-2 text-white', className)}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        ref={ref}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  },
);

LoadingSpinner.displayName = 'LoadingSpinner';
