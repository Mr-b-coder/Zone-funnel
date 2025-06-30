
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Service } from '../types';
import { Section, SectionTitle } from './Layout';
import { OrderIcon, SubscriptionIcon, InventoryIcon, WarehouseIcon } from './icons';

// --- Data for the Services Section ---
const services: Service[] = [
  {
    icon: <OrderIcon className="w-10 h-10 text-border-interactive" />,
    title: 'Order Management',
    description: 'Streamline your entire order lifecycle, from initial placement to final delivery, with automated efficiency.'
  },
  {
    icon: <SubscriptionIcon className="w-10 h-10 text-border-interactive" />,
    title: 'Subscriptions',
    description: 'Effortlessly manage recurring revenue with our flexible and powerful subscription billing system.'
  },
  {
    icon: <InventoryIcon className="w-10 h-10 text-border-interactive" />,
    title: 'Inventory',
    description: 'Gain real-time visibility and control over your stock levels across all channels to prevent overselling.'
  },
  {
    icon: <WarehouseIcon className="w-10 h-10 text-border-interactive" />,
    title: 'Warehouse',
    description: 'Optimize your warehouse operations, from receiving to shipping, for maximum productivity.'
  },
];

const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
};
  
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- Sub-component for a single service card ---
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-background-secondary dark:bg-dark-bg-secondary p-8 rounded-2xl border border-border-subtle dark:border-white/10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl h-full">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-primary/20 mb-6">
            {service.icon}
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary font-sans">{service.title}</h3>
        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary font-sans leading-relaxed">{service.description}</p>
    </div>
);

/**
 * ServicesSection Component
 * Displays a grid of cards, each highlighting a key service offered by the company.
 */
const ServicesSection: React.FC = () => (
    <Section id="services" className="bg-background-secondary dark:bg-dark-bg-secondary">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <SectionTitle>Empowering Your Business with<br />Seamless Management Solutions!</SectionTitle>
        </motion.div>
        <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {services.map(service => (
                <motion.div key={service.title} variants={itemVariants}>
                    <ServiceCard service={service} />
                </motion.div>
            ))}
        </motion.div>
    </Section>
);

export default ServicesSection;