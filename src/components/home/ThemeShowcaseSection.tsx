'use client';

import { motion } from 'framer-motion';
import { StaggerContainer } from '@/components/ui/enhanced/animated-elements';
import { EnhancedCard, CardContent, CardHeader, CardTitle } from '@/components/ui/enhanced/enhanced-card';

const themes = [
  {
    id: "adventure",
    name: "Adventure",
    description: "Exciting journeys and discoveries",
    emoji: "🏔️"
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Magical worlds and mythical creatures",
    emoji: "🧙‍♂️"
  },
  {
    id: "space",
    name: "Space",
    description: "Explore the cosmos and distant planets",
    emoji: "🚀"
  },
  {
    id: "underwater",
    name: "Underwater",
    description: "Dive into oceanic adventures",
    emoji: "🐠"
  },
  {
    id: "dinosaurs",
    name: "Dinosaurs",
    description: "Journey back to prehistoric times",
    emoji: "🦕"
  },
  {
    id: "jungle",
    name: "Jungle",
    description: "Explore wild forests and meet animals",
    emoji: "🦁"
  }
];

export const ThemeShowcaseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-lavender/10 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our stories come in a variety of themes to spark your child's imagination
          </p>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <EnhancedCard 
              key={theme.id} 
              hoverEffect="lift" 
              className="overflow-hidden h-full"
            >
              <div className="aspect-[3/2] relative overflow-hidden bg-gradient-to-br from-lavender/30 to-background flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-8xl"
                >
                  {theme.emoji}
                </motion.div>
              </div>
              <CardHeader>
                <CardTitle>{theme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{theme.description}</p>
              </CardContent>
            </EnhancedCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};