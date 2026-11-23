import { useState, useRef } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { siteConfig } from "../data/content";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        const mailto = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
        window.open(mailto);
    };

    const socialLinks = [
        {
            name: "Email",
            href: `mailto:${siteConfig.email}`,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: siteConfig.linkedin,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "GitHub",
            href: siteConfig.github,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
            ),
        },
    ];

    return (
        <PageTransition>
            <div className="w-full max-w-3xl mx-auto px-6 md:px-12 flex flex-col h-full pt-28 pb-12 overflow-y-auto">
                {/* Section label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xs tracking-[0.3em] uppercase text-dark/60 font-medium mb-6"
                >
                    Contact
                </motion.span>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight leading-[1.1] mb-12"
                >
                    Let&apos;s Build Something
                    <br />
                    Intelligent Together.
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        onSubmit={handleSubmit}
                        className="space-y-6 will-change-transform transform-gpu"
                    >
                        {[
                            { name: "name", label: "Name", type: "text" },
                            { name: "email", label: "Email", type: "email" },
                        ].map((field) => (
                            <div key={field.name} className="relative">
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField(field.name)}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={field.label}
                                    className="w-full bg-transparent border-b border-dark/10 pb-3 pt-2 text-dark text-sm outline-none placeholder:text-dark/85 transition-colors focus:border-dark/40"
                                    required
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[1px] bg-dark"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ transformOrigin: "left" }}
                                />
                            </div>
                        ))}

                        <div className="relative">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("message")}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Message"
                                rows={4}
                                className="w-full bg-transparent border-b border-dark/10 pb-3 pt-2 text-dark text-sm outline-none placeholder:text-dark/85 transition-colors focus:border-dark/40 resize-none"
                                required
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 h-[1px] bg-dark"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformOrigin: "left" }}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3.5 bg-dark text-milky rounded-full text-sm font-medium hover:bg-dark/85 transition-colors will-change-transform transform-gpu"
                        >
                            Send Message
                        </motion.button>
                    </motion.form>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="flex flex-col justify-center gap-4 will-change-transform transform-gpu"
                    >
                        <span className="text-xs tracking-[0.2em] uppercase text-dark/60 font-medium mb-2">
                            Connect
                        </span>
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 py-3 text-dark/80 hover:text-dark transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full border border-dark/8 flex items-center justify-center group-hover:bg-dark group-hover:text-milky group-hover:border-dark transition-all duration-300">
                                    {link.icon}
                                </div>
                                <span className="text-sm font-medium">{link.name}</span>
                                <svg
                                    className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
