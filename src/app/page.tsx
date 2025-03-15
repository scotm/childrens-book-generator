import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ThemeShowcaseSection } from '@/components/home/ThemeShowcaseSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ThemeShowcaseSection />
      <CallToActionSection />
    </main>
  );
}
