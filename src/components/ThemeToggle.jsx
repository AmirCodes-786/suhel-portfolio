import { useState } from "react";
import { motion } from "framer-motion";

/**
 * PremiumThemeToggle - A reusable, isolated animated toggle component.
 * Uses Framer Motion for high-fidelity animations and Tailwind for styling.
 * 
 * Props:
 * @param {boolean} isOn - Toggle state
 * @param {function} onToggle - Callback function when clicked
 */
const PremiumThemeToggle = ({ isOn = false, onToggle }) => {
    return (
        <button
            onClick={() => onToggle?.(!isOn)}
            className={`relative w-14 h-8 rounded-full p-1 transition-all duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-dark/20 ${isOn ? "bg-dark/80" : "bg-dark/20"
                } border border-dark/10 backdrop-blur-md shadow-inner group`}
            aria-label="Toggle theme"
        >
            <motion.div
                className="relative z-10 w-6 h-6 rounded-full bg-milky shadow-lg flex items-center justify-center overflow-hidden"
                initial={false}
                animate={{
                    x: isOn ? 24 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {/* Animated Icon Container */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: isOn ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {isOn ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-dark fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.243 1.757a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-1.757 4.243a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.243-1.757a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm1.757-4.243a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-dark fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </motion.div>
            </motion.div>

            {/* Background glowing effects */}
            <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-md pointer-events-none transition-opacity duration-300 bg-dark"
                animate={{
                    opacity: isOn ? 0.3 : 0,
                }}
            />
        </button>
    );
};

export default PremiumThemeToggle;
