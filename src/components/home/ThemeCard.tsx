'use client';

import { motion } from 'framer-motion';
import { CardContent, CardHeader, CardTitle, EnhancedCard } from '../ui/enhanced/enhanced-card';

interface ThemeCardProps {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export function ThemeCard({ id, name, description, emoji }: ThemeCardProps) {
  return (
    <EnhancedCard key={id} hoverEffect="lift" className="overflow-hidden h-full">
      <div className="aspect-[3/2] relative overflow-hidden bg-gradient-to-br from-lavender/30 to-background flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="text-8xl"
        >
          {emoji}
        </motion.div>
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </EnhancedCard>
  );
}
