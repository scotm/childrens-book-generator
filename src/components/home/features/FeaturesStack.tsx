'use client';

import { CardContent, CardHeader, CardTitle, EnhancedCard } from '../../ui/enhanced/enhanced-card';
import { features } from './features-data';

export function FeaturesStack() {
  return (
    <>
      {features.map((feature) => (
        <EnhancedCard
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
}
