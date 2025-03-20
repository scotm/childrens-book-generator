import { ThemeCard } from './ThemeCard';
import { ThemeShowcaseHeader } from './ThemeShowcaseHeader';

import Image from 'next/image';
import adventureEmoji from '../../../public/images/recraft-ai-recraft-v3-svg/adventure.svg';
import dinosaursEmoji from '../../../public/images/recraft-ai-recraft-v3-svg/dinosaurs.svg';
import fantasyEmoji from '../../../public/images/recraft-ai-recraft-v3-svg/fantasy.svg';
import jungleEmoji from '../../../public/images/recraft-ai-recraft-v3-svg/jungle.svg';
import spaceEmoji from '../../../public/images/recraft-ai-recraft-v3-svg/space.svg';
import underwaterEmoji from '../../../public/images/recraft-ai-recraft-v3-svg/underwater.svg';

type Theme = {
  id: string;
  name: string;
  description: string;
  graphic: React.ReactNode;
};

export const themes: Theme[] = [
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Exciting journeys and discoveries',
    graphic: <Image src={adventureEmoji} alt="Adventure" />,
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical worlds and mythical creatures',
    graphic: <Image src={fantasyEmoji} alt="Fantasy" />,
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Explore the cosmos and distant planets',
    graphic: <Image src={spaceEmoji} alt="Space" />,
  },
  {
    id: 'underwater',
    name: 'Underwater',
    description: 'Dive into oceanic adventures',
    graphic: <Image src={underwaterEmoji} alt="Underwater" />,
  },
  {
    id: 'dinosaurs',
    name: 'Dinosaurs',
    description: 'Journey back to prehistoric times',
    graphic: <Image src={dinosaursEmoji} alt="Dinosaurs" />,
  },
  {
    id: 'jungle',
    name: 'Jungle',
    description: 'Explore wild forests and meet animals',
    graphic: <Image src={jungleEmoji} alt="Jungle" />,
  },
] as const;

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
              graphic={theme.graphic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
