import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";
import { achievementsData } from "../data/content";

function AnimatedCounter({ target, suffix = "" }) {
    const counterRef = useRef(null);

    useEffect(() => {
        const el = counterRef.current;
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            delay: 0.5,
            ease: "power3.out",
            onUpdate: () => {
                el.textContent = Math.round(obj.val) + suffix;
            },
        });
    }, [target, suffix]);

    return (
        <span ref={counterRef} className="tabular-nums">
            0{suffix}
        </span>
    );
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Achievements() {
    return (
        <PageTransition>
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-12 overflow-y-auto">
                {/* Section label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-[0.3em] uppercase text-dark/30 font-medium mb-6"
                >
                    Achievements
                </motion.span>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight mb-16"
                >
                    Milestones
                </motion.h1>

                {/* Counter Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 transform-gpu"
                >
                    {achievementsData.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="flex flex-col will-change-transform transform-gpu"
                        >
                            <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-dark tracking-tighter leading-none">
                                <AnimatedCounter target={item.number} suffix={item.suffix} />
                            </span>
                            <span className="text-sm md:text-base text-dark/35 mt-3 tracking-wide">
                                {item.label}
                            </span>
                            <div className="w-12 h-[1px] bg-dark/8 mt-4" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
