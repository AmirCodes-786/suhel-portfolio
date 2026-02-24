import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function ComingSoon() {
    return (
        <PageTransition>
            <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center">
                {/* Animated icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10"
                >
                    <div className="relative w-32 h-32 mx-auto">
                        {/* Pulsing ring */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.05, 0.15] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-3xl bg-dark"
                        />
                        {/* Icon container */}
                        <div className="relative w-32 h-32 rounded-3xl bg-dark/[0.06] border border-dark/[0.08] flex items-center justify-center backdrop-blur-sm">
                            <motion.svg
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-dark/80"
                            >
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
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
                    Coming Soon
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    className="text-dark/70 text-base md:text-lg max-w-md mb-2 leading-relaxed"
                >
                    The source code for this project will be available for purchase soon.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.7 }}
                    className="text-dark/85 text-base md:text-lg font-semibold mb-10"
                >
                    Stay tuned. Thank You!
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
                        to="/projects"
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
                        Back to Projects
                    </Link>
                </motion.div>
            </div>
        </PageTransition>
    );
}
