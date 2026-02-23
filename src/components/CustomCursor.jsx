import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const onMouseMove = useCallback((e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
    }, [isVisible]);

    useEffect(() => {
        // Don't show custom cursor on touch devices
        if ("ontouchstart" in window) return;

        window.addEventListener("mousemove", onMouseMove);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.hover === "true"
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.hover === "true"
            ) {
                setIsHovering(false);
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [onMouseMove]);

    if ("ontouchstart" in window) return null;

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9990] mix-blend-difference"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/50 pointer-events-none z-[9990] mix-blend-difference"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isHovering ? 1.8 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
            />
        </>
    );
}
