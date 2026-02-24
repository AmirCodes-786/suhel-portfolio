import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 40, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        filter: "blur(6px)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className="fixed inset-0 z-[200] flex p-4 pt-32 pb-4 md:p-8 md:pt-32"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-2xl max-h-full m-auto overflow-y-auto bg-milky rounded-3xl p-6 md:p-12 shadow-2xl z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-dark/5 hover:bg-dark/10 transition-colors text-dark/90 hover:text-dark"
                            aria-label="Close modal"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold text-dark tracking-tight mb-2 pr-12 md:pr-0"
                        >
                            {project.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-dark/80 text-base mb-8"
                        >
                            {project.description}
                        </motion.p>

                        <div className="space-y-8">
                            {/* Problem */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.5 }}
                            >
                                <h3 className="text-xs uppercase tracking-[0.2em] text-dark/70 mb-3 font-medium">
                                    Problem
                                </h3>
                                <p className="text-dark leading-relaxed">{project.problem}</p>
                            </motion.div>

                            {/* Solution */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <h3 className="text-xs uppercase tracking-[0.2em] text-dark/70 mb-3 font-medium">
                                    Solution
                                </h3>
                                <p className="text-dark leading-relaxed">{project.solution}</p>
                            </motion.div>

                            {/* Tech stack */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.5 }}
                            >
                                <h3 className="text-xs uppercase tracking-[0.2em] text-dark/70 mb-3 font-medium">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-sm border border-dark/10 rounded-full text-dark bg-dark/[0.02]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex justify-center gap-4 pt-4"
                            >
                                <Link
                                    to="/coming-soon"
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-6 py-3 bg-dark text-milky rounded-full text-sm font-medium hover:bg-dark/80 transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                                    </svg>
                                    Buy Code
                                </Link>
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 border border-dark/15 rounded-full text-sm font-medium bg-dark text-milky md:bg-transparent md:text-dark md:hover:bg-dark md:hover:text-milky transition-all"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Live Demo
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
