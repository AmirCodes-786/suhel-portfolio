import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "../data/content";
import OverlayMenu from "./OverlayMenu";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
    const navRefs = useRef({});
    const location = useLocation();

    // Update pill position on route change and window resize
    useEffect(() => {
        const updatePill = () => {
            const activeEl = navRefs.current[location.pathname];
            if (activeEl) {
                const { offsetLeft, offsetWidth } = activeEl;
                setPillStyle({ left: offsetLeft, width: offsetWidth });
            }
        };

        updatePill();
        window.addEventListener("resize", updatePill);
        return () => window.removeEventListener("resize", updatePill);
    }, [location.pathname]);

    // Magnetic hover effect
    const handleMouseMove = (e, el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleMouseLeave = (el) => {
        if (!el) return;
        el.style.transform = "translate(0, 0)";
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-5xl"
            >
                <nav className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-dark/[0.03]">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="text-lg font-bold tracking-tight text-dark select-none"
                    >
                        Suhel.
                    </NavLink>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-1 relative">
                        {/* Sliding pill indicator */}
                        <motion.div
                            className="absolute h-8 bg-dark rounded-full z-0"
                            animate={{ left: pillStyle.left - 8, width: pillStyle.width + 16 }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            style={{ top: "50%", translateY: "-50%" }}
                        />

                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                ref={(el) => (navRefs.current[link.path] = el)}
                                onMouseMove={(e) => handleMouseMove(e, navRefs.current[link.path])}
                                onMouseLeave={() => handleMouseLeave(navRefs.current[link.path])}
                                className={({ isActive }) =>
                                    `relative z-10 px-3 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${isActive ? "text-milky" : "text-dark/60 hover:text-dark"
                                    }`
                                }
                                style={{ transition: "transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.3s" }}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col gap-[5px] items-center justify-center w-10 h-10 relative z-[200]"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="block w-6 h-[2px] bg-dark origin-center"
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                            className="block w-6 h-[2px] bg-dark"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="block w-6 h-[2px] bg-dark origin-center"
                        />
                    </button>
                </nav>
            </motion.header>

            {/* Overlay Menu for Mobile */}
            <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
