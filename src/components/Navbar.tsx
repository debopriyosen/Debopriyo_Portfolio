"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference"
        >
            <Link href="/" className="text-white font-bold text-xl tracking-tighter">
                DS.
            </Link>

            <div className="flex gap-8 md:gap-12">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
                >
                    Home
                </button>
                <button
                    onClick={() => {
                        const projectsSection = document.getElementById("projects-section");
                        if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
                >
                    Works
                </button>
                <button
                    onClick={() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }}
                    className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
                >
                    Contact
                </button>
            </div>
        </motion.nav>
    );
}
