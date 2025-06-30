import React from 'react';
import { motion, Variants } from 'framer-motion';
import { handleNavClick } from '../utils/navigation';

// REMOVED: The old HeroIllustration component import
// import { HeroIllustration } from './HeroIllustration';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/**
 * HeroSection Component
 * This component displays the main hero section of the page, including the
 * main headline, a short description, a call-to-action button, and a prominent illustration.
 */
const HeroSection: React.FC = () => (
    <div className="bg-background-secondary dark:bg-dark-bg-secondary overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-screen-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                {/* Left Column: Text Content (No changes here) */}
                <motion.div 
                    className="md:col-span-3 text-center md:text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary dark:text-dark-heading leading-tight"
                    >
                        Your Gateway to a<br className="hidden md:block" /> Connected<br className="hidden md:block" /> Future
                    </motion.h1>
                    <motion.p 
                        variants={itemVariants}
                        className="mt-6 text-lg text-text-secondary dark:text-dark-text-primary max-w-xl mx-auto md:mx-0 leading-relaxed"
                    >
                        Stop struggling and start scaling with seamless integration for your fulfillment, inventory, and order management.
                    </motion.p>
                    <motion.div 
                        variants={itemVariants}
                        className="mt-10 flex justify-center md:justify-start"
                    >
                        <motion.a 
                            href="#pricing" 
                            onClick={handleNavClick}
                            className="bg-accent-primary hover:bg-accent-primary-light transition-all duration-300 text-text-on-accent font-bold text-lg py-3 px-6 md:py-4 md:px-8 rounded-lg text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary dark:focus-visible:ring-offset-dark-bg-secondary focus-visible:ring-border-interactive"
                            whileHover={{ scale: 1.02, y: -2, boxShadow: "0 6px 24px -5px rgba(74, 59, 42, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            Get Started
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right Column: Illustration */}
                <div className="md:col-span-2 flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full"
                    >
                        {/* --- UPDATED: Replaced component with <img> tags --- */}
                        {/* Light Mode Image */}
                        <img
                            src="/assets/hero-illustration-light.svg"
                            alt="Illustration of a connected global logistics network"
                            className="block dark:hidden w-full h-auto"
                        />
                        {/* Dark Mode Image */}
                        <img
                            src="/assets/hero-illustration-dark.svg"
                            alt="Illustration of a connected global logistics network"
                            className="hidden dark:block w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
);

export default HeroSection;