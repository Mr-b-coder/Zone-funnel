import React from 'react';

/**
 * A reusable Section component with a standard layout.
 * @param id - The ID for the section, used for navigation.
 * @param className - Additional classes for styling.
 * @param children - The content of the section.
 */
export const Section: React.FC<{id: string; className?: string; children: React.ReactNode}> = ({id, className, children}) => (
    <section id={id} className={`py-16 md:py-24 ${className || ''}`}>
        <div className="container mx-auto px-6 max-w-screen-xl">
            {children}
        </div>
    </section>
);

/**
 * A reusable component for section titles with consistent styling.
 * @param children - The text for the title.
 */
export const SectionTitle: React.FC<{children: React.ReactNode}> = ({children}) => (
    <h2 className="text-4xl md:text-5xl font-display text-text-primary dark:text-dark-heading text-center mb-12 md:mb-16 leading-snug">{children}</h2>
);
