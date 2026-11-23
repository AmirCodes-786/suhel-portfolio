import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete?.(), 600);
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-milky dark:bg-[#0A0A0A] selection:bg-transparent"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Centered Brand Emblem Presentation */}
                    <div className="relative flex flex-col items-center justify-center">
                        {/* Ambient Pulsing Emerald Halo */}
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.3] }}
                            transition={{ duration: 1.6, ease: "easeOut" }}
                            className="absolute -inset-6 rounded-full bg-emerald-500/25 blur-2xl pointer-events-none"
                        />

                        {/* Master SA Monogram Emblem */}
                        <motion.div
                            initial={{ scale: 0.75, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.15,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                        >
                            <img
                                src="/branding/sa-logo-512.png"
                                srcSet="/branding/sa-logo-192.png 192w, /branding/sa-logo-512.png 512w"
                                sizes="(max-width: 768px) 96px, 112px"
                                alt="SA Logo"
                                width={112}
                                height={112}
                                priority="true"
                                className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(16,185,129,0.3)]"
                            />
                        </motion.div>

                        {/* Brand Name Typography Reveal */}
                        <div className="mt-6 flex flex-col items-center overflow-hidden">
                            <motion.div
                                initial={{ y: 24, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex items-center gap-1.5"
                            >
                                <span className="text-xl md:text-2xl font-bold tracking-tight text-dark dark:text-milky font-sans">
                                    Suhel Ansari
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            </motion.div>

                            <motion.span
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.7,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="text-[10px] md:text-xs tracking-[0.28em] uppercase text-dark/60 dark:text-milky/60 font-mono mt-1"
                            >
                                AI Full-Stack Developer
                            </motion.span>
                        </div>
                    </div>

                    {/* Minimalist Emerald Progress Track */}
                    <div className="absolute bottom-12 w-28 h-[2px] bg-dark/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{
                                delay: 0.4,
                                duration: 1.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
