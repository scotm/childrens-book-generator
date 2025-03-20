import { CardContent, CardHeader, CardTitle, EnhancedCard } from '../ui/enhanced/enhanced-card';
import { ThemeCardMotion } from './ThemeCardMotion';

interface ThemeCardProps {
  id: string;
  name: string;
  description: string;
  graphic: React.ReactNode;
}

export function ThemeCard({ id, name, description, graphic }: ThemeCardProps) {
  return (
    <EnhancedCard key={id} hoverEffect="lift" className="overflow-hidden h-full">
      <div className="aspect-[3/2] relative overflow-hidden bg-gradient-to-br from-lavender/30 to-background flex items-center justify-center">
        <ThemeCardMotion graphic={graphic} />
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
