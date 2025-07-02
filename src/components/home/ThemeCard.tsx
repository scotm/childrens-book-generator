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
        <div className="text-8xl">{emoji}</div>
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
