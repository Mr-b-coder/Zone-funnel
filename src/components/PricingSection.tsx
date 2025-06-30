
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PricingPlan } from '../types';
import { Section, SectionTitle } from './Layout';
import { CheckIcon } from './icons';
import { handleNavClick } from '../utils/navigation';

// --- Data for the Pricing Section ---
const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic Pack',
    price: '200',
    period: 'month',
    features: ['One time setup fee $ 1000', 'Transaction fee $0.07 / Orders', '50 Stores', '10,000 Orders / Month'],
    isPopular: false,
    ctaText: 'Get Started'
  },
  {
    name: 'Standard',
    price: '990',
    period: 'month',
    features: ['Everything in Basic', 'Subscription Management', 'API Access', 'Priority Support', 'Warehouse Integration'],
    isPopular: true,
    ctaText: 'Sign Up'
  },
  {
    name: 'Enterprise',
    price: '1500',
    period: 'month',
    features: ['One time setup fee $ 1000', 'Transaction fee $0.03 / Orders', 'Custom Integrations', '100 Stores', 'Unlimited Orders / Month'],
    isPopular: false,
    ctaText: 'Get Started'
  },
];

const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- Sub-component for a single pricing card ---
const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
    <div className={`bg-background-secondary dark:bg-dark-bg-secondary rounded-2xl p-8 flex flex-col transition-all duration-300 ease-in-out ${plan.isPopular ? 'border-2 border-border-interactive transform lg:scale-105 lg:hover:scale-[1.07] hover:shadow-xl' : 'border border-border-subtle dark:border-white/10 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl'}`}>
        {plan.isPopular && (
            <div className="bg-accent-primary text-text-on-accent text-xs font-bold px-4 py-1 rounded-full uppercase self-center -mt-12 mb-4">Most Popular</div>
        )}
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary text-center">{plan.name}</h3>
        <div className="text-center my-6">
            <span className="text-5xl font-display text-text-primary dark:text-dark-heading">{plan.price.startsWith('$') || plan.price === 'Custom' ? plan.price : `$${plan.price}`}</span>
            {plan.period && <span className="text-text-secondary dark:text-dark-text-secondary">/ {plan.period}</span>}
        </div>
        <ul className="space-y-4 mb-8 flex-grow">
            {plan.features.map(feature => (
                <li key={feature} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-border-interactive mr-3 mt-1 flex-shrink-0" />
                    <span className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">{feature}</span>
                </li>
            ))}
        </ul>
        <motion.a 
            href="#footer" 
            onClick={handleNavClick} 
            className={`w-full text-center font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary dark:focus-visible:ring-offset-dark-bg-secondary focus-visible:ring-border-interactive ${plan.isPopular ? 'bg-accent-primary text-text-on-accent hover:bg-accent-primary-light' : 'bg-transparent text-text-primary dark:text-accent-primary border-2 border-border-interactive hover:bg-accent-primary/10 hover:border-accent-primary'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {plan.ctaText}
        </motion.a>
    </div>
);

/**
 * PricingSection Component
 * Lays out the different pricing plans in a grid, highlighting the most popular option.
 */
const PricingSection: React.FC = () => (
    <Section id="pricing" className="bg-background-primary dark:bg-dark-bg-primary">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <SectionTitle>Affordable Packages</SectionTitle>
        </motion.div>
        <motion.div 
            className="grid lg:grid-cols-3 gap-8 items-start"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {pricingPlans.map(plan => <motion.div key={plan.name} variants={itemVariants} className="h-full"><PricingCard plan={plan} /></motion.div>)}
        </motion.div>
    </Section>
);

export default PricingSection;
// This component displays a pricing section with three plans, highlighting the most popular one.