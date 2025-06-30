import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDownIcon } from './icons.tsx'; // This is still needed
import { Section, SectionTitle } from './Layout';

// REMOVED: Old illustration component imports
// import { MissionIllustration } from './MissionIllustration';
// import { CollaborationIllustration } from './CollaborationIllustration';
// import { IntegrationIllustration } from './IntegrationIllustration';

// --- UPDATED: Data structure to hold image paths for light and dark themes ---
const aboutData = [
    {
        title: "Our Mission",
        text: "Innovation is the key to launch ZoneFunnel. We saw a massive gap in the logistics industry, where businesses struggled with slow, expensive, and overly complex shipping solutions. Our mission is to simplify this process, providing a single, powerful platform to connect all fulfillment points seamlessly.",
        // We now use an object to store paths for both themes
        image: {
            light: '/assets/mission-light.svg',
            dark: '/assets/mission-dark.svg',
        }
    },
    {
        title: "Bringing Fulfillment Companies Together",
        text: "We found the solution. This platform is to bring all the fulfillment companies around the world together, creating a unified network that benefits everyone. By fostering collaboration, we eliminate inefficiencies and open up new opportunities for growth for our partners.",
        image: {
            light: '/assets/collaboration-light.svg',
            dark: '/assets/collaboration-dark.svg',
        }
    },
    {
        title: "It's True",
        text: "This platform allows to integrate with ANY eCommerce shopping cart API within MINUTES. Our powerful, flexible architecture is designed for speed and simplicity, ensuring you can connect your existing tools and get up and running without headaches or long development cycles.",
        image: {
            light: '/assets/integration-light.svg',
            dark: '/assets/integration-dark.svg',
        }
    }
];

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
};

// --- Sub-component for a single accordion item (No changes here) ---
const AboutAccordionItem: React.FC<{item: typeof aboutData[0]; isOpen: boolean; onToggle: () => void;}> = ({ item, isOpen, onToggle }) => {
    return (
        <div className="border-b border-border-subtle dark:border-white/10 last-of-type:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left py-6 rounded-md hover:bg-background-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{item.title}</span>
                <div className="relative w-5 h-5">
                    <ChevronDownIcon className={`w-5 h-5 text-accent-primary transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-180' : ''}`} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                        aria-hidden={!isOpen}
                    >
                        <p className="pt-2 pb-6 text-text-secondary dark:text-dark-text-secondary leading-relaxed">{item.text}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


/**
 * AboutSection Component
 * This section features an interactive accordion to explain the company's mission and vision,
 * paired with dynamic illustrations that change based on the selected accordion item.
 */
const AboutSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = aboutData[activeIndex]; // Get the currently active item

    return (
        <Section id="about" className="bg-background-primary dark:bg-dark-bg-primary">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <SectionTitle>About ZoneFunnel</SectionTitle>
            </motion.div>
            <motion.div
                className="grid md:grid-cols-5 gap-12 items-center"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Left Column: Accordion */}
                <div className="md:col-span-3">
                    <div>
                        {aboutData.map((item, index) => (
                            <AboutAccordionItem
                                key={index}
                                item={item}
                                isOpen={activeIndex === index}
                                onToggle={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                {/* Right Column: Dynamic Illustrations */}
                <div className="hidden md:block md:col-span-2 order-first md:order-last relative aspect-square">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* --- UPDATED: Replaced component with <img> tags for light and dark modes --- */}
                            <>
                                {/* Light Mode Image: Visible by default, hidden in dark mode */}
                                <img
                                    src={activeItem.image.light}
                                    alt={`${activeItem.title} illustration`}
                                    className="block dark:hidden w-full h-full object-contain"
                                />
                                {/* Dark Mode Image: Hidden by default, visible in dark mode */}
                                <img
                                    src={activeItem.image.dark}
                                    alt={`${activeItem.title} illustration`}
                                    className="hidden dark:block w-full h-full object-contain"
                                />
                            </>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </Section>
    );
};

export default AboutSection;