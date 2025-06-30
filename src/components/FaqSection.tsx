
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Section } from './Layout';
import { ChevronDownIcon } from './icons';

// --- Data for the FAQ Section ---
const faqData = [
    {
        q: 'What is ZoneFunnel?',
        a: 'ZoneFunnel is a comprehensive business management solution that integrates your order management, subscriptions, inventory, and warehouse operations into a single, streamlined platform to boost efficiency and scalability.'
    },
    {
        q: 'Can I cancel my subscription at any time?',
        a: 'Yes, you can cancel your subscription at any time. We believe in earning your business every month and do not lock you into long-term contracts for our standard plans.'
    },
    {
        q: 'What kind of support do you offer?',
        a: 'We offer email support for our Basic plan, priority support for our Standard plan, and a dedicated account manager with 24/7 phone support for our Enterprise clients.'
    },
    {
        q: 'Do you offer custom enterprise solutions?',
        a: 'Absolutely. Our Enterprise plan is fully customizable to meet the unique needs of your business, including custom integrations and advanced analytics.'
    }
];

const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- Sub-component for a single FAQ item accordion ---
const FaqItem: React.FC<{ item: { q: string, a: string }, isOpen: boolean, onToggle: () => void }> = ({ item, isOpen, onToggle }) => {
    return (
        <motion.div className="border-b border-border-subtle dark:border-white/10" variants={itemVariants}>
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left py-6 rounded-md hover:bg-background-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors px-2"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-bold text-text-primary dark:text-dark-text-primary">{item.q}</span>
                <ChevronDownIcon className={`w-5 h-5 text-border-interactive transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
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
                        <p className="pb-6 text-text-secondary dark:text-dark-text-secondary px-2 leading-relaxed">{item.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/**
 * FaqSection Component
 * An accordion-style FAQ section to answer common customer questions, presented in a two-column layout.
 */
const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Section id="faq" className="bg-background-primary dark:bg-dark-bg-primary">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                 {/* LHS: Title */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="md:sticky md:top-28"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-text-primary dark:text-dark-heading text-center md:text-left leading-tight mb-12 md:mb-0">
                        Frequently Asked Questions
                    </h2>
                </motion.div>
                
                 {/* RHS: Accordion */}
                <motion.div 
                    className="w-full"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {faqData.map((item, index) => (
                        <FaqItem 
                            key={index} 
                            item={item}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default FaqSection;