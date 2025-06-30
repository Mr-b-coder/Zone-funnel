
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Testimonial } from '../types';
import { Section, SectionTitle } from './Layout';

// --- Data for the Testimonials Section ---
const testimonials: Testimonial[] = [
  {
    quote: "ZoneFunnel completely transformed our operations! The seamless integration saved us countless hours and dramatically reduced errors. It's a game-changer for any e-commerce business.",
    author: 'Saul Goodman',
    title: 'CEO & Founder, Goodman Inc.',
    avatarUrl: 'https://picsum.photos/id/1005/100/100'
  },
  {
    quote: "The inventory management system is incredibly powerful yet easy to use. We finally have a single source of truth for our stock, which has been invaluable for scaling our brand.",
    author: 'Jane Smith',
    title: 'COO, Gadgetry Co.',
    avatarUrl: 'https://picsum.photos/id/1011/100/100'
  }
];

const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- Sub-component for a single testimonial card ---
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-background-secondary dark:bg-dark-bg-secondary p-8 rounded-2xl border border-border-subtle dark:border-white/10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl h-full">
        <blockquote className="font-serif text-xl italic text-text-primary dark:text-dark-text-primary border-l-4 border-accent-primary pl-6 leading-relaxed">
            "{testimonial.quote}"
        </blockquote>
        <div className="mt-6 flex items-center">
            <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4" />
            <div>
                <p className="font-bold text-text-primary dark:text-dark-text-primary">{testimonial.author}</p>
                <p className="text-text-secondary dark:text-dark-text-secondary">{testimonial.title}</p>
            </div>
        </div>
    </div>
);

/**
 * TestimonialsSection Component
 * Showcases customer testimonials to build trust and social proof.
 */
const TestimonialsSection: React.FC = () => (
    <Section id="testimonials" className="bg-background-secondary dark:bg-dark-bg-secondary">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <SectionTitle>See What Our Happy Clients Say About Us!</SectionTitle>
        </motion.div>
        <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {testimonials.map(testimonial => (
                <motion.div key={testimonial.author} variants={itemVariants}>
                    <TestimonialCard testimonial={testimonial} />
                </motion.div>
            ))}
        </motion.div>
    </Section>
);

export default TestimonialsSection;