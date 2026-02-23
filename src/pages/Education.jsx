import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";
import { educationData } from "../data/content";

export default function Education() {
    const timelineRef = useRef(null);
    const lineRef = useRef(null);
    const nodeRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Draw the timeline line
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 1.2,
                        delay: 0.5,
                        ease: "power3.out",
                        transformOrigin: "top",
                    }
                );
            }

            // Animate nodes in sequence
            nodeRefs.current.forEach((node, i) => {
                if (!node) return;
                gsap.fromTo(
                    node,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: 0.8 + i * 0.3,
                        ease: "power3.out",
                    }
                );
            });
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition>
            <div ref={timelineRef} className="w-full max-w-3xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-12 overflow-y-auto">
                {/* Section label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-[0.3em] uppercase text-dark/30 font-medium mb-6 text-center"
                >
                    Education
                </motion.span>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight mb-16 text-center"
                >
                    Academic Journey
                </motion.h1>

                {/* Timeline */}
                <div className="relative flex flex-col items-center">
                    {/* Vertical line */}
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-dark/10"
                        style={{ transformOrigin: "top", transform: "scaleY(0)" }}
                    />

                    {educationData.map((edu, i) => (
                        <div
                            key={edu.id}
                            ref={(el) => (nodeRefs.current[i] = el)}
                            className="relative w-full max-w-lg mb-12 last:mb-0 opacity-0 will-change-transform transform-gpu"
                        >
                            {/* Node dot */}
                            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-3 h-3 rounded-full bg-dark border-4 border-milky z-20" />

                            {/* Solid background mask to hide the vertical timeline line */}
                            <div className="absolute inset-x-0 bottom-0 top-4 bg-milky rounded-2xl z-0 shadow-sm" />

                            {/* Card */}
                            <div className="relative z-10 bg-card-bg border border-dark/5 rounded-2xl p-6 md:p-8 mt-4">
                                <span className="text-xs tracking-[0.15em] uppercase text-dark/30 font-medium">
                                    {edu.period}
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold text-dark mt-2 tracking-tight">
                                    {edu.degree}
                                </h3>
                                <p className="text-dark/60 text-sm font-medium mt-1">
                                    {edu.institution}
                                </p>
                                <p className="text-dark/40 text-sm mt-0.5 mb-4">
                                    {edu.specialization}
                                </p>

                                <div className="space-y-2">
                                    <span className="text-xs tracking-[0.15em] uppercase text-dark/30 font-medium">
                                        Key Areas
                                    </span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {edu.areas.map((area) => (
                                            <span
                                                key={area}
                                                className="px-3 py-1.5 text-xs border border-dark/8 rounded-full text-dark/60 bg-dark/[0.02]"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
