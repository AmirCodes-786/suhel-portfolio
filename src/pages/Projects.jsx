import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import ProjectModal from "../components/ProjectModal";
import { projectsData } from "../data/content";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [search, setSearch] = useState("");

    const filteredProjects = projectsData.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    const flagships = filteredProjects.filter((p) => p.tier === "flagship");
    const supporting = filteredProjects.filter((p) => p.tier === "supporting");
    const older = filteredProjects.filter((p) => p.tier === "older");

    const renderProjectCard = (project, index, isFlagship = false) => {
        return (
            <motion.div
                key={project.id}
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-2xl border transition-all duration-300 will-change-transform transform-gpu ${
                    isFlagship
                        ? "p-5 md:p-6 bg-card-bg hover:bg-card-hover border-dark/15 hover:border-dark/30 shadow-md shadow-dark/[0.02]"
                        : project.tier === "supporting"
                        ? "p-4 md:p-5 bg-card-bg hover:bg-card-hover border-dark/[0.08] hover:border-dark/20 shadow-sm"
                        : "p-3.5 md:p-4 bg-card-bg/70 hover:bg-card-hover border-dark/[0.06] hover:border-dark/15"
                }`}
            >
                <div className="flex flex-col gap-3">
                    {/* Header Row: ID, Badge, Tier & Quick Arrow */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <span className="text-xs font-mono text-dark/60">
                                {String(project.id).padStart(2, "0")}
                            </span>
                            <div className="w-5 h-[1px] bg-dark/15" />
                            {isFlagship ? (
                                <span className="text-[10px] tracking-[0.2em] uppercase font-mono px-2.5 py-0.5 rounded-full border border-dark/20 text-dark/90 bg-dark/[0.04] font-semibold">
                                    FLAGSHIP PROJECT
                                </span>
                            ) : (
                                <span className="text-[10px] tracking-wider uppercase font-mono text-dark/50">
                                    {project.tier === "supporting" ? "Supporting" : "Exploratory"}
                                </span>
                            )}
                        </div>

                        {/* Top-right quick detail indicator */}
                        <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center group-hover:border-dark group-hover:bg-dark group-hover:text-milky transition-all">
                            <svg
                                className="w-3.5 h-3.5 text-dark/60 group-hover:text-milky transition-colors -rotate-45"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h3 className={`font-bold text-dark tracking-tight transition-colors ${
                            isFlagship ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl md:text-2xl"
                        }`}>
                            {project.title}
                        </h3>
                        <p className={`text-dark/75 mt-2 leading-relaxed ${
                            isFlagship ? "text-sm sm:text-base max-w-3xl" : "text-xs sm:text-sm max-w-2xl"
                        }`}>
                            {project.description}
                        </p>
                    </div>

                    {/* Key Capabilities for Flagship */}
                    {isFlagship && project.capabilities && (
                        <div className="pt-1">
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-dark/80">
                                {project.capabilities.slice(0, 3).map((cap, i) => (
                                    <span key={i} className="inline-flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-dark/60" />
                                        <span>{cap}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="text-[11px] font-medium text-dark/75 border border-dark/[0.08] px-2.5 py-0.5 rounded-full bg-dark/[0.02]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* CTAs Bar */}
                    <div
                        className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-dark/[0.07]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Primary CTA: Live Demo */}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-dark text-milky rounded-full text-xs font-semibold hover:bg-dark/85 transition-all shadow-xs"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Live Demo</span>
                            </a>
                        )}

                        {/* Secondary CTA: GitHub */}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-dark/20 text-dark rounded-full text-xs font-medium hover:bg-dark hover:text-milky transition-all"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                <span>GitHub</span>
                            </a>
                        )}

                        {/* Flagship Case Study CTA */}
                        {isFlagship && project.slug && (
                            <Link
                                to={`/projects/${project.slug}`}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-dark/20 bg-dark/[0.04] text-dark rounded-full text-xs font-medium hover:bg-dark hover:text-milky transition-all"
                            >
                                <span>Read Case Study</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <PageTransition>
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col h-full pt-24 pb-6">
                {/* Compact Title + Search Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-dark/[0.06]">
                    <div className="flex items-center gap-3">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-2xl sm:text-3xl font-bold text-dark tracking-tight"
                        >
                            Projects
                        </motion.h1>
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border border-dark/15 text-dark/60 bg-dark/[0.03]">
                            14 Projects
                        </span>
                    </div>

                    {/* Compact Search Bar with enhanced visibility */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative w-full sm:w-64"
                    >
                        <div className="relative flex items-center rounded-xl border border-dark/20 bg-card-bg/90 hover:border-dark/35 focus-within:border-dark/60 focus-within:ring-1 focus-within:ring-dark/20 shadow-xs transition-all duration-200">
                            <svg
                                className="absolute left-3 w-4 h-4 text-dark/70 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search stack or title..."
                                className="w-full pl-9 pr-8 py-2 text-xs font-medium text-dark placeholder-dark/50 bg-transparent outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-2.5 p-1 rounded-full text-dark/50 hover:text-dark hover:bg-dark/10 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M2 2l8 8M10 2L2 10" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Project Cards - scrollable area maximizing screen height */}
                <motion.div
                    key={filteredProjects.map((p) => p.id).join(",")}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin"
                    style={{ maxHeight: "calc(100vh - 165px)" }}
                >
                    {filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-dark/60">
                            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-sm">No projects found for "{search}"</p>
                        </div>
                    ) : (
                        <>
                            {/* If search is active, render flat matching list */}
                            {search.trim() ? (
                                <div className="space-y-4">
                                    <div className="text-xs font-mono uppercase tracking-widest text-dark/50">
                                        Matching Projects ({filteredProjects.length})
                                    </div>
                                    {filteredProjects.map((project, idx) =>
                                        renderProjectCard(project, idx, project.tier === "flagship")
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* TIER 1: FLAGSHIP WORK */}
                                    {flagships.length > 0 && (
                                        <section className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-dark/70 font-semibold">
                                                    01 — Flagship Engineering Products
                                                </span>
                                                <div className="flex-1 h-[1px] bg-dark/10" />
                                            </div>
                                            <div className="space-y-5">
                                                {flagships.map((project, idx) =>
                                                    renderProjectCard(project, idx, true)
                                                )}
                                            </div>
                                        </section>
                                    )}

                                    {/* TIER 2: STRONG SUPPORTING WORK */}
                                    {supporting.length > 0 && (
                                        <section className="space-y-4 pt-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-dark/60 font-semibold">
                                                    02 — Strong Supporting Work
                                                </span>
                                                <div className="flex-1 h-[1px] bg-dark/10" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {supporting.map((project, idx) =>
                                                    renderProjectCard(project, idx, false)
                                                )}
                                            </div>
                                        </section>
                                    )}

                                    {/* TIER 3: ADDITIONAL / EXPLORATORY WORK */}
                                    {older.length > 0 && (
                                        <section className="space-y-4 pt-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-dark/50 font-semibold">
                                                    03 — Exploratory & Additional Work
                                                </span>
                                                <div className="flex-1 h-[1px] bg-dark/10" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                                {older.map((project, idx) =>
                                                    renderProjectCard(project, idx, false)
                                                )}
                                            </div>
                                        </section>
                                    )}
                                </>
                            )}
                        </>
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
