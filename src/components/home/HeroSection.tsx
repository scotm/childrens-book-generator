import { HeroAnimation } from './HeroAnimation';
import { HeroContent } from './HeroContent';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10" />
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroAnimation />
        </div>
      </div>
    </section>
  );
}
