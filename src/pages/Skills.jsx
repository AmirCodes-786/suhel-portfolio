import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { skillsData } from "../data/content";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Skills() {
    const categories = Object.entries(skillsData);

    return (
        <PageTransition>
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-12 overflow-y-auto">
                {/* Section label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-[0.3em] uppercase text-dark/60 font-medium mb-6"
                >
                    Skills
                </motion.span>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight mb-12"
                >
                    Tech Arsenal
                </motion.h1>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {categories.map(([category, skills]) => (
                        <motion.div key={category} variants={categoryVariants}>
                            <h3 className="text-xs tracking-[0.2em] uppercase text-dark/65 font-medium mb-4">
                                {category}
                            </h3>
                            <motion.div
                                variants={containerVariants}
                                className="flex flex-wrap gap-3 will-change-transform transform-gpu"
                            >
                                {skills.map((skill) => (
                                    <motion.div
                                        key={skill}
                                        variants={cardVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 8px 30px rgba(34,197,94,0.15)",
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                            boxShadow: "0 4px 15px rgba(34,197,94,0.15)",
                                        }}
                                        tabIndex={0}
                                        className="group px-5 py-3 border border-dark/10 rounded-xl bg-milky cursor-default md:cursor-pointer transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/[0.07] active:border-green-500/40 active:bg-green-500/[0.07] focus:border-green-500/40 focus:bg-green-500/[0.07] outline-none"
                                    >
                                        <span className="text-sm font-medium text-dark group-hover:text-green-600 group-active:text-green-600 group-focus:text-green-600 transition-colors">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
