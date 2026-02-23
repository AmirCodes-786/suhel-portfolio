import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";
import { aboutContent } from "../data/content";

export default function About() {
    const containerRef = useRef(null);
    const paragraphRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            paragraphRefs.current.forEach((p, i) => {
                if (!p) return;
                gsap.fromTo(
                    p,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.4 + i * 0.2,
                        ease: "power3.out",
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition>
            <div ref={containerRef} className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-12 overflow-y-auto">
                {/* Section label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-[0.3em] uppercase text-dark/30 font-medium mb-6"
                >
                    About
                </motion.span>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark tracking-tight leading-[1.1] mb-12"
                >
                    {aboutContent.title}
                </motion.h1>

                {/* Paragraphs with stagger */}
                <div className="space-y-6 max-w-2xl">
                    {aboutContent.paragraphs.flatMap((para, i) =>
                        para.split("\n\n").map((chunk, j) => (
                            <p
                                key={`${i}-${j}`}
                                ref={(el) => (paragraphRefs.current[i * 10 + j] = el)}
                                className="text-base md:text-lg text-dark/55 leading-relaxed opacity-0"
                            >
                                {chunk}
                            </p>
                        ))
                    )}
                </div>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 h-[1px] w-24 bg-dark/10 origin-left"
                />
            </div>
        </PageTransition>
    );
}
