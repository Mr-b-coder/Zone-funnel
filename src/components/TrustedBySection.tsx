import React from 'react';

// REMOVED: Old logo component imports
// import { ... } from './PartnerLogos';

// --- NEW: Data array for partner logos ---
// This array holds objects, each with the partner's name and the paths
// to their light and dark mode logos.
// Note: The paths assume your 'assets' folder is in the 'public' directory.
const partnerLogosData = [
  { name: 'Asana', light: '/assets/partners/asana-light.svg', dark: '/assets/partners/asana-dark.svg' },
  { name: 'FedEx', light: '/assets/partners/fedex-light.svg', dark: '/assets/partners/fedex-dark.svg' },
  { name: 'Klaviyo', light: '/assets/partners/klaviyo-light.svg', dark: '/assets/partners/klaviyo-dark.svg' },
  { name: 'Mailchimp', light: '/assets/partners/mailchimp-light.svg', dark: '/assets/partners/mailchimp-dark.svg' },
  { name: 'Salesforce', light: '/assets/partners/salesforce-light.svg', dark: '/assets/partners/salesforce-dark.svg' },
  { name: 'Shopify', light: '/assets/partners/shopify-light.svg', dark: '/assets/partners/shopify-dark.svg' },
  { name: 'Slack', light: '/assets/partners/slack-light.svg', dark: '/assets/partners/slack-dark.svg' },
  { name: 'Stripe', light: '/assets/partners/stripe-light.svg', dark: '/assets/partners/stripe-dark.svg' },
];


const TrustedBySection: React.FC = () => {
  return (
    <div className="bg-background-primary dark:bg-dark-bg-primary py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: Text (No changes here) */}
          <div className="w-full md:w-1/4 text-center md:text-left flex-shrink-0">
            <h3 className="font-bold text-sm text-text-primary dark:text-dark-text-secondary tracking-wider uppercase">
              Trusted By 100,000+
              <br />
              Companies
            </h3>
          </div>

          {/* Right: Marquee */}
          <div className="group w-full md:w-3/4 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,_black_15%,_black_85%,transparent_100%)]">
            <div className="flex">
              {/* Render the block of logos twice for a seamless loop */}
              {[...Array(2)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 flex items-center animate-scroll" 
                  aria-hidden={i > 0}
                >
                  {partnerLogosData.map((logo) => (
                    <div key={`${i}-${logo.name}`} className="mx-10">
                      {/* --- UPDATED: Render two <img> tags for light/dark mode --- */}
                      {/* Light Mode Image */}
                      <img 
                        src={logo.light} 
                        alt={logo.name} 
                        className="block dark:hidden h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300" 
                      />
                      {/* Dark Mode Image */}
                      <img 
                        src={logo.dark} 
                        alt={logo.name} 
                        className="hidden dark:block h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300" 
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;