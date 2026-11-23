import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/content";
import SALogo from "./SALogo";

const overlayVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: {
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
};

const linkVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.3 + i * 0.07,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
    exit: (i) => ({
        y: -30,
        opacity: 0,
        transition: {
            delay: i * 0.03,
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function OverlayMenu({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[150] bg-milky flex items-center justify-center"
                >
                    {/* Close X button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        onClick={onClose}
                        className="absolute top-8 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-dark/5 hover:bg-dark/10 transition-colors z-10"
                        aria-label="Close menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-dark" />
                        </svg>
                    </motion.button>

                    <nav className="flex flex-col items-center gap-6 md:gap-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="mb-2"
                        >
                            <SALogo size={48} priority={true} />
                        </motion.div>
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                custom={i}
                            >
                                <NavLink
                                    to={link.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `text-4xl md:text-6xl font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-dark" : "text-dark/60 hover:text-dark"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </motion.div>
                        ))}

                        <motion.div
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={navLinks.length}
                            className="pt-3"
                        >
                            <NavLink
                                to="/resume"
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-full bg-dark text-milky text-lg md:text-xl font-medium tracking-wide flex items-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <span>Resume</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                                </svg>
                            </NavLink>
                        </motion.div>
                    </nav>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="absolute bottom-10 text-sm text-dark/60 tracking-widest uppercase"
                    >
                        Navigation
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
