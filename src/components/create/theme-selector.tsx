import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface ThemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  themes: {
    value: string;
    label: string;
    icon: string;
    color: string;
  }[];
}

export const ThemeSelector = ({ value, onChange, themes }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <motion.div
          key={theme.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'theme-option cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-2',
            value === theme.value && 'theme-option-selected'
          )}
          onClick={() => onChange(theme.value)}
          style={{
            backgroundColor: value === theme.value ? `${theme.color}15` : 'transparent',
          }}
        >
          <div className="text-3xl" style={{ color: theme.color }}>
            {theme.icon}
          </div>
          <span className="font-medium text-sm">{theme.label}</span>
        </motion.div>
      ))}
    </div>
  );
};
