import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import TrustedBySection from './components/TrustedBySection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Chatbot from './components/Chatbot';
import ContactPage from './components/ContactPage';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
    const [page, setPage] = useState<'home' | 'contact'>('home');

    useEffect(() => {
        const handleHashChange = () => {
            const newPage = window.location.hash === '#contact' ? 'contact' : 'home';
            setPage(newPage);
            
            if (newPage === 'contact') {
                window.scrollTo(0, 0);
            }
        };

        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []); 


    const renderPage = () => {
        if (page === 'contact') {
            return <ContactPage />;
        }

        return (
            <>
                <HeroSection />
                <TrustedBySection />
                <AboutSection />
                <ServicesSection />
                <PricingSection />
                <TestimonialsSection />
                <FaqSection />
                <CtaSection />
            </>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Header />
            <main id="main-content" className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
            <Chatbot />
            <ScrollToTopButton />
        </div>
    );
};

export default App;