'use client';

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroAnimation() {
  return (
    <div className="flex justify-center animate-fade-in">
      <div className="relative w-full max-w-md mx-auto h-[300px]">
        <motion.div
          initial={{ rotateY: -30, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src="/main-hero.svg"
            alt="Magical story book"
            width={400}
            height={300}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-[-30px] right-[50px] animate-float-up-down">
          <div className="w-10 h-10 text-yellow text-6xl">✨</div>
        </div>

        <div className="absolute bottom-[40px] left-[40px] animate-float-side-to-side">
          <div className="w-12 h-12 text-coral text-6xl">🧚</div>
        </div>
      </div>
    </div>
  );
}
