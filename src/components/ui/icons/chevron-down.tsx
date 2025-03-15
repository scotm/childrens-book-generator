import * as React from 'react';

export interface ChevronDownProps extends React.SVGProps<SVGSVGElement> {
  /** The size of the icon in pixels. @default 16 */
  size?: number;
}

/**
 * A chevron down icon component that can be used to indicate expandable content or dropdown menus.
 *
 * @example
 * ```tsx
 * <ChevronDown size={24} className="text-primary" />
 * ```
 */
export const ChevronDown = React.forwardRef<SVGSVGElement, ChevronDownProps>(
  ({ size = 16, ...props }, ref) => {
    return (
      <svg
        role="img"
        aria-label="Chevron down icon"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref}
        {...props}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  },
);

ChevronDown.displayName = 'ChevronDown';
