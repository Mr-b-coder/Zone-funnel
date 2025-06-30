import React from 'react';
import { motion, Variants } from 'framer-motion';
import { handleNavClick } from '../utils/navigation';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const CtaSection: React.FC = () => {
  return (
    <section
      id="cta"
      // --- UPDATED: Directly applying your custom radial gradients ---
      className="
        py-24
        bg-[radial-gradient(circle,_#492a13,_#402816,_#372619,_#2e231b,_#25211e)]
        dark:bg-[radial-gradient(circle,_#006837,_#005945,_#004848,_#003740,_#15272f)]
      "
    >
      <motion.div
        className="container mx-auto px-6 max-w-screen-xl grid grid-cols-1 md:grid-cols-3 items-center gap-12 text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Column: Text Content */}
        <motion.div className="md:col-span-2" variants={itemVariants}>
            <p
              className="text-sm font-sans text-accent-primary uppercase"
              style={{ letterSpacing: '0.1em' }}
            >
              GET STARTED
            </p>
            <h2
              // Text remains white as both backgrounds are dark
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mt-4"
            >
              Give Our Products a Spin – It’s Free
            </h2>
        </motion.div>

        {/* Right Column: Button */}
        <motion.div variants={itemVariants} className="md:col-span-1 flex justify-center md:justify-end mt-8 md:mt-0">
          <motion.a
            href="#pricing"
            onClick={handleNavClick}
            // --- UPDATED: Focus ring offset matches the outer color of each gradient ---
            className="inline-block bg-accent-primary text-text-on-accent font-bold font-sans py-5 px-10 text-lg rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#25211e] dark:focus-visible:ring-offset-[#15272f]"
            whileHover={{ 
              scale: 1.05, 
              y: -2, 
              boxShadow: "0 0 25px rgba(244, 193, 141, 0.6)",
              filter: "brightness(1.1)"
            }}
            whileTap={{ scale: 0.98, y: 0, filter: "brightness(1)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Start Your Free Trial
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CtaSection;