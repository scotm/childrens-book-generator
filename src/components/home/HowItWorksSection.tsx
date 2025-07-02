import { HowItWorksHeader } from './HowItWorksHeader';
import { StepCard } from './StepCard';
import { StartCreatingButton } from './StartCreatingButton';
import book from '../../../public/images/pixabay/book.svg';
import girl from '../../../public/images/pixabay/girl.svg';
import Image from 'next/image';

export const steps = [
  {
    id: 'step-1',
    number: 1,
    title: 'Create a Profile',
    description: "Add your child's details and preferences",
    emoji: <Image src={girl} alt="Girl" width={300} height={300} />,
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
    emoji: <Image src={book} alt="Book" width={300} height={300} />,
  },
];

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
              graphic={step.emoji}
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
