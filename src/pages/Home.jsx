import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";
import { siteConfig } from "../data/content";

// Detect low-end devices that shouldn't play video to optimize performance
function shouldShowVideo() {
    // Check device memory (< 4GB = low-end)
    if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
    // Check CPU cores (< 4 = low-end)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
    // Check connection speed
    const conn = navigator.connection;
    if (conn) {
        if (conn.saveData) return false;
        if (conn.effectiveType === "2g" || conn.effectiveType === "slow-2g") return false;
    }
    return true;
}

export default function Home() {
    const videoRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Lazy load video after initial render
    useEffect(() => {
        if (!shouldShowVideo()) return;

        // Delay video load to prioritize first paint
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <PageTransition>
            {/* Background: Poster image + video */}
            <div className="absolute inset-0 z-0">


                {/* Video */}
                {showVideo && (
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        onCanPlayThrough={() => setVideoLoaded(true)}
                        className={`absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000 ${videoLoaded ? "opacity-70" : "opacity-0"}`}
                    >
                        <source src="/hero-video.webm" type="video/webm" />
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 hero-overlay" />
                {/* Slight blur overlay */}
                <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 h-full pt-24 pb-12">
                {/* Left: Text Content */}
                <div className="flex-1 flex flex-col justify-center max-w-2xl">
                    {/* Small tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-6"
                    >
                        <span className="text-xs tracking-[0.3em] uppercase text-white/80 font-medium">
                            Hi, I’m Suhel Ansari —
                        </span>
                    </motion.div>

                    {/* Heading with word reveal */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-8 overflow-hidden">
                        {["Building", "Intelligent", "Digital", "Systems."].map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5 + i * 0.1,
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="inline-block mr-[0.2em]"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Subtext */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.7 }}
                        className="mb-10"
                    >
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
                            {siteConfig.roles.map((role, i) => (
                                <span key={i} className="flex items-center gap-3">
                                    {i > 0 && (
                                        <span className="w-1 h-1 rounded-full bg-white/30" />
                                    )}
                                    {role}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.7 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            to="/projects"
                            className="group px-7 py-3.5 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-2"
                        >
                            View Projects
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            to="/contact"
                            className="px-7 py-3.5 border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
                        >
                            Contact Me
                        </Link>
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                to="/resume"
                                className="relative px-7 py-3.5 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20 overflow-hidden inline-flex items-center gap-2 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm group"
                            >
                                {/* Shimmer sweep effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <svg
                                    className="w-4 h-4 relative z-10 group-hover:translate-y-[1px] transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="relative z-10">View Resume</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right: Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden md:flex flex-1 items-center justify-center will-change-transform"
                >
                    <div className="relative w-72 h-72 lg:w-96 lg:h-96 transform-gpu">
                        {/* Soft glow behind image */}
                        <div className="absolute inset-0 rounded-full bg-white/[0.04] blur-3xl scale-110 will-change-transform" style={{ transform: "translateZ(0)" }} />

                        {/* Rotating outer ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-white/10 will-change-transform"
                            style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                        />
                        {/* Counter-rotating inner ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                            className="absolute inset-4 rounded-full border border-white/[0.07] will-change-transform"
                            style={{ transformOrigin: "center center", transformStyle: "preserve-3d" }}
                        />

                        {/* Profile Image */}
                        <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/40 will-change-transform transform-gpu">
                            <img
                                src="/Heropic.jpeg"
                                alt="Suhel"
                                className="w-full h-full object-cover object-top scale-110"
                                loading="eager"
                            />
                            {/* Subtle overlay to blend with dark theme */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
                        </div>

                        {/* Floating dots on rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="absolute inset-0 will-change-transform pointer-events-none"
                            style={{ transformOrigin: "center center" }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                            className="absolute inset-4 will-change-transform pointer-events-none"
                            style={{ transformOrigin: "center center" }}
                        >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
