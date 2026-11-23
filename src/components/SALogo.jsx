import { motion } from "framer-motion";

export default function SALogo({
    size = 36,
    className = "",
    showWordmark = false,
    interactive = true,
    priority = false,
}) {
    const isInteractive = interactive;

    return (
        <motion.div
            className={`inline-flex items-center gap-2.5 select-none ${className}`}
            whileHover={isInteractive ? { scale: 1.04 } : undefined}
            whileTap={isInteractive ? { scale: 0.97 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* SA Monogram Emblem Container */}
            <div
                className="relative flex items-center justify-center rounded-full group"
                style={{ width: size, height: size }}
            >
                {/* Subtle Ambient Emerald Glow Behind Logo */}
                <div
                    className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[6px] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none"
                />

                {/* The Master SA Logo Badge */}
                <img
                    src="/branding/sa-logo-64.png"
                    srcSet="/branding/sa-logo-64.png 64w, /branding/sa-logo-128.png 128w, /branding/sa-logo-512.png 512w"
                    sizes={`${size}px`}
                    alt="SA - Suhel Ansari Monogram"
                    width={size}
                    height={size}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:rotate-1"
                />
            </div>

            {/* Optional Wordmark */}
            {showWordmark && (
                <div className="flex flex-col leading-none">
                    <span className="text-sm md:text-base font-bold tracking-tight text-dark dark:text-milky font-sans flex items-center gap-1">
                        Suhel Ansari
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                    <span className="text-[10px] tracking-wider uppercase text-dark/50 dark:text-milky/50 font-mono">
                        AI Engineer
                    </span>
                </div>
            )}
        </motion.div>
    );
}
