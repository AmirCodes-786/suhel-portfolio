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
            <div className="resume-page-wrapper w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col h-full pt-20 sm:pt-24 pb-20 overflow-y-auto scrollbar-thin print:p-0 print:m-0 print:h-auto print:overflow-visible print:max-w-none">
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
                    className="w-full max-w-[8.5in] mx-auto bg-white text-black p-6 sm:p-10 md:p-12 rounded-xl shadow-xl border border-black/10 font-serif selection:bg-blue-100 selection:text-black"
                >
                    {/* HEADER */}
                    <h1 className="resume-name">Suhel Ansari</h1>
                    <div className="resume-contact-info">
                        <a href="tel:6204450258" style={{ color: "#000", textDecoration: "none" }}>6204450258</a>
                        {" | "}
                        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                        {" | "}
                        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        {" | "}
                        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                        {" | "}
                        <a href="https://suhel-developer-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>

                    {/* EDUCATION */}
                    <h2 className="resume-section-title">Education</h2>
                    <div className="resume-entry">
                        <div className="resume-flex-row resume-entry-header">
                            <span className="bold-text">ICFAI University, Jharkhand</span>
                            <span>Ranchi, Jharkhand</span>
                        </div>
                        <div className="resume-flex-row italic-text">
                            <span style={{ paddingRight: "15px" }}>Bachelor of Computer Applications (BCA), Data Science &amp; Artificial Intelligence</span>
                            <span style={{ whiteSpace: "nowrap" }}>Aug. 2024 &ndash; May 2027 (Expected)</span>
                        </div>
                        <div className="italic-text">Cumulative CGPA: 8.5+</div>
                    </div>

                    {/* EXPERIENCE */}
                    <h2 className="resume-section-title">Experience</h2>
                    <div className="resume-entry">
                        <div className="resume-flex-row resume-entry-header">
                            <span className="bold-text">Cloud Computing Intern</span>
                            <span>June 2026 &ndash; July 2026</span>
                        </div>
                        <div className="resume-flex-row italic-text">
                            <span>BIT Mesra ISVE (Indian Society for VLSI Education)</span>
                            <span>Jharkhand, India</span>
                        </div>
                        <ul className="resume-bullets">
                            <li>
                                Engineered <strong>QuizForge AI</strong> (<a href="https://suhel-ai-quiz.vercel.app" target="_blank" rel="noopener noreferrer"><strong>Live</strong></a> | <a href="https://github.com/AmirCodes-786/suhel-ai-quiz" target="_blank" rel="noopener noreferrer"><strong>GitHub</strong></a>), a distributed SaaS assessment platform, leveraging Vercel, Render, and MongoDB Atlas to apply scalable cloud computing architectures
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

                    {/* PROJECTS */}
                    <h2 className="resume-section-title">Projects</h2>
                    
                    <div className="resume-entry">
                        <div className="resume-flex-row resume-entry-header">
                            <span className="bold-text">
                                VibeHub <span style={{ fontWeight: "normal" }}>(<a href="https://vibehub-app.vercel.app" target="_blank" rel="noopener noreferrer">Live</a> | <a href="https://github.com/AmirCodes-786/suhel-social-media" target="_blank" rel="noopener noreferrer">GitHub</a>)</span> <span style={{ fontWeight: "normal", fontStyle: "italic" }}>| React 19, Vite, Node.js, Express.js, MongoDB, Socket.io, JWT, Framer Motion</span>
                            </span>
                            <span>2026</span>
                        </div>
                        <ul className="resume-bullets">
                            <li>Shipped a production-ready social networking application featuring threaded comments, 24-hour stories, and real-time direct messaging</li>
                            <li>Fortified backend architecture using JWT, bcryptjs, CORS protection, and rate limiting to ensure maximum data security</li>
                            <li>Validated system integrity and API reliability by implementing automated backend testing suites using Jest and Supertest</li>
                        </ul>
                    </div>

                    <div className="resume-entry">
                        <div className="resume-flex-row resume-entry-header">
                            <span className="bold-text">
                                AI Resume Builder <span style={{ fontWeight: "normal" }}>(<a href="https://suhel-resume-builder.vercel.app" target="_blank" rel="noopener noreferrer">Live</a> | <a href="https://github.com/AmirCodes-786/suhel-ai-resume-builder" target="_blank" rel="noopener noreferrer">GitHub</a>)</span> <span style={{ fontWeight: "normal", fontStyle: "italic" }}>| MERN, React, Node.js, Express.js, MongoDB, AI, PDF Export</span>
                            </span>
                            <span>2026</span>
                        </div>
                        <ul className="resume-bullets">
                            <li>Developed a comprehensive MERN web application featuring a real-time visual editor and an AI-powered writing assistant</li>
                            <li>Integrated high-fidelity PDF rendering and export capabilities to instantly generate professional, shareable documents</li>
                        </ul>
                    </div>

                    {/* TECHNICAL SKILLS */}
                    <h2 className="resume-section-title">Technical Skills</h2>
                    <div className="resume-entry" style={{ marginBottom: 0 }}>
                        <div className="skills-row"><span className="bold-text">Languages:</span> JavaScript, Java, SQL, HTML, CSS</div>
                        <div className="skills-row"><span className="bold-text">Frameworks:</span> React, Node.js, Express.js, Vite, Tailwind CSS, Framer Motion, GSAP, Socket.io</div>
                        <div className="skills-row"><span className="bold-text">Developer Tools:</span> Git, GitHub, VS Code, Vercel, Render, MongoDB Atlas</div>
                        <div className="skills-row"><span className="bold-text">Libraries:</span> Mongoose, Axios, Recharts, React Router DOM, Lucide React, Three.js, PDF.js</div>
                        <div className="skills-row"><span className="bold-text">AI / APIs:</span> Google Gemini, Groq, Puter.js, OpenRouter, Pixazo AI, Pollinations.ai, Wandbox API</div>
                    </div>
                </div>

                {/* Print Stylesheet */}
                <style>{`
                    #resume-document {
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 11pt;
                        line-height: 1.35;
                        color: #000;
                    }
                    #resume-document a {
                        color: #0056b3;
                        text-decoration: underline;
                        text-underline-offset: 2px;
                    }
                    #resume-document a:hover {
                        color: #003d82;
                    }
                    #resume-document h1.resume-name {
                        font-size: 24pt;
                        text-align: center;
                        font-weight: normal;
                        margin-bottom: 4px;
                        line-height: 1.1;
                    }
                    #resume-document .resume-contact-info {
                        text-align: center;
                        font-size: 11pt;
                        margin-bottom: 12px;
                    }
                    #resume-document h2.resume-section-title {
                        font-size: 12pt;
                        text-transform: uppercase;
                        border-bottom: 1px solid #000;
                        margin-top: 18px;
                        margin-bottom: 8px;
                        font-weight: bold;
                    }
                    #resume-document .resume-flex-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                    }
                    #resume-document .bold-text {
                        font-weight: bold;
                    }
                    #resume-document .italic-text {
                        font-style: italic;
                    }
                    #resume-document .resume-entry {
                        margin-bottom: 16px;
                    }
                    #resume-document .resume-entry-header {
                        margin-bottom: 2px;
                    }
                    #resume-document ul.resume-bullets {
                        list-style-type: disc;
                        padding-left: 20px;
                        margin-top: 4px;
                        margin-bottom: 4px;
                    }
                    #resume-document ul.resume-bullets li {
                        margin-bottom: 4px;
                        line-height: 1.35;
                    }
                    #resume-document .skills-row {
                        margin-bottom: 4px;
                        line-height: 1.35;
                    }

                    @media print {
                        @page {
                            size: letter;
                            margin: 0.5in;
                        }

                        html, body {
                            height: auto !important;
                            min-height: auto !important;
                            max-height: none !important;
                            overflow: visible !important;
                            background: #fff !important;
                            color: #000 !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }

                        /* Suppress outer site wrappers that cause top empty space and height clipping on mobile! */
                        #root, main, .page-section, .resume-page-wrapper {
                            height: auto !important;
                            min-height: 0 !important;
                            max-height: none !important;
                            overflow: visible !important;
                            display: block !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                            max-width: 100% !important;
                            transform: none !important;
                            position: static !important;
                        }

                        .no-print, nav, header, footer, #theme-toggle, [role="navigation"] {
                            display: none !important;
                        }

                        #resume-document {
                            box-shadow: none !important;
                            border: none !important;
                            padding: 0 !important;
                            margin: 0 auto !important;
                            width: 100% !important;
                            max-width: 8.5in !important;
                            display: block !important;
                            background: #fff !important;
                            color: #000 !important;
                            font-family: 'Times New Roman', Times, serif !important;
                            font-size: 11pt !important;
                            line-height: 1.35 !important;
                        }

                        /* Guarantee horizontal row layout in print, NEVER flex-col on mobile */
                        #resume-document .resume-flex-row,
                        #resume-document .resume-entry-header {
                            display: flex !important;
                            flex-direction: row !important;
                            justify-content: space-between !important;
                            align-items: baseline !important;
                            flex-wrap: nowrap !important;
                        }
                    }
                `}</style>
            </div>
        </PageTransition>
    );
}
