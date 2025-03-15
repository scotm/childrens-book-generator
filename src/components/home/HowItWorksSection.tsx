import { HowItWorksHeader } from './HowItWorksHeader';
import { StepCard } from './StepCard';
import { StartCreatingButton } from './StartCreatingButton';
import { steps } from './how-it-works-data';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HowItWorksHeader />

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-120px)] bg-gradient-to-b from-primary via-teal to-coral hidden md:block" />

          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              number={step.number}
              emoji={step.emoji}
              title={step.title}
              description={step.description}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        <StartCreatingButton />
      </div>
    </section>
  );
}
