import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import ProjectModal from "../components/ProjectModal";
import { projectsData } from "../data/content";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [search, setSearch] = useState("");

    const filteredProjects = projectsData.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <PageTransition>
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-12">
                {/* Section label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-[0.3em] uppercase text-dark/30 font-medium mb-6"
                >
                    Projects
                </motion.span>

                {/* Title + Search row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight"
                    >
                        Selected Work
                    </motion.h1>

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.6 }}
                        className="relative w-full sm:w-64"
                    >
                        <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/25 pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/60 border border-dark/[0.08] rounded-xl text-dark placeholder-dark/30 outline-none focus:border-dark/20 focus:bg-white/80 transition-all duration-300"
                        />
                    </motion.div>
                </div>

                {/* Project Cards - scrollable area */}
                <motion.div
                    key={filteredProjects.map(p => p.id).join(",")}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin"
                    style={{ maxHeight: "calc(100vh - 320px)" }}
                >
                    {filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-dark/30">
                            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-sm">No projects found for "{search}"</p>
                        </div>
                    ) : (
                        filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setSelectedProject(project)}
                                className="group cursor-pointer p-6 md:p-8 border border-dark/[0.06] rounded-2xl bg-white/40 hover:bg-white/70 transition-all duration-500 hover:border-dark/10 hover:shadow-lg hover:shadow-dark/[0.03]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs text-dark/30 font-mono">
                                                {String(project.id).padStart(2, "0")}
                                            </span>
                                            <div className="w-6 h-[1px] bg-dark/10" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-dark tracking-tight group-hover:text-dark/80 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-dark/40 text-sm mt-2 max-w-md">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {project.techStack.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs text-dark/30 border border-dark/[0.06] px-2.5 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="text-xs text-dark/25 px-2.5 py-1">
                                                    +{project.techStack.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="mt-2 w-10 h-10 rounded-full border border-dark/[0.06] flex items-center justify-center group-hover:bg-dark group-hover:border-dark transition-all duration-300">
                                        <svg
                                            className="w-4 h-4 text-dark/30 group-hover:text-white transition-colors -rotate-45"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </PageTransition>
    );
}
