# Story Sprout Homepage Redesign Implementation Plan

This document outlines the detailed implementation plan for transforming the Story Sprout homepage into a visually captivating, playful, and engaging experience.

## Design Philosophy

The redesign embraces:
- **Playfulness**: Whimsical illustrations, animations, and microinteractions
- **Delight**: Surprising elements that create moments of joy
- **Accessibility**: Maintaining standards while creating an engaging experience
- **Brand alignment**: Reinforcing Story Sprout's identity as a platform for creating magical, personalized children's stories

## Implementation Phases

### Phase 1: Foundation & Visual Identity

#### 1.1 Color Palette Expansion

Update the globals.css file to include an expanded color palette:

```css
:root {
  /* Keep existing colors */
  --background: #ffffff;
  --foreground: #171717;
  --card: #ffffff;
  --card-foreground: #171717;
  --primary: #6366f1;
  --primary-foreground: #ffffff;
  
  /* Add new playful colors */
  --yellow: #FFD166;
  --teal: #06D6A0;
  --coral: #FF6B6B;
  --lavender: #A5B4FC;
  
  /* Create gradient variables */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--lavender));
  --gradient-accent: linear-gradient(135deg, var(--yellow), var(--coral));
  --gradient-card: linear-gradient(135deg, #ffffff, var(--lavender) 300%);
  
  /* Animation timing variables */
  --animation-slow: 0.7s;
  --animation-medium: 0.4s;
  --animation-fast: 0.2s;
}
```

#### 1.2 Typography Enhancement

Add a playful font for headlines while maintaining Inter for body text:

```js
// In layout.tsx
import { Inter, Quicksand } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700']
});

// In JSX
<body className={`${inter.variable} ${quicksand.variable} font-sans`}>
```

Add to globals.css:
```css
:root {
  /* Existing variables */
  
  /* Typography */
  --font-sans: var(--font-inter);
  --font-display: var(--font-quicksand);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

#### 1.3 Install Animation Library

Add Framer Motion for animations using Bun:

```bash
bun add framer-motion
```

> **Note:** We'll use Bun for all package installations and running commands throughout this project.

### Phase 2: Component Enhancements

#### 2.1 Enhanced Card Component

Create a new playful card variant:

```tsx
// src/components/ui/enhanced-card.tsx
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';

export interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  hoverEffect?: 'lift' | 'glow' | 'none';
  variant?: 'default' | 'gradient' | 'outlined';
  animateEntry?: boolean;
}

export const EnhancedCard = ({
  className,
  hoverEffect = 'lift',
  variant = 'default',
  animateEntry = true,
  children,
  ...props
}: EnhancedCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-white to-lavender/20 border-lavender/30';
      case 'outlined':
        return 'bg-transparent border-2 border-primary/30';
      default:
        return '';
    }
  };

  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'transition-transform duration-300 hover:-translate-y-2';
      case 'glow':
        return 'transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20';
      default:
        return '';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      initial={animateEntry ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
    >
      <Card 
        className={cn(
          'rounded-xl overflow-hidden', 
          getVariantClasses(),
          getHoverClasses(),
          className
        )} 
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};

// Re-export all card components
export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
```

#### 2.2 Animated Button Component

Create enhanced button variants:

```tsx
// src/components/ui/animated-button.tsx
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

export interface AnimatedButtonProps extends ButtonProps {
  animationType?: 'bounce' | 'pulse' | 'none';
}

