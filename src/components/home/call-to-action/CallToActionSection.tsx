import { CallToActionHeader } from './CallToActionHeader';
import { CallToActionButtons } from './CallToActionButtons';
import { FloatingElements } from '../FloatingElements';

export function CallToActionSection() {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-teal/10 -z-10" />

      {/* Floating decorative elements */}
      <FloatingElements />

      <CallToActionHeader />
      <CallToActionButtons />
    </section>
  );
}
