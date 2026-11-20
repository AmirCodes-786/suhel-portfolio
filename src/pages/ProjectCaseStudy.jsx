import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { projectsData } from "../data/content";

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.04 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function ProjectCaseStudy() {
    const { slug } = useParams();
    const containerRef = useRef(null);

    // Find the project matching the slug
    const project = projectsData.find((p) => p.slug === slug);
    const flagships = projectsData.filter((p) => p.tier === "flagship");
    const currentIndex = flagships.findIndex((p) => p.slug === slug);

    const prevFlagship = currentIndex > 0 ? flagships[currentIndex - 1] : null;
    const nextFlagship = currentIndex < flagships.length - 1 ? flagships[currentIndex + 1] : null;

    useEffect(() => {
        if (project) {
            document.title = `${project.title} — Case Study | Suhel Ansari`;
        }
        return () => {
            document.title = "Suhel — Full-Stack Developer & AI Builder";
        };
    }, [project]);

    // Reset scroll to top immediately when slug changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project || !project.caseStudy) {
        return (
            <PageTransition>
                <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pt-28 pb-12 text-center">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-dark/60 mb-4">Case Study</span>
                    <h1 className="text-3xl font-bold text-dark mb-4">Project Not Found</h1>
                    <p className="text-dark/70 mb-8 max-w-md">The case study you are looking for does not exist or has been moved.</p>
                    <Link
                        to="/projects"
                        className="px-6 py-3 bg-dark text-milky rounded-full text-sm font-medium hover:bg-dark/85 transition-all"
                    >
                        ← Back to Projects
                    </Link>
                </div>
            </PageTransition>
        );
    }

    const { caseStudy } = project;

    return (
        <PageTransition>
            <div ref={containerRef} className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-20 overflow-y-auto scrollbar-thin">
                {/* Back to Projects Bar */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-dark/[0.08]">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-dark/70 hover:text-dark transition-colors group"
                    >
                        <svg
                            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Projects</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] tracking-[0.25em] uppercase font-mono px-2.5 py-1 rounded-full border border-dark/20 text-dark/80 bg-dark/[0.04]">
                            {project.badge || "Flagship Project"}
                        </span>
                    </div>
                </div>

                <motion.div variants={staggerVariants} initial="hidden" animate="visible" className="space-y-12">
                    {/* ========================================================================= */}
                    {/* 01 — OVERVIEW */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-dark/60 font-mono">
                                CASE STUDY #{String(project.id).padStart(2, "0")}
                            </span>
                            <div className="w-10 h-[1px] bg-dark/15" />
                            <span className="text-xs text-dark/60 font-medium">
                                {caseStudy.overview.category}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.1]">
                            {project.title}
                        </h1>

                        <p className="text-lg md:text-xl text-dark/80 max-w-3xl leading-relaxed">
                            {caseStudy.overview.summary}
                        </p>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div>
                                <span className="block text-[11px] uppercase tracking-wider text-dark/60 mb-1 font-medium">Role</span>
                                <span className="text-sm font-semibold text-dark">{caseStudy.overview.role}</span>
                            </div>
                            <div>
                                <span className="block text-[11px] uppercase tracking-wider text-dark/60 mb-1 font-medium">Project Scope</span>
                                <span className="text-sm font-semibold text-dark">{caseStudy.overview.timeline}</span>
                            </div>
                            <div>
                                <span className="block text-[11px] uppercase tracking-wider text-dark/60 mb-1 font-medium">Repository Status</span>
                                <span className="text-sm font-semibold text-dark">Verified & Public</span>
                            </div>
                        </div>

                        {/* Tech Stack Chips */}
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-dark/60 mb-3 font-medium">
                                Core Technology Stack
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs md:text-sm font-medium text-dark/90 px-3.5 py-1.5 rounded-full border border-dark/15 bg-dark/[0.03]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Primary CTAs */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-dark text-milky rounded-full text-sm font-semibold hover:bg-dark/85 transition-all shadow-md"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Launch Live Demo</span>
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 border border-dark/20 text-dark rounded-full text-sm font-medium hover:bg-dark hover:text-milky transition-all"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    <span>Inspect GitHub</span>
                                </a>
                            )}
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 02 & 03 — PROBLEM & WHY IT MATTERS */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">02</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Problem</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-3">The Architectural Dilemma</h2>
                            <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                {caseStudy.problem}
                            </p>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">03</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Why It Matters</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-3">Engineering Relevance</h2>
                            <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                {caseStudy.whyItMatters}
                            </p>
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 04 — SOLUTION */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono text-dark/60">04</span>
                            <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Solution</span>
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-4">Engineered Implementation</h2>
                        <p className="text-sm md:text-base text-dark/85 leading-relaxed mb-6">
                            {caseStudy.solution}
                        </p>

                        {/* Verified Capabilities */}
                        {project.capabilities && (
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-dark/70 font-semibold mb-3">
                                    Verified Core Capabilities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {project.capabilities.map((cap, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-dark/[0.06] bg-dark/[0.02]">
                                            <span className="text-xs font-mono text-dark/60 mt-0.5">#{i + 1}</span>
                                            <span className="text-sm text-dark/85 leading-snug">{cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 05 — ARCHITECTURE */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono text-dark/60">05</span>
                            <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">System Architecture</span>
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-6">End-to-End Data Flow</h2>

                        <div className="space-y-3">
                            {caseStudy.architecture.steps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-xl border border-dark/[0.08] bg-dark/[0.02] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                                >
                                    <div className="shrink-0 w-44">
                                        <span className="text-sm font-bold text-dark block">{step.title}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-dark/80">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 06 & 07 — FRONTEND & BACKEND */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">06</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Frontend Layer</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-3">Client Application</h2>
                            <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                {caseStudy.frontend}
                            </p>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">07</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Backend Layer</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-3">Server & API Services</h2>
                            <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                {caseStudy.backend}
                            </p>
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 08 & 09 — DATABASE & AUTHENTICATION */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">08</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Data Model</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-3">Database Persistence</h2>
                            <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                {caseStudy.database}
                            </p>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">09</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Security & Access</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-3">Authentication</h2>
                            <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                {caseStudy.authentication}
                            </p>
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 10 — AI WORKFLOW / PIPELINE */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono text-dark/60">10</span>
                            <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Workflow & Logic</span>
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-3">Engineering Execution Pipeline</h2>
                        <p className="text-sm md:text-base text-dark/85 leading-relaxed">
                            {caseStudy.aiWorkflow}
                        </p>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 11 & 12 — ENGINEERING DECISIONS & CHALLENGES */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">11</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Technical Decisions</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-4">Key Architectural Choices</h2>
                            <div className="space-y-4">
                                {caseStudy.engineeringDecisions.map((dec, i) => (
                                    <div key={i} className="border-l-2 border-dark/20 pl-4 py-1">
                                        <h3 className="text-sm font-bold text-dark mb-1">{dec.decision}</h3>
                                        <p className="text-xs md:text-sm text-dark/75 leading-relaxed">{dec.rationale}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono text-dark/60">12</span>
                                <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Challenges Solved</span>
                            </div>
                            <h2 className="text-xl font-bold text-dark mb-4">Overcoming Real Hurdles</h2>
                            <div className="space-y-4">
                                {caseStudy.challenges.map((c, i) => (
                                    <div key={i} className="border-l-2 border-dark/20 pl-4 py-1">
                                        <h3 className="text-sm font-bold text-dark mb-1">{c.challenge}</h3>
                                        <p className="text-xs md:text-sm text-dark/75 leading-relaxed">{c.solution || c.rationale}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 13 — SCREENSHOTS & VERIFICATION */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono text-dark/60">13</span>
                            <span className="text-xs uppercase tracking-widest text-dark/70 font-semibold">Verification</span>
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-2">Live Production Deployment</h2>
                        <p className="text-sm text-dark/75 mb-6">
                            Verified deployment running live in production on cloud infrastructure with public access.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-xl border border-dark/10 bg-dark/[0.03] gap-4">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-mono text-dark/90 break-all">{project.live}</span>
                            </div>
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-dark text-milky rounded-full text-xs font-medium hover:bg-dark/85 transition-all whitespace-nowrap"
                            >
                                Open Live URL ↗
                            </a>
                        </div>
                    </motion.section>

                    {/* ========================================================================= */}
                    {/* 14 & 15 — PROMINENT LIVE DEMO & GITHUB CTAs */}
                    {/* ========================================================================= */}
                    <motion.section variants={itemVariants} className="p-8 md:p-12 rounded-3xl bg-card-bg border border-dark/15 text-center space-y-6">
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-dark/60 block">14 & 15 — Inspection Points</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-dark tracking-tight">
                            Experience the Engineering First-Hand
                        </h2>
                        <p className="text-sm md:text-base text-dark/75 max-w-xl mx-auto">
                            Inspect the live production environment or explore the complete codebase and commits on GitHub.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-8 py-3.5 bg-dark text-milky rounded-full text-sm font-semibold hover:bg-dark/85 transition-all shadow-lg"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Launch Live Demo</span>
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-8 py-3.5 border border-dark/20 text-dark rounded-full text-sm font-medium hover:bg-dark hover:text-milky transition-all"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    <span>Explore GitHub</span>
                                </a>
                            )}
                        </div>
                    </motion.section>

                    {/* Flagship Navigation Bar */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-dark/[0.08]">
                        {prevFlagship ? (
                            <Link
                                to={`/projects/${prevFlagship.slug}`}
                                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-dark/70 hover:text-dark transition-colors group cursor-pointer"
                            >
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Previous: {prevFlagship.title}</span>
                            </Link>
                        ) : <div />}

                        {nextFlagship ? (
                            <Link
                                to={`/projects/${nextFlagship.slug}`}
                                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-dark/70 hover:text-dark transition-colors group cursor-pointer"
                            >
                                <span>Next: {nextFlagship.title}</span>
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        ) : <div />}
                    </motion.div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
