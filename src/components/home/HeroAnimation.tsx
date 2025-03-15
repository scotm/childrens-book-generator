'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex justify-center"
    >
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
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
          className="absolute top-[-30px] right-[50px]"
        >
          <div className="w-10 h-10 text-yellow text-6xl">✨</div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 6, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            delay: 0.5,
          }}
          className="absolute bottom-[40px] left-[40px]"
        >
          <div className="w-12 h-12 text-coral text-6xl">🧚</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
