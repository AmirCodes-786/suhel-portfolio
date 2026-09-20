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

                        {/* Badge and ID */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs text-dark/60 font-mono">
                                {String(project.id).padStart(2, "0")}
                            </span>
                            <div className="w-6 h-[1px] bg-dark/10" />
                            {project.tier === "flagship" && (
                                <span className="text-[10px] tracking-[0.2em] uppercase font-mono px-2.5 py-0.5 rounded-full border border-dark/20 text-dark/80 bg-dark/[0.04]">
                                    {project.badge || "Flagship Project"}
                                </span>
                            )}
                        </div>

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
                            className="text-dark/80 text-base mb-8 leading-relaxed"
                        >
                            {project.description}
                        </motion.p>

                        <div className="space-y-8">
                            {/* Key Capabilities if available */}
                            {project.capabilities && project.capabilities.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.22, duration: 0.5 }}
                                >
                                    <h3 className="text-xs uppercase tracking-[0.2em] text-dark/70 mb-3 font-medium">
                                        Verified Engineering Capabilities
                                    </h3>
                                    <ul className="space-y-2">
                                        {project.capabilities.map((cap, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-dark/85">
                                                <span className="w-1.5 h-1.5 rounded-full bg-dark/60 mt-2 shrink-0" />
                                                <span>{cap}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Problem */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.5 }}
                            >
                                <h3 className="text-xs uppercase tracking-[0.2em] text-dark/70 mb-3 font-medium">
                                    Problem
                                </h3>
                                <p className="text-dark/85 leading-relaxed text-sm md:text-base">{project.problem}</p>
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
                                <p className="text-dark/85 leading-relaxed text-sm md:text-base">{project.solution}</p>
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
                                            className="px-3 py-1.5 text-xs md:text-sm border border-dark/10 rounded-full text-dark bg-dark/[0.02]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4 border-t border-dark/[0.08]"
                            >
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-dark text-milky rounded-full text-sm font-medium hover:bg-dark/85 transition-all shadow-sm"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}

                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 border border-dark/20 rounded-full text-sm font-medium text-dark hover:bg-dark hover:text-milky transition-all"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                        </svg>
                                        GitHub
                                    </a>
                                )}

                                {project.tier === "flagship" && project.slug && (
                                    <Link
                                        to={`/projects/${project.slug}`}
                                        onClick={onClose}
                                        className="flex items-center gap-2 px-5 py-2.5 border border-dark/20 bg-dark/[0.04] rounded-full text-sm font-medium text-dark hover:bg-dark hover:text-milky transition-all"
                                    >
                                        <span>Read Case Study</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
