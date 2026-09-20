import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { siteConfig, skillsData, educationData, achievementsData } from "../data/content";

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Resume() {
    useEffect(() => {
        document.title = "Resume | Suhel Ansari — AI Full-Stack Developer";
        return () => {
            document.title = "Suhel Ansari | AI Full-Stack Developer";
        };
    }, []);

    return (
        <PageTransition>
            <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col h-full pt-24 pb-20 overflow-y-auto scrollbar-thin">
                {/* Navigation Bar */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-dark/[0.08]">
                    <Link
                        to="/"
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
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <a
                            href={`mailto:${siteConfig.email}?subject=Official%20Resume%20Request%20-%20Suhel%20Ansari`}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-dark text-milky rounded-full text-xs font-semibold hover:bg-dark/85 transition-all shadow-xs"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>Request Official PDF</span>
                        </a>
                    </div>
                </div>

                <motion.div variants={staggerVariants} initial="hidden" animate="visible" className="space-y-10">
                    {/* Header Resume Card */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-dark/60 font-medium">
                                    Curriculum Vitae
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mt-1">
                                    Suhel Ansari
                                </h1>
                                <p className="text-base font-semibold text-dark/80 mt-1">
                                    AI Full-Stack Developer & BCA Student
                                </p>
                            </div>

                            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs text-dark/75">
                                <a href={`mailto:${siteConfig.email}`} className="hover:text-dark transition-colors flex items-center gap-1.5 font-medium">
                                    <span>{siteConfig.email}</span>
                                </a>
                                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-dark transition-colors">
                                    github.com/AmirCodes-786
                                </a>
                                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-dark transition-colors">
                                    linkedin.com/in/suhel-ansari
                                </a>
                                <span className="text-dark/60">Ranchi, Jharkhand, India</span>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mt-6 pt-5 border-t border-dark/[0.06]">
                            <p className="text-sm md:text-base text-dark/85 leading-relaxed">
                                BCA Data Science & AI student and full-stack software engineer focused on building production-grade web applications and AI-integrated digital products. Experienced in taking products from concept to cloud deployment with React, Node.js, Express, MongoDB, Socket.IO, and structured LLM API pipelines.
                            </p>
                        </div>
                    </motion.div>

                    {/* Technical Competencies */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <h2 className="text-xs uppercase tracking-[0.25em] text-dark/70 font-semibold mb-6">
                            Technical Competencies
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Object.entries(skillsData).map(([category, items]) => (
                                <div key={category}>
                                    <h3 className="text-xs font-mono uppercase tracking-wider text-dark/60 mb-2 font-medium">
                                        {category}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs font-medium text-dark/85 px-2.5 py-1 rounded-lg border border-dark/[0.08] bg-dark/[0.02]"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Flagship Projects */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xs uppercase tracking-[0.25em] text-dark/70 font-semibold">
                                Flagship Engineering Work
                            </h2>
                            <Link to="/projects" className="text-xs text-dark/70 hover:text-dark font-medium underline">
                                View all 14 projects →
                            </Link>
                        </div>

                        <div className="space-y-6">
                            {/* Project 1 */}
                            <div className="border-l-2 border-dark/20 pl-4 py-1 space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="text-base font-bold text-dark">QuizForge AI</h3>
                                    <div className="flex items-center gap-2">
                                        <a href="https://quizforge-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-dark font-medium underline">
                                            Live Demo ↗
                                        </a>
                                        <Link to="/projects/ai-quiz-generator" className="text-xs text-dark/70 hover:text-dark">
                                            Case Study
                                        </Link>
                                    </div>
                                </div>
                                <p className="text-xs text-dark/60 font-mono">React 19 · Node.js · Express · Socket.io · MongoDB Atlas · Gemini 2.0 · Groq LPU · Clerk</p>
                                <p className="text-xs md:text-sm text-dark/80 leading-relaxed">
                                    Next-gen multi-modal AI assessment platform supporting note/PDF/YouTube ingestion, Bloom’s Taxonomy calibration, real-time Socket.io battle arena, 3D flashcards, and public verifiable certificates.
                                </p>
                            </div>

                            {/* Project 2 */}
                            <div className="border-l-2 border-dark/20 pl-4 py-1 space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="text-base font-bold text-dark">VibeHub — Modern Social Network</h3>
                                    <div className="flex items-center gap-2">
                                        <a href="https://vibehub-app.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-dark font-medium underline">
                                            Live Demo ↗
                                        </a>
                                        <Link to="/projects/vibehub" className="text-xs text-dark/70 hover:text-dark">
                                            Case Study
                                        </Link>
                                    </div>
                                </div>
                                <p className="text-xs text-dark/60 font-mono">React 19 · Vite · Tailwind CSS v4 · Express · MongoDB · TanStack Query · Supabase</p>
                                <p className="text-xs md:text-sm text-dark/80 leading-relaxed">
                                    Production-ready full-stack social platform featuring tab-switch feed stability, dynamic video duration stories, custom glassmorphism video player, dual JWT/Supabase auth, and 37 automated backend tests.
                                </p>
                            </div>

                            {/* Project 3 */}
                            <div className="border-l-2 border-dark/20 pl-4 py-1 space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="text-base font-bold text-dark">AI Resume Builder</h3>
                                    <div className="flex items-center gap-2">
                                        <a href="https://suhel-resume-builder.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-dark font-medium underline">
                                            Live Demo ↗
                                        </a>
                                        <Link to="/projects/ai-resume-builder" className="text-xs text-dark/70 hover:text-dark">
                                            Case Study
                                        </Link>
                                    </div>
                                </div>
                                <p className="text-xs text-dark/60 font-mono">React · Tailwind CSS · Node.js · Express · AI API · PDF Engine</p>
                                <p className="text-xs md:text-sm text-dark/80 leading-relaxed">
                                    Full-stack AI-powered resume creation platform featuring live side-by-side preview synchronization, role-specific accomplishment bullet generation, and ATS-compliant multi-template PDF exports.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education & Academic Background */}
                    <motion.div variants={itemVariants} className="p-6 md:p-8 rounded-2xl bg-card-bg border border-dark/[0.08]">
                        <h2 className="text-xs uppercase tracking-[0.25em] text-dark/70 font-semibold mb-6">
                            Education
                        </h2>

                        <div className="space-y-6">
                            {educationData.slice(0, 2).map((edu) => (
                                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                    <div>
                                        <h3 className="text-base font-bold text-dark">{edu.degree}</h3>
                                        <p className="text-xs font-semibold text-dark/80">{edu.specialization}</p>
                                        <p className="text-xs text-dark/65">{edu.institution}</p>
                                    </div>
                                    <span className="text-xs font-mono text-dark/60 whitespace-nowrap">{edu.period}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Verified Metrics */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {achievementsData.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-dark/[0.08] bg-card-bg text-center">
                                <span className="text-2xl font-bold text-dark block font-mono">
                                    {item.number}{item.suffix}
                                </span>
                                <span className="text-xs text-dark/70 mt-1 block font-medium">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Recruiter Contact CTA */}
                    <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-card-bg border border-dark/15 text-center space-y-4">
                        <h2 className="text-2xl font-bold text-dark tracking-tight">
                            Connect with Suhel
                        </h2>
                        <p className="text-sm text-dark/75 max-w-md mx-auto">
                            Open to full-stack, frontend, and AI engineering opportunities. Feel free to reach out directly.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="px-6 py-2.5 bg-dark text-milky rounded-full text-xs font-semibold hover:bg-dark/85 transition-all shadow-sm"
                            >
                                Send Email ({siteConfig.email})
                            </a>
                            <a
                                href={siteConfig.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 border border-dark/20 text-dark rounded-full text-xs font-medium hover:bg-dark hover:text-milky transition-all"
                            >
                                Connect on LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
