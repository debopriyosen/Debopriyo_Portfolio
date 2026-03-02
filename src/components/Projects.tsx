"use client";

import { motion } from "framer-motion";

export default function Projects() {
    const projects = [
        { title: "E-Commerce Experience", category: "Web GL / React" },
        { title: "Fintech Dashboard", category: "Next.js / Tailwind" },
        { title: "Award Winning Portfolio", category: "Framer Motion" },
        { title: "Interactive Campaign", category: "Three.js" },
    ];

    return (
        <div id="projects-section" className="relative z-20 bg-[#121212] pt-24 pb-48 px-4 md:px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto w-full">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-16 px-4"
                >
                    Selected Works
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-0 md:px-4">
                    {projects.map((proj, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative h-[350px] md:h-[450px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-700 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] transition-opacity duration-700 z-0" />

                            <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-sm font-medium tracking-widest text-gray-400 mb-3 uppercase">{proj.category}</p>
                                <h4 className="text-3xl font-semibold text-white tracking-tight">{proj.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
