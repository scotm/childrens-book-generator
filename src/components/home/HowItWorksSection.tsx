import { HowItWorksHeader } from './HowItWorksHeader';
import { StartCreatingButton } from './StartCreatingButton';
import { StepCard } from './StepCard';

export const steps = [
  {
    id: 'step-1',
    number: 1,
    title: 'Create a Profile',
    description: "Add your child's details and preferences",
    emoji: '👶',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Customize the Story',
    description: 'Choose a theme, add characters, and set the scene',
    emoji: '✏️',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Generate & Enjoy',
    description: "We'll create a unique story featuring your child",
    emoji: '📖',
  },
] as const;

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
