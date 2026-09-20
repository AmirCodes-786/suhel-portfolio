import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfigFast = { damping: 28, stiffness: 500, mass: 0.2 };
    const springConfigSmooth = { damping: 24, stiffness: 280, mass: 0.5 };

    const dotX = useSpring(mouseX, springConfigFast);
    const dotY = useSpring(mouseY, springConfigFast);

    const ringX = useSpring(mouseX, springConfigSmooth);
    const ringY = useSpring(mouseY, springConfigSmooth);

    useEffect(() => {
        // Don't show custom cursor on touch devices
        if ("ontouchstart" in window) return;

        const onMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const checkInteractive = (el) => {
            if (!el) return false;
            if (el.tagName === "A" || el.tagName === "BUTTON") return true;
            if (el.closest("a") || el.closest("button") || el.closest('[role="button"]')) return true;
            if (el.dataset && el.dataset.hover === "true") return true;
            try {
                const style = window.getComputedStyle(el);
                if (style && style.cursor === "pointer") return true;
            } catch (_) {}
            return false;
        };

        const handleMouseOver = (e) => {
            if (checkInteractive(e.target)) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (checkInteractive(e.target)) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        document.addEventListener("mouseout", handleMouseOut, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isVisible, mouseX, mouseY]);

    if ("ontouchstart" in window) return null;

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9990] mix-blend-difference will-change-transform"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            />
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/60 pointer-events-none z-[9990] mix-blend-difference will-change-transform"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.6 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
}
