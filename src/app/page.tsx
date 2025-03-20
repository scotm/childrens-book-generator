import { HeroSection } from '@/components/home/hero/HeroSection';
import { FeaturesSection } from '@/components/home/features/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ThemeShowcaseSection } from '@/components/home/ThemeShowcaseSection';
import { CallToActionSection } from '@/components/home/call-to-action/CallToActionSection';

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
