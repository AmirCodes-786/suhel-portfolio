import { motion } from "framer-motion";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 6,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -4,
        transition: {
            duration: 0.14,
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
            className="page-section will-change-transform transform-gpu"
        >
            {children}
        </motion.div>
    );
}
