"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#121212] pt-32 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto w-full z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
                        Let&apos;s create something
                    </h1>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-500 tracking-tight mb-12">
                        extraordinary.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md"
                >
                    <h3 className="text-3xl font-semibold text-white mb-2">Debopriyo Sen</h3>
                    <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
                        Product & Experience Designer | E-commerce Systems | UI/UX | Design Systems | AI-driven Workflows
                    </p>

                    <div className="pt-8 border-t border-white/10">
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-medium">Contact</p>
                        <a
                            href="mailto:debopriyosensupu@gmail.com"
                            className="text-lg sm:text-2xl md:text-4xl font-medium text-white hover:text-gray-300 transition-colors break-all"
                        >
                            debopriyosensupu@gmail.com
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
