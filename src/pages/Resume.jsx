import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function Resume() {
    return (
        <PageTransition>
            <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
                {/* Animated construction icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 will-change-transform transform-gpu"
                >
                    <div className="relative w-32 h-32 mx-auto">
                        {/* Outer pulsing ring */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.05, 0.15] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-3xl bg-dark will-change-transform transform-gpu"
                        />
                        {/* Icon container */}
                        <div className="relative w-32 h-32 rounded-3xl bg-dark/[0.06] border border-dark/[0.08] flex items-center justify-center backdrop-blur-sm">
                            {/* Animated gear/wrench icon */}
                            <motion.svg
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-dark/80 will-change-transform transform-gpu"
                            >
                                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                            </motion.svg>
                        </div>
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight mb-4"
                >
                    Under Construction
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    className="text-dark/70 text-base md:text-lg max-w-md mb-2 leading-relaxed"
                >
                    The resume section is currently being crafted.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.7 }}
                    className="text-dark/85 text-base md:text-lg font-semibold mb-10"
                >
                    Kindly visit after some time. Thank You!
                </motion.p>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-16 h-[1px] bg-dark/10 mb-10 origin-center"
                />

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 bg-dark text-milky rounded-full text-sm font-medium hover:bg-dark/85 transition-colors"
                    >
                        <svg
                            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </PageTransition>
    );
}
