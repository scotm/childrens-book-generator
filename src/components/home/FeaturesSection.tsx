'use client';

import Image from 'next/image';
import { ScrollReveal, StaggerContainer } from '@/components/ui/enhanced/animated-elements';
import {
  EnhancedCard,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/enhanced/enhanced-card';

const features = [
  {
    id: 'personalized',
    title: 'Personalized Heroes',
    description: 'Stories star your child and their pets as the main characters',
    icon: '👧',
  },
  {
    id: 'reading-level',
    title: 'Read-Level Matched',
    description: "Content tailored to your child's reading level",
    icon: '📚',
  },
  {
    id: 'themes',
    title: 'Magical Themes',
    description: 'Choose from fantasy, adventure, space exploration and more',
    icon: '✨',
  },
  {
    id: 'illustrations',
    title: 'Illustrated Joy',
    description: 'Vibrant illustrations bring the stories to life',
    icon: '🎨',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Stories As Unique As Your Child
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Every story is specially crafted to delight and inspire your little one.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <EnhancedCard
              key={feature.id}
              variant="gradient"
              className="text-center h-full"
              hoverEffect="lift"
            >
              <CardHeader>
                <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{feature.description}</p>
              </CardContent>
            </EnhancedCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
