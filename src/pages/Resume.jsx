import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { siteConfig } from "../data/content";

export default function Resume() {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.title = "Suhel Ansari — Resume";
        return () => {
            document.title = "Suhel Ansari | AI Full-Stack Developer";
        };
    }, []);

    const handleShare = async () => {
        const shareData = {
            title: "Suhel Ansari — Resume",
            text: "Check out Suhel Ansari's software engineering resume (AI Full-Stack Developer & BCA Student).",
            url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Share failed", err);
                }
            }
        }

        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            // Fallback for older browsers
            const input = document.createElement("input");
            input.value = window.location.href;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <PageTransition>
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col h-full pt-20 sm:pt-24 pb-20 overflow-y-auto scrollbar-thin">
                {/* Action Bar (hidden on print) */}
                <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-dark/[0.08]">
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

                    {/* Actions: Download, Print, Share */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Direct PDF Download */}
                        <a
                            href="/Suhel_Ansari_Resume.pdf"
                            download="Suhel_Ansari_Resume.pdf"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-dark text-milky rounded-full text-xs font-semibold hover:bg-dark/85 active:scale-95 transition-all shadow-sm"
                            title="Download verified vector PDF"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span>Download PDF</span>
                        </a>

                        {/* Print / Save to PDF */}
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-dark/20 text-dark rounded-full text-xs font-medium hover:bg-dark/5 active:scale-95 transition-all"
                            title="Open native browser print / save dialog"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 6 2 18 2 18 9" />
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                <rect x="6" y="14" width="12" height="8" />
                            </svg>
                            <span className="hidden sm:inline">Print / Save</span>
                        </button>

                        {/* Share Resume Link */}
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-dark/20 text-dark rounded-full text-xs font-medium hover:bg-dark/5 active:scale-95 transition-all"
                            title="Share or copy resume link"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* Copy Feedback Toast */}
                <AnimatePresence>
                    {copied && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="no-print mb-4 p-3 bg-dark text-milky text-xs font-medium rounded-xl flex items-center justify-between shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Resume share link copied to clipboard!</span>
                            </div>
                            <span className="text-[11px] text-milky/70">Share anywhere</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ========================================================================= */}
                {/* AUTHENTIC LATEX RESUME DOCUMENT SHEET (Exact Match)                      */}
                {/* ========================================================================= */}
                <div
                    id="resume-document"
                    className="w-full bg-white text-black p-6 sm:p-10 md:p-14 rounded-xl shadow-xl border border-black/10 transition-all font-serif selection:bg-blue-100 selection:text-black print:p-0 print:m-0 print:border-none print:shadow-none print:rounded-none"
                    style={{
                        fontFamily: "'Times New Roman', Times, 'Computer Modern', Georgia, serif",
                        lineHeight: 1.28,
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold tracking-tight text-black mb-1">
                            Suhel Ansari
                        </h1>
                        <div className="text-[13px] sm:text-[14px] text-black/85 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                            <a href="tel:6204450258" className="hover:underline text-black">6204450258</a>
                            <span className="text-black/40">|</span>
                            <a href={`mailto:${siteConfig.email}`} className="text-[#0b57d0] underline hover:text-[#083c91]">
                                {siteConfig.email}
                            </a>
                            <span className="text-black/40">|</span>
                            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline hover:text-[#083c91]">
                                LinkedIn
                            </a>
                            <span className="text-black/40">|</span>
                            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline hover:text-[#083c91]">
                                GitHub
                            </a>
                            <span className="text-black/40">|</span>
                            <a href="https://suhel-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline hover:text-[#083c91]">
                                Portfolio
                            </a>
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div className="mb-4">
                        <h2 className="text-[13px] sm:text-[14px] font-bold tracking-wider uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                            EDUCATION
                        </h2>
                        <div className="space-y-0.5">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[13.5px] sm:text-[14px]">
                                <span className="font-bold text-black">ICFAI University, Jharkhand</span>
                                <span className="text-[13px] sm:text-[13.5px] text-black">Ranchi, Jharkhand</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[13px] sm:text-[13.5px]">
                                <span className="italic text-black/90">Bachelor of Computer Applications (BCA), Data Science &amp; Artificial Intelligence</span>
                                <span className="text-black/85">Aug. 2024 – May 2027 (Expected)</span>
                            </div>
                            <div className="text-[13px] italic text-black/85">
                                Cumulative CGPA: 8.5+
                            </div>
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="mb-4">
                        <h2 className="text-[13px] sm:text-[14px] font-bold tracking-wider uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                            EXPERIENCE
                        </h2>
                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[13.5px] sm:text-[14px]">
                                <span className="font-bold text-black">Cloud Computing Intern</span>
                                <span className="text-[13px] sm:text-[13.5px] text-black">June 2026 – July 2026</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[13px] sm:text-[13.5px]">
                                <span className="italic text-black/90">BIT Mesra ISVE (Indian Society for VLSI Education)</span>
                                <span className="text-black/85">Jharkhand, India</span>
                            </div>
                            <ul className="list-disc ml-5 space-y-1 mt-1 text-[13px] sm:text-[13.5px] text-black/90 leading-snug">
                                <li>
                                    Engineered <strong>QuizForge AI</strong> (
                                    <a href="https://suhel-ai-quiz.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline">Live</a>
                                    {" | "}
                                    <a href="https://github.com/AmirCodes-786/suhel-ai-quiz" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline">GitHub</a>
                                    ), a distributed SaaS assessment platform, leveraging Vercel, Render, and MongoDB Atlas to apply scalable cloud computing architectures
                                </li>
                                <li>
                                    Architected a fault-tolerant AI generation engine integrating Google Gemini with Groq as a fallback, automating dynamic quiz creation from documents, YouTube URLs, and web links
                                </li>
                                <li>
                                    Developed real-time multiplayer learning arenas and a 3D Flashcard Studio using Socket.io, ensuring low-latency data synchronization for active users
                                </li>
                                <li>
                                    Implemented secure user authentication alongside an automated performance tracking system that delivers personalized AI study plans and mastery analytics
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* PROJECTS */}
                    <div className="mb-4">
                        <h2 className="text-[13px] sm:text-[14px] font-bold tracking-wider uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                            PROJECTS
                        </h2>

                        {/* Project 1: VibeHub */}
                        <div className="mb-3">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[13.5px] sm:text-[14px]">
                                <div>
                                    <span className="font-bold text-black">VibeHub</span> (
                                    <a href="https://vibehub-app.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline">Live</a>
                                    {" | "}
                                    <a href="https://github.com/AmirCodes-786" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline">GitHub</a>
                                    ) | <span className="italic text-[13px] font-normal">React 19, Vite, Node.js, Express.js, MongoDB, Socket.io, JWT, Framer Motion</span>
                                </div>
                                <span className="text-[13px] sm:text-[13.5px] text-black">2026</span>
                            </div>
                            <ul className="list-disc ml-5 space-y-1 mt-1 text-[13px] sm:text-[13.5px] text-black/90 leading-snug">
                                <li>
                                    Shipped a production-ready social networking application featuring threaded comments, 24-hour stories, and real-time direct messaging
                                </li>
                                <li>
                                    Fortified backend architecture using JWT, bcryptjs, CORS protection, and rate limiting to ensure maximum data security
                                </li>
                                <li>
                                    Validated system integrity and API reliability by implementing automated backend testing suites using Jest and Supertest
                                </li>
                            </ul>
                        </div>

                        {/* Project 2: AI Resume Builder */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[13.5px] sm:text-[14px]">
                                <div>
                                    <span className="font-bold text-black">AI Resume Builder</span> (
                                    <a href="https://suhel-resume-builder.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline">Live</a>
                                    {" | "}
                                    <a href="https://github.com/AmirCodes-786" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] underline">GitHub</a>
                                    ) | <span className="italic text-[13px] font-normal">MERN, React, Node.js, Express.js, MongoDB, AI, PDF Export</span>
                                </div>
                                <span className="text-[13px] sm:text-[13.5px] text-black">2026</span>
                            </div>
                            <ul className="list-disc ml-5 space-y-1 mt-1 text-[13px] sm:text-[13.5px] text-black/90 leading-snug">
                                <li>
                                    Developed a comprehensive MERN web application featuring a real-time visual editor and an AI-powered writing assistant
                                </li>
                                <li>
                                    Integrated high-fidelity PDF rendering and export capabilities to instantly generate professional, shareable documents
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* TECHNICAL SKILLS */}
                    <div>
                        <h2 className="text-[13px] sm:text-[14px] font-bold tracking-wider uppercase border-b-[1.5px] border-black pb-0.5 mb-2">
                            TECHNICAL SKILLS
                        </h2>
                        <div className="space-y-1 text-[13px] sm:text-[13.5px] leading-snug text-black/90">
                            <div>
                                <strong className="text-black">Languages:</strong> JavaScript, Java, SQL, HTML, CSS
                            </div>
                            <div>
                                <strong className="text-black">Frameworks:</strong> React, Node.js, Express.js, Vite, Tailwind CSS, Framer Motion, GSAP, Socket.io
                            </div>
                            <div>
                                <strong className="text-black">Developer Tools:</strong> Git, GitHub, VS Code, Vercel, Render, MongoDB Atlas
                            </div>
                            <div>
                                <strong className="text-black">Libraries:</strong> Mongoose, Axios, Recharts, React Router DOM, Lucide React, Three.js, PDF.js
                            </div>
                            <div>
                                <strong className="text-black">AI / APIs:</strong> Google Gemini, Groq, Puter.js, OpenRouter, Pixazo AI, Pollinations.ai, Wandbox API
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Stylesheet */}
                <style>{`
                    @media print {
                        body {
                            background: white !important;
                            color: black !important;
                        }
                        .no-print, nav, header, footer, #theme-toggle, [role="navigation"] {
                            display: none !important;
                        }
                        #resume-document {
                            box-shadow: none !important;
                            border: none !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            width: 100% !important;
                            max-width: 100% !important;
                        }
                        @page {
                            size: letter;
                            margin: 0.45in 0.55in;
                        }
                    }
                `}</style>
            </div>
        </PageTransition>
    );
}
