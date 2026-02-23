import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const name = "Suhel.";

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
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-milky"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex overflow-hidden">
                        {name.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: 0.3 + i * 0.08,
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="text-5xl md:text-7xl font-bold text-dark tracking-tight"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>

                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originX: 0 }}
                    >
                        <div className="h-[2px] w-16 bg-dark/30" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
