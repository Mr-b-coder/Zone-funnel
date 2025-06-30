import React from 'react';
import { handleNavClick } from '../utils/navigation';

// REMOVED: Old logo and icon component imports
// import { FooterLogo } from './FooterLogo';
// import { XIcon, LinkedInIcon, ... } from './icons.tsx';

const usefulLinks = [
    { name: 'Home', href: '#' },
    { name: 'About us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Terms of service', href: '#' },
];

const serviceLinks = [
    { name: 'Order Management', href: '#services' },
    { name: 'Subscriptions Management', href: '#services' },
    { name: 'Inventory Management', href: '#services' },
    { name: 'Warehouse Management', href: '#services' },
];

// --- NEW: Data array for social media links ---
const socialLinksData = [
    { name: 'LinkedIn', href: '#', iconSrc: '/assets/social/linkedin.svg' },
    { name: 'Facebook', href: '#', iconSrc: '/assets/social/facebook.svg' },
    { name: 'YouTube', href: '#', iconSrc: '/assets/social/youtube.svg' },
    { name: 'Instagram', href: '#', iconSrc: '/assets/social/instagram.svg' },
    { name: 'X (Twitter)', href: '#', iconSrc: '/assets/social/x.svg' },
    { name: 'TikTok', href: '#', iconSrc: '/assets/social/tiktok.svg' },
];

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-light-bg-footer dark:bg-dark-bg-footer text-dark-text-primary">
      <div className="container mx-auto px-6 py-20 md:py-24">
        
        {/* Top section with info and links (no changes needed here) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-sm items-start">
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-dark-heading">ZoneFunnel Infotech Pvt. Ltd.</h4>
            <div className="text-dark-text-secondary space-y-2 opacity-75">
              <p>350 Sonic Ave, Livermore, CA 94551, United States</p>
              <p><b className="text-dark-text-primary font-bold opacity-100">Phone:</b> +1 925-215-5675</p>
              <p><b className="text-dark-text-primary font-bold opacity-100">Email:</b> info@zonefunnel.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-dark-heading">Useful Links</h4>
            <ul className="space-y-2 opacity-75">
              {usefulLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} onClick={e => { if (link.href.startsWith('#')) handleNavClick(e)}} className="text-dark-text-secondary hover:text-accent-primary transition-colors hover:opacity-100">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-dark-heading">Our Services</h4>
            <ul className="space-y-2 opacity-75">
              {serviceLinks.map(link => (
                <li key={link.name}>
                   <a href={link.href} onClick={e => { if (link.href.startsWith('#')) handleNavClick(e)}} className="text-dark-text-secondary hover:text-accent-primary transition-colors hover:opacity-100">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wider text-dark-heading">Join Our Newsletter</h4>
            <p className="text-dark-text-secondary opacity-75">Stay up-to-date with the latest industry news and ZoneFunnel updates.</p>
            <form onSubmit={e => e.preventDefault()} className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="newsletter-email" className="sr-only">Enter your email</label>
                <input type="email" id="newsletter-email" placeholder="Enter your email" className="flex-grow w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-dark-text-primary placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary transition-colors duration-300"/>
                <button type="submit" className="bg-accent-primary hover:bg-accent-primary-light transition-all duration-300 text-text-on-accent font-bold py-2 px-6 rounded-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Middle section with "Contact Us" and social links */}
        <div className="mb-20 md:mb-24 w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2 text-center lg:text-left">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
                        <span className="font-regular text-dark-text-secondary">How can we help?</span>
                        <a href="#contact" onClick={handleNavClick} className="ml-4 text-accent-primary hover:text-accent-primary-light underline decoration-accent-primary/50 hover:decoration-accent-primary transition-colors">
                            Contact us
                        </a>
                    </h3>
                </div>
                <div className="text-center lg:text-left">
                     <h4 className="font-bold uppercase tracking-wider text-dark-heading mb-4">Follow us on</h4>
                     <div className="flex justify-center lg:justify-start items-center gap-5">
                        {/* --- UPDATED: Social icons are now mapped from data --- */}
                        {socialLinksData.map(link => (
                            <a key={link.name} href={link.href} aria-label={link.name}>
                                <img 
                                    src={link.iconSrc} 
                                    alt={`${link.name} logo`} 
                                    className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity duration-300"
                                />
                            </a>
                        ))}
                     </div>
                </div>
            </div>
        </div>

        <hr className="border-white/10" />

        {/* Bottom section with logo and copyright */}
        <div className="mt-12 md:mt-16 flex flex-col items-start">
            <a href="#" onClick={handleNavClick} aria-label="ZoneFunnel Homepage" className="block w-full mb-8 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-text-primary dark:focus-visible:ring-offset-dark-bg-footer">
                {/* --- UPDATED: Replaced component with an <img> tag for the logo --- */}
                <img 
                    src="/assets/footer-logo.svg" 
                    alt="ZoneFunnel Logo"
                    className="w-full h-auto" 
                />
            </a>
            
            <div className="flex flex-col items-start gap-y-4 md:flex-row md:items-center md:gap-x-4 text-sm text-dark-text-secondary opacity-75">
                <p>© Zonefunnel 2025</p>
                <div className="flex items-center gap-x-4">
                    <a href="#" className="hover:text-dark-heading transition-colors hover:opacity-100">Terms of Use</a>
                    <a href="#" className="hover:text-dark-heading transition-colors hover:opacity-100">Privacy Notice</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;