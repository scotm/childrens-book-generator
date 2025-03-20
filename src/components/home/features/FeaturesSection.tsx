import { FeaturesHeader } from './FeaturesHeader';
import { FeaturesStack } from './FeaturesStack';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturesHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          <FeaturesStack />
        </div>
      </div>
    </section>
  );
}
