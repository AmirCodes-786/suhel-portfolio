import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "../data/content";
import OverlayMenu from "./OverlayMenu";
import PremiumThemeToggle from "./ThemeToggle";
import SALogo from "./SALogo";

// Track whether the app has completed its initial intro animation
let hasCompletedInitialLoad = false;

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.theme === "dark";
        }
        return false;
    });
    const location = useLocation();

    // After initial mount, ensure any re-mount has zero animation delay
    const headerDelay = hasCompletedInitialLoad ? 0 : 2.2;
    useEffect(() => {
        hasCompletedInitialLoad = true;
    }, []);

    // Handle theme switching and saving to localStorage
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <>
            <motion.header
                initial={{ y: hasCompletedInitialLoad ? 0 : -100, opacity: hasCompletedInitialLoad ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: headerDelay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-5xl"
            >
                <nav className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-dark/[0.03] will-change-transform transform-gpu">
                    {/* Logo / Brand Mark */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-2.5 text-dark select-none group focus:outline-none"
                        aria-label="Suhel Ansari Home"
                    >
                        <SALogo size={32} priority={true} />
                        <span className="text-base sm:text-lg font-bold tracking-tight text-dark dark:text-milky transition-colors group-hover:text-dark/80 dark:group-hover:text-milky/80">
                            Suhel<span className="text-emerald-500 font-extrabold">.</span>
                        </span>
                    </NavLink>

                    <div className="flex items-center gap-6">
                        {/* Desktop Links with rock-solid shared layout pill */}
                        <div className="hidden lg:flex items-center gap-1 relative">
                            {navLinks.map((link) => {
                                const isLinkActive =
                                    link.path === "/"
                                        ? location.pathname === "/"
                                        : location.pathname === link.path || location.pathname.startsWith(link.path + "/");

                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        end={link.path === "/"}
                                        className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full select-none outline-none ${
                                            isLinkActive ? "text-milky" : "text-dark/80 hover:text-dark hover:bg-dark/[0.04]"
                                        }`}
                                    >
                                        {isLinkActive && (
                                            <motion.span
                                                layoutId="navbar-active-pill"
                                                className="absolute inset-0 bg-dark rounded-full -z-0"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">
                                            {link.name}
                                        </span>
                                    </NavLink>
                                );
                            })}
                        </div>

                        {/* Theme Toggle */}
                        <div className="flex items-center">
                            <PremiumThemeToggle isOn={isDarkMode} onToggle={setIsDarkMode} />
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
                    </div>
                </nav>
            </motion.header>

            {/* Overlay Menu for Mobile */}
            <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
