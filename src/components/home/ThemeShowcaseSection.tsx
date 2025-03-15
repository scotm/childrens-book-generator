import { ThemeShowcaseHeader } from './ThemeShowcaseHeader';
import { ThemeCard } from './ThemeCard';
import { themes } from './theme-showcase-data';

export function ThemeShowcaseSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-lavender/10 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemeShowcaseHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              id={theme.id}
              name={theme.name}
              description={theme.description}
              emoji={theme.emoji}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
