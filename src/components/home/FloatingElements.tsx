'use client';

import { motion } from 'framer-motion';

export function FloatingElements() {
  return (
    <>
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
        className="absolute top-12 left-12 opacity-60"
      >
        <div className="text-5xl">✨</div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 1,
        }}
        className="absolute bottom-12 right-12 opacity-60"
      >
        <div className="text-5xl">☁️</div>
      </motion.div>
    </>
  );
}
