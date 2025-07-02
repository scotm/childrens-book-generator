import * as React from 'react';

export interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  /** The size of the icon in pixels. @default 16 */
  size?: number;
}

/**
 * A close/cross icon component that can be used for dismissible elements like modals or alerts.
 *
 * @example
 * ```tsx
 * <CloseIcon size={24} className="text-destructive" />
 * ```
 */
export const CloseIcon = React.forwardRef<SVGSVGElement, CloseIconProps>(
  ({ size = 16, ...props }, ref) => {
    return (
      <svg
        role="img"
        aria-label="Close icon"
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  },
);

CloseIcon.displayName = 'CloseIcon';
