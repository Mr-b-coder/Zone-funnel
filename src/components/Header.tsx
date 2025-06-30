import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BurgerIcon, CloseIcon } from './icons.tsx';
import { handleNavClick } from '../utils/navigation';
import { ThemeToggle } from './ThemeToggle';

// REMOVED: The old HeaderLogo component import
// import { HeaderLogo } from './HeaderLogo';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Header Component
 * (All the state and effects logic remains the same)
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // The useEffect hook for scroll and hash changes remains unchanged
  useEffect(() => {
    const handleActivity = () => {
      let current = '';
      const headerOffset = 150; 
      
      if (window.location.hash === '#contact') {
        current = 'contact';
      } else {
        for (const link of navLinks) {
          if (link.href === '#contact') continue;
          const sectionId = link.href.substring(1);
          const section = document.getElementById(sectionId);
          if (section) {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= headerOffset) {
              current = sectionId;
            }
          }
        }
        if (!current && window.scrollY < 200 && window.location.hash !== '#contact') {
            current = '';
        }
      }
      
      setActiveLink(current);
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('hashchange', handleActivity, { passive: true });
    
    const timeoutId = setTimeout(handleActivity, 0);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('hashchange', handleActivity);
      clearTimeout(timeoutId);
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavClick(e);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const renderNavLink = (link: {href: string, label: string}, isMobile: boolean = false) => {
    const isActive = activeLink === link.href.substring(1);
    const baseClasses = "transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:text-text-primary dark:focus-visible:text-dark-heading";
    const desktopClasses = `px-1 py-0.5 ${isActive ? 'text-text-primary dark:text-dark-heading font-bold' : 'text-text-secondary dark:text-dark-text-secondary hover:text-accent-hover dark:hover:text-dark-heading'}`;
    const mobileClasses = `text-lg px-3 py-2 ${isActive ? 'text-text-primary dark:text-dark-heading font-bold' : 'text-text-secondary dark:text-dark-text-secondary hover:text-accent-hover dark:hover:text-dark-heading'}`;
    
    return (
        <a 
            key={link.href} 
            href={link.href} 
            onClick={handleLinkClick}
            className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {link.label}
        </a>
    );
  };

  return (
    <header className={`bg-background-primary/80 dark:bg-dark-bg-primary/80 backdrop-blur-md sticky top-0 z-50 border-b border-border-subtle dark:border-white/10 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className={`mx-auto px-6 max-w-screen-xl flex justify-between items-center transition-all duration-300 py-4`}>
        <a href="#" onClick={handleNavClick} aria-label="ZoneFunnel Homepage" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary dark:focus-visible:ring-offset-dark-bg-primary">
          {/* --- UPDATED: Replaced component with <img> tags for the logo --- */}
          {/* Light Mode Logo */}
          <img 
            src="/assets/logo-light.svg" 
            alt="ZoneFunnel Logo" 
            className="block dark:hidden w-auto transition-all duration-300 h-16" 
          />
          {/* Dark Mode Logo */}
          <img 
            src="/assets/logo-dark.svg" 
            alt="ZoneFunnel Logo" 
            className="hidden dark:block w-auto transition-all duration-300 h-16" 
          />
        </a>
        
        {/* The rest of the header component remains the same */}
        <div className="hidden md:flex items-center">
            <nav className="flex items-center space-x-4 lg:space-x-6">
                {navLinks.map(link => renderNavLink(link))}
            </nav>
            <div className="flex items-center ml-4 lg:ml-8 gap-4">
              <motion.a 
                  href="#pricing" 
                  onClick={handleNavClick} 
                  className="bg-accent-primary hover:bg-accent-primary-light transition-all duration-300 text-text-on-accent font-bold py-2 px-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary dark:focus-visible:ring-offset-dark-bg-primary whitespace-nowrap"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 4px 20px -5px rgba(74, 59, 42, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                  Get Started
              </motion.a>
              <ThemeToggle />
            </div>
        </div>
        
        <div className="md:hidden flex items-center gap-2">
           <ThemeToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu"
            className="p-2 rounded-md text-text-primary dark:text-dark-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive"
          >
            {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-background-primary/95 dark:bg-dark-bg-primary/95 backdrop-blur-md border-b border-border-subtle dark:border-white/10 shadow-lg"
          >
            <nav className="flex flex-col items-center space-y-4 py-8">
              {navLinks.map(link => renderNavLink(link, true))}
              <motion.a 
                href="#pricing"
                onClick={handleLinkClick}
                className="mt-4 w-4/5 text-center bg-accent-primary hover:bg-accent-primary-light transition-colors duration-300 text-text-on-accent font-bold py-3 px-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary dark:focus-visible:ring-offset-dark-bg-primary whitespace-nowrap"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 20px -5px rgba(74, 59, 42, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                Get Started
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;