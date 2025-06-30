import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Layout';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from './icons.tsx';

type FormState = 'idle' | 'submitting' | 'success' | 'error';
type Errors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
    company?: string;
};

const ContactPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [formState, setFormState] = useState<FormState>('idle');

    const validate = (): boolean => {
        const newErrors: Errors = {};
        if (!firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!message.trim()) newErrors.message = 'Message is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setFormState('submitting');
        
        // --- Form Submission Simulation ---
        // In a real application, you would replace this with an API call to your backend service.
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormState('success');
    };

    const inputClasses = (field: keyof Errors) =>
        `w-full px-4 py-3 bg-white dark:bg-dark-bg-secondary border rounded-lg text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 transition-colors duration-300 ${
        errors[field]
            ? 'border-error focus:ring-error/50'
            : 'border-border-subtle dark:border-gray-600 focus:border-border-interactive focus:ring-accent-primary/50'
        }`;

    const labelClasses = "block text-sm font-bold text-text-primary dark:text-dark-text-primary mb-2";
    
    return (
        <Section id="contact-page" className="bg-background-secondary dark:bg-dark-bg-secondary flex items-center">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full"
            >
                <h1 className="text-4xl md:text-5xl font-display text-text-primary dark:text-dark-heading text-center mb-4 leading-snug">
                    Get in Touch
                </h1>
                <p className="text-lg text-text-secondary dark:text-dark-text-primary max-w-2xl mx-auto mb-12 md:mb-16 text-center">
                    Have questions about our solutions or pricing? Fill out the form below and a member of our team will get back to you shortly.
                </p>

                <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Form */}
                    <div className="md:col-span-3">
                         <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                 <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-accent-primary/10 border border-accent-primary text-text-primary dark:text-dark-heading rounded-lg p-8 text-center min-h-[450px] flex flex-col justify-center items-center"
                                >
                                    <span className="text-4xl mb-4" role="img" aria-label="Checkmark">✅</span>
                                    <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
                                    <p>Your message has been sent successfully. We'll be in touch soon.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit} 
                                    noValidate
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className={labelClasses}>First Name</label>
                                            <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClasses('firstName')} required />
                                            {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                                            <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClasses('lastName')} required />
                                            {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className={labelClasses}>Email</label>
                                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses('email')} required />
                                        {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="company" className={labelClasses}>Company Name <span className="text-text-secondary">(Optional)</span></label>
                                        <input type="text" id="company" value={company} onChange={e => setCompany(e.target.value)} className={inputClasses('company')} />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className={labelClasses}>Message</label>
                                        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} className={inputClasses('message')} required></textarea>
                                        {errors.message && <p className="text-error text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    <div>
                                        <button type="submit" disabled={formState === 'submitting'} className="w-full bg-accent-primary hover:bg-accent-primary-light transition-all duration-300 text-text-on-accent font-bold text-lg py-3 px-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary dark:focus-visible:ring-offset-dark-bg-secondary focus-visible:ring-border-interactive disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
                                            {formState === 'submitting' ? (
                                                <div className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </div>
                                            ) : 'Send Message'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary text-center">
                                        By submitting this form, you consent to ZoneFunnel collecting and storing your information in accordance with our <a href="#" className="underline hover:text-text-primary">Privacy Policy</a>.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Contact Info */}
                    <div className="md:col-span-2 space-y-8 mt-8 md:mt-0">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1"><MapPinIcon className="w-6 h-6 text-text-primary dark:text-accent-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold text-text-primary dark:text-dark-heading">Address</h3>
                                <p className="text-text-secondary dark:text-dark-text-primary">350 Sonic Ave, Livermore, CA 94551, United States</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                             <div className="flex-shrink-0 mt-1"><PhoneIcon className="w-6 h-6 text-text-primary dark:text-accent-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold text-text-primary dark:text-dark-heading">Call Us</h3>
                                <p className="text-text-secondary dark:text-dark-text-primary">+1 925-215-5675</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1"><EnvelopeIcon className="w-6 h-6 text-text-primary dark:text-accent-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold text-text-primary dark:text-dark-heading">Email Us</h3>
                                <p className="text-text-secondary dark:text-dark-text-primary">info@zonefunnel.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};

export default ContactPage;
