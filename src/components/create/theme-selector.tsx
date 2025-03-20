'use client';

import type { CreateOutlineFormData } from '@/app/create/page';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ThemeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

// Theme options with icons and colors
const themes: {
  value: CreateOutlineFormData['storyTheme'];
  label: string;
  iconRelativeUrl: string;
  color: string;
  description: string;
}[] = [
  {
    value: 'adventure',
    label: 'Adventure',
    iconRelativeUrl: '/images/recraft-ai-recraft-v3-svg/adventure.svg',
    color: '#FFD166',
    description:
      'A colourful, attractive icon representing a delightful outdoor adventure that captures the essence of exploration and joy in nature. Design a simple yet evocative symbol that conveys movement, discovery, and the thrill of the wilderness. Consider incorporating elements like mountains, trees, paths, or water features with a cheerful color palette that evokes sunshine, fresh air, and the freedom of open spaces. The icon should be visually appealing at different sizes and instantly communicate a sense of excitement and wonder about experiencing the natural world.',
  },
  {
    value: 'fantasy',
    label: 'Fantasy',
    iconRelativeUrl: '/images/recraft-ai-recraft-v3-svg/fantasy.svg',
    color: '#A5B4FC',
    description:
      'Create a vibrant, eye-catching icon depicting a fantasy adventure scene where a knight in gleaming armor stands poised with sword drawn, facing a mystical dragon. Include magical elements like glowing runes, sparkling spell effects in jewel tones, and a medieval castle silhouette in the background. Blend rich colors like royal purple, emerald green, and burnished gold to evoke a sense of magic and heroism. The composition should work well at small sizes while maintaining its fantastical details and adventurous spirit.',
  },
  {
    value: 'space',
    label: 'Space',
    iconRelativeUrl: '/images/recraft-ai-recraft-v3-svg/space.svg',
    color: '#818CF8',
    description:
      'Create a vibrant, eye-catching icon depicting a thrilling journey through space, featuring a sleek spacecraft with a luminous trail zooming past colorful nebulae, distant galaxies, and swirling cosmic dust. Incorporate dynamic motion lines, lens flares, and a subtle gradient background transitioning from deep space black to rich purple or blue. Ensure the design works well at small sizes while maintaining visual impact and conveying a sense of adventure, discovery and the infinite possibilities of space exploration.',
  },
  {
    value: 'underwater',
    label: 'Underwater',
    iconRelativeUrl: '/images/recraft-ai-recraft-v3-svg/underwater.svg',
    color: '#06D6A0',
    description:
      'Create a vibrant, eye-catching circular icon depicting an underwater adventure with dynamic elements - perhaps a diver navigating through a colorful coral reef, surrounded by exotic fish in electric blues and oranges. Include shimmering light rays penetrating the depths, bubbles creating visual movement, and subtle treasure elements to evoke exploration and discovery. The composition should balance detail with clarity to remain recognizable at smaller sizes while capturing the wonder and excitement of deep-sea exploration.',
  },
  {
    value: 'dinosaurs',
    label: 'Dinosaurs',
    iconRelativeUrl: '/images/recraft-ai-recraft-v3-svg/dinosaurs.svg',
    color: '#FF6B6B',
    description:
      'Create a vibrant, eye-catching circular icon depicting a prehistoric adventure scene with dynamic dinosaurs in action - perhaps a T-Rex roaring against a dramatic sunset, or velociraptors racing through lush Jurassic foliage. Use bold, saturated colors with striking contrasts between warm amber/orange tones and cool teals/greens. Include subtle details like flying pterodactyls or volcanic activity in the background while maintaining clarity at small sizes. The composition should convey excitement and wonder while remaining recognizable when scaled down for app or website use.',
  },
  {
    value: 'jungle',
    label: 'Jungle',
    iconRelativeUrl: '/images/recraft-ai-recraft-v3-svg/jungle.svg',
    color: '#06D6A0',
    description:
      'Create a vibrant, eye-catching circular icon depicting an adventurer swinging on vines through a lush jungle canopy, with exotic birds in flight, sunlight filtering through emerald foliage, and ancient temple ruins visible in the background. Use rich greens, golden sunbeams, and pops of tropical color to convey the excitement and mystery of wilderness exploration.',
  },
];

export const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <motion.div
          key={theme.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'theme-option cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-2',
            value === theme.value && 'theme-option-selected'
          )}
          onClick={() => onChange(theme.value)}
          style={{
            backgroundColor: value === theme.value ? `${theme.color}15` : 'transparent',
          }}
        >
          <Image src={theme.iconRelativeUrl} alt={theme.label} width={200} height={200} />
          <span className="font-medium text-background">{theme.label}</span>
        </motion.div>
      ))}
    </div>
  );
};
