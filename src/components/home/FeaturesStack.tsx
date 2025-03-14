'use client';

import { useEffect, useRef } from 'react';
import { CardContent, CardHeader, CardTitle, EnhancedCard } from '../ui/enhanced/enhanced-card';
import { sleep } from '@/lib/utils';

export const FeaturesStack = () => {
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

  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sleep(1000).then(() => {
      const cards: HTMLElement[] = [];
      for (const feature of features) {
        cards.push(document.getElementById(feature.id) as HTMLElement);
      }
      console.log(cards);
      const maxHeight = Math.max(...cards.map((card) => card.clientHeight));
      for (const card of cards) card.style.height = `${maxHeight}px`;
    });
  }, []);

  return (
    <>
      {features.map((feature, index) => (
        <EnhancedCard
          id={feature.id}
          key={feature.id}
          variant="gradient"
          className="text-center h-full flex flex-col justify-between"
          hoverEffect="lift"
        >
          <CardHeader className="flex-shrink-0">
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-6xl">{feature.icon}</span>
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center">
            <p className="text-foreground/70 w-full">{feature.description}</p>
          </CardContent>
        </EnhancedCard>
      ))}
    </>
  );
};