export const AnimatedButton = ({
  className,
  animationType = 'bounce',
  children,
  ...props
}: AnimatedButtonProps) => {
  const getAnimationProps = () => {
    switch (animationType) {
      case 'bounce':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        };
      case 'pulse':
        return {
          whileHover: { 
            boxShadow: '0 0 15px 5px rgba(99, 102, 241, 0.5)', 
            scale: 1.02 
          },
          transition: { duration: 0.2 }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className="inline-block"
      {...getAnimationProps()}
    >
      <Button
        className={cn(
          'font-medium transition-all duration-200',
          animationType === 'bounce' && 'active:translate-y-1',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};
```

#### 2.3 Animation Components

Create reusable animation components:

```tsx
// src/components/ui/animated-elements.tsx
import { motion, Variants } from 'framer-motion';
import React from 'react';

// Fade in component
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  ...props 
}: { 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
  [key: string]: any;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration,
        delay 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in component
export const SlideIn = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 50,
  ...props 
}: { 
  children: React.ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  [key: string]: any;
}) => {
  const getDirectionValues = () => {
    switch (direction) {
      case 'up': return { hidden: { y: distance }, visible: { y: 0 } };
      case 'down': return { hidden: { y: -distance }, visible: { y: 0 } };
      case 'left': return { hidden: { x: distance }, visible: { x: 0 } };
      case 'right': return { hidden: { x: -distance }, visible: { x: 0 } };
      default: return { hidden: { y: distance }, visible: { y: 0 } };
    }
  };

  const directionValues = getDirectionValues();
  
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      ...directionValues.hidden 
    },
    visible: { 
      opacity: 1, 
      ...directionValues.visible,
      transition: { 
        duration,
        delay 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
export const StaggerContainer = ({ 
  children, 
  delay = 0.1,
  staggerDelay = 0.1,
  ...props 
}: { 
  children: React.ReactNode; 
  delay?: number;
  staggerDelay?: number;
  [key: string]: any;
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      {React.Children.map(children, child => (
        <motion.div variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Scroll-triggered reveal
export const ScrollReveal = ({ 
  children,
  threshold = 0.1,
  ...props 
}: { 
  children: React.ReactNode;
  threshold?: number;
  [key: string]: any;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
```

### Phase 3: Homepage Implementation

#### 3.1 Enhanced Hero Section

Create a completely new hero section with animations and playful elements:

```tsx
// src/components/home/HeroSection.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';

// Custom BookAnimation component
const BookAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-[300px]">
      <motion.div
        initial={{ rotateY: -30, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/book-cover.svg" // We'll create this
          alt="Magical story book"
          width={400}
          height={300}
          className="object-contain"
        />
      </motion.div>
      
      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-[-30px] right-[50px]"
      >
        <Image 
          src="/images/star.svg" // We'll create this
          alt="Magic star"
          width={40}
          height={40}
        />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          x: [0, -8, 0]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
        className="absolute bottom-[40px] left-[40px]"
      >
        <Image 
          src="/images/character.svg" // We'll create this
          alt="Story character"
          width={60}
          height={60}
        />
      </motion.div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient with subtle animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-background to-background -z-10"
        animate={{ 
          background: [
            "linear-gradient(to bottom right, rgba(165, 180, 252, 0.3), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))",
            "linear-gradient(to bottom right, rgba(165, 180, 252, 0.1), rgba(255, 209, 102, 0.1), rgba(255, 255, 255, 1))",
            "linear-gradient(to bottom right, rgba(165, 180, 252, 0.3), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))",
          ]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Hero content */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Magical Stories, <br />
              Uniquely Theirs
            </motion.h1>
            
            <motion.p 
              className="text-xl text-foreground/80 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create personalized stories featuring your child as the hero, with their pets, friends, and favorite adventures. Bring imagination to life!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4 flex-wrap"
            >
              <SignedOut>
                <SignInButton mode="modal">
                  <AnimatedButton size="lg" className="rounded-full px-8">
                    Start Your Story
                  </AnimatedButton>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <Link href="/create">
                  <AnimatedButton size="lg" className="rounded-full px-8">
                    Create New Story
                  </AnimatedButton>
                </Link>
              </SignedIn>
              
              <Link href="#how-it-works">
                <AnimatedButton 
                  variant="outline" 
                  size="lg" 
                  animationType="none"
                  className="rounded-full px-8"
                >
                  How It Works
                </AnimatedButton>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right column - Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center"
          >
            <BookAnimation />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-32 right-10 opacity-30 -z-10">
        <Image
          src="/images/blob.svg" // We'll create this
          alt="Decorative shape"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};
```

#### 3.2 Features Section

Create a section highlighting key features with animations:

```tsx
// src/components/home/FeaturesSection.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal, StaggerContainer } from '../ui/animated-elements';
import { EnhancedCard, CardContent, CardHeader, CardTitle } from '../ui/enhanced-card';

const features = [
  {
    title: "Personalized Heroes",
    description: "Stories star your child and their pets as the main characters",
    icon: "/images/personalized-icon.svg" // We'll create this
  },
  {
    title: "Read-Level Matched",
    description: "Content tailored to your child's reading level",
    icon: "/images/reading-level-icon.svg" // We'll create this
  },
  {
    title: "Magical Themes",
    description: "Choose from fantasy, adventure, space exploration and more",
    icon: "/images/themes-icon.svg" // We'll create this
  },
  {
    title: "Illustrated Joy",
    description: "Vibrant illustrations bring the stories to life",
    icon: "/images/illustration-icon.svg" // We'll create this
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-lavender/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Stories As Unique As Your Child
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Every story is specially crafted to delight and inspire your little one.
            </p>
          </div>
        </ScrollReveal>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <EnhancedCard 
              key={index} 
              variant="gradient" 
              className="text-center h-full"
              hoverEffect="lift"
            >
              <CardHeader>
                <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={32}
                    height={32}
                  />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{feature.description}</p>
              </CardContent>
            </EnhancedCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
```

#### 3.3 How It Works Section

Create an interactive step-by-step guide:

```tsx
// src/components/home/HowItWorksSection.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollReveal } from '../ui/animated-elements';
import { AnimatedButton } from '../ui/animated-button';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: "Create a Profile",
    description: "Add your child's details and preferences",
    image: "/images/step-1.svg" // We'll create this
  },
  {
    number: 2,
    title: "Customize the Story",
    description: "Choose a theme, add characters, and set the scene",
    image: "/images/step-2.svg" // We'll create this
  },
  {
    number: 3,
    title: "Generate & Enjoy",
    description: "We'll create a unique story featuring your child",
    image: "/images/step-3.svg" // We'll create this
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Creating personalized stories is easy and fun with Story Sprout
            </p>
          </div>
        </ScrollReveal>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-120px)] bg-gradient-to-b from-primary via-teal to-coral hidden md:block" />
          
          {steps.map((step, index) => (
            <ScrollReveal key={index}>
              <div className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className="w-full md:w-1/2 relative">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-lavender/20 to-background rounded-lg p-6 relative overflow-hidden"
                  >
                    <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white font-display text-3xl font-bold">
                      {step.number}
                    </div>
                    <Image
                      src={step.image}
                      alt={`Step ${step.number}: ${step.title}`}
                      width={500}
                      height={300}
                      className="object-contain rounded-md"
                    />
                  </motion.div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-foreground/70 mb-4">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal>
          <div className="text-center mt-12">
            <Link href="/create">
              <AnimatedButton size="lg" className="rounded-full px-8">
                Start Creating Now
              </AnimatedButton>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
```

#### 3.4 Theme Showcase Section

Create a visual showcase of story themes:

```tsx
// src/components/home/ThemeShowcaseSection.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { StaggerContainer } from '../ui/animated-elements';
import { EnhancedCard, CardContent, CardHeader, CardTitle } from '../ui/enhanced-card';

const themes = [
  {
    name: "Adventure",
    description: "Exciting journeys and discoveries",
    image: "/images/theme-adventure.svg" // We'll create this
  },
  {
    name: "Fantasy",
    description: "Magical worlds and mythical creatures",
    image: "/images/theme-fantasy.svg" // We'll create this
  },
  {
    name: "Space",
    description: "Explore the cosmos and distant planets",
    image: "/images/theme-space.svg" // We'll create this
  },
  {
    name: "Underwater",
    description: "Dive into oceanic adventures",
    image: "/images/theme-underwater.svg" // We'll create this
  },
  {
    name: "Dinosaurs",
    description: "Journey back to prehistoric times",
    image: "/images/theme-dinosaurs.svg" // We'll create this
  },
  {
    name: "Jungle",
    description: "Explore wild forests and meet animals",
    image: "/images/theme-jungle.svg" // We'll create this
  }
];

export const ThemeShowcaseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-lavender/10 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Our stories come in a variety of themes to spark your child's imagination
          </p>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <EnhancedCard 
              key={index} 
              hoverEffect="lift" 
              className="overflow-hidden h-full"
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                <Image
                  src={theme.image}
                  alt={theme.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{theme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{theme.description}</p>
              </CardContent>
            </EnhancedCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
```

#### 3.5 Call to Action Section

Create an engaging final CTA:

```tsx
// src/components/home/CallToActionSection.tsx
import { motion } from 'framer-motion';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { AnimatedButton } from '../ui/animated-button';
import Image from 'next/image';

export const CallToActionSection = () => {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-teal/10 -z-10" />
      
      {/* Floating elements */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-12 left-12 opacity-60"
      >
        <Image
          src="/images/star-large.svg" // We'll create this
          alt="Decorative star"
          width={60}
          height={60}
        />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute bottom-12 right-12 opacity-60"
      >
        <Image
          src="/images/cloud.svg" // We'll create this
          alt="Decorative cloud"
          width={80}
          height={40}
        />
      </motion.div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-display font-bold mb-6 leading-tight">
            Begin Your Child's Magical Story Journey Today
          </h2>
          <p className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto">
            Give your child the gift of personalized adventure where they're the hero of their own tale
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <AnimatedButton 
                  size="lg" 
                  className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
                  animationType="bounce"
                >
                  Start Creating Stories
                </AnimatedButton>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link href="/create">
                <AnimatedButton 
                  size="lg" 
                  className="rounded-full px-10 py-6 text-lg shadow-lg shadow-primary/20"
                  animationType="bounce"
                >
                  Create Your Next Story
                </AnimatedButton>
              </Link>
            </SignedIn>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### Phase 4: Illustrations and Assets

Create or acquire the following assets:

1. Book illustrations for the hero section
2. Themed illustrations for each story type
3. Step-by-step process illustrations
4. Decorative elements (stars, clouds, characters)
5. Feature icons

These can be created as SVGs for optimal performance.

### Phase 5: Main Page Integration

Finally, update the main homepage file:

```tsx
// src/app/page.tsx
'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ThemeShowcaseSection } from '@/components/home/ThemeShowcaseSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ThemeShowcaseSection />
      <CallToActionSection />
    </main>
  );
}
```

## Implementation Notes

### Performance Considerations

1. Use the `will-change` CSS property only where necessary
2. Implement proper code-splitting to reduce initial load
3. Use the `type: 'reduce-motion'` media query to respect user preferences
4. Optimize and compress all SVG illustrations

### Accessibility

1. Ensure all animations can be disabled
2. Maintain proper contrast ratios
3. Test with screen readers
4. Use semantic HTML elements

### Mobile Responsiveness

1. Test all animations on mobile devices
2. Ensure proper layout scaling
3. Optimize touch interactions
4. Test performance on lower-end devices

## Next Steps

1. Create the SVG illustrations and assets
2. Implement the foundational CSS updates
3. Create the animation utility components
4. Build the new homepage sections
5. Test across devices and browsers
6. Deploy and gather feedback