import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons.tsx';
import { createChat } from '../utils/gemini';
import type { Chat } from '@google/genai';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

/**
 * Chatbot Component
 * 
 * This component provides a floating chat interface that interacts with the Google Gemini API.
 * It manages the chat state, handles user input, and displays the conversation history,
 * including streaming responses from the AI.
 * 
 * State:
 * - `isOpen`: Controls the visibility of the chat window.
 * - `messages`: An array of message objects representing the conversation history.
 * - `isLoading`: A boolean to indicate when the bot is waiting for a response.
 * - `input`: The current value of the user's input field.
 * 
 * Refs:
 * - `chatRef`: Holds the Gemini `Chat` instance to maintain the conversation context.
 * - `messagesEndRef`: A reference to an element at the end of the message list to auto-scroll.
 */
const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize the chat when the user opens the chatbot for the first time.
    useEffect(() => {
        if (isOpen && !chatRef.current) {
            const chat = createChat();
            if (chat) {
                chatRef.current = chat;
                setMessages([
                    { id: 1, text: "Hi! I'm the ZoneFunnel assistant. How can I help you today?", sender: 'bot' }
                ]);
            } else {
                 setMessages([
                    { id: 1, text: "Sorry, the chatbot is currently unavailable.", sender: 'bot' }
                ]);
            }
        }
    }, [isOpen]);

    // Automatically scroll to the latest message.
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    /**
     * Handles the form submission when a user sends a message.
     * It sends the user's message to the Gemini API and streams the response back.
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const newUserMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Initiate a streaming request to the Gemini API.
            const stream = await chatRef.current.sendMessageStream({ message: currentInput });
            
            let botResponse = '';
            const botMessageId = Date.now() + 1;

            // Add an empty bot message to the state to update it as chunks arrive.
            setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);

            // Process the stream chunk by chunk.
            for await (const chunk of stream) {
                botResponse += chunk.text;
                // Update the bot's message in the state with the latest content.
                setMessages(prev => prev.map(msg => 
                    msg.id === botMessageId ? { ...msg, text: botResponse } : msg
                ));
            }

        } catch (error) {
            console.error('Gemini API error:', error);
            const errorMessage: Message = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[600px] bg-background-secondary dark:bg-dark-bg-secondary rounded-2xl shadow-2xl flex flex-col z-50 border border-border-subtle dark:border-white/10"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Chatbot"
                >
                    <header className="flex items-center justify-between p-4 border-b border-border-subtle dark:border-white/10 flex-shrink-0">
                        <h3 className="font-bold text-text-primary dark:text-dark-heading">ZoneFunnel Assistant</h3>
                        <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="p-1 rounded-full text-text-secondary dark:text-dark-text-secondary hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            <CloseIcon className="w-5 h-5"/>
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-accent-primary text-text-on-accent rounded-br-none' : 'bg-gray-200 dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 dark:bg-dark-bg-primary rounded-2xl px-4 py-2 rounded-bl-none">
                                    <div className="flex items-center space-x-2">
                                        <span className="h-2 w-2 bg-text-secondary dark:bg-dark-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-text-secondary dark:bg-dark-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-text-secondary dark:bg-dark-text-secondary rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 border-t border-border-subtle dark:border-white/10 flex-shrink-0">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="w-full bg-background-primary dark:bg-dark-bg-primary border border-border-subtle dark:border-gray-600 rounded-lg py-2 pl-4 pr-12 text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-border-interactive"
                                disabled={isLoading || !chatRef.current}
                                aria-label="Chat input"
                            />
                            <button type="submit" disabled={isLoading || !input.trim() || !chatRef.current} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-accent-primary disabled:text-gray-400 dark:disabled:text-gray-600 enabled:hover:bg-accent-primary/20 transition-colors" aria-label="Send message">
                                <SendIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </form>
                </motion.div>
            ) : (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-accent-primary text-text-on-accent dark:bg-dark-heading dark:text-dark-bg-primary p-4 rounded-full shadow-lg z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background-primary dark:focus-visible:ring-offset-dark-bg-primary focus-visible:ring-border-interactive"
                    aria-label="Open chat"
                >
                    <ChatBubbleIcon className="w-8 h-8"/>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default Chatbot;
