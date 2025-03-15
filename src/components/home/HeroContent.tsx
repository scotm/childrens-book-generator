import { HeroButtons } from './HeroButtons';
import { motion } from 'framer-motion';

export function HeroContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-primary to-teal">
        Magical Stories, <br />
        Uniquely Theirs
      </h1>

      <p className="text-xl text-foreground/80 mb-8 max-w-lg">
        Create personalized stories featuring your child as the hero, with their pets, friends, and
        favorite adventures. Bring their imagination to life!
      </p>
      <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
        <HeroButtons />
      </motion.div>
    </div>
  );
}
