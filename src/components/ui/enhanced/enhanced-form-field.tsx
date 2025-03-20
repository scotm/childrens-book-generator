'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { StandardSchemaV1Issue } from '@tanstack/react-form';
import { motion } from 'framer-motion';
import type React from 'react';

interface EnhancedFormFieldProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  error: (StandardSchemaV1Issue | undefined)[];
  className?: string;
  required?: boolean;
  hint?: string;
}

export const EnhancedFormField = ({
  children,
  label,
  htmlFor,
  error,
  className,
  required = false,
  hint,
}: EnhancedFormFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between">
        <Label htmlFor={htmlFor} className="text-background/90 font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-primary text-sm">*</span>}
        </Label>
        {hint && <span className="text-xs text-background/60">{hint}</span>}
      </div>

      {children}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive"
        >
          {error.map((error) => error?.message).join(', ')}
        </motion.p>
      )}
    </div>
  );
};
