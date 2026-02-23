import { motion } from "framer-motion";

const pageVariants = {
    initial: {
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        filter: "blur(6px)",
        scale: 0.98,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="page-section will-change-transform will-change-[filter] transform-gpu"
        >
            {children}
        </motion.div>
    );
}
