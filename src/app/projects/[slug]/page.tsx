"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { notFound } from "next/navigation";
import { projectDatabase } from "../../../lib/projectData";

export default function CategoryDynamicPage({ params }: { params: { slug: string } }) {
    const data = projectDatabase[params.slug];

    // Trigger Next.js 404 page if a random slug is entered
    if (!data) {
        notFound();
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] selection:bg-white selection:text-black">
            {/* Minimalist Nav */}
            <header className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference pointer-events-none">
                <Link href="/" className="text-xl font-bold text-white tracking-widest pointer-events-auto hover:opacity-70 transition-opacity">
                    DS.
                </Link>
                <Link href="/projects" className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest pointer-events-auto transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    All Categories
                </Link>
            </header>

            {/* Category Header */}
            <section className="relative min-h-[60vh] flex flex-col justify-end px-6 md:px-10 pb-24 pt-32 overflow-hidden max-w-7xl mx-auto w-full">
                <motion.div
                    style={{ y: yTitle, opacity: opacityTitle }}
                    className="relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 text-xs font-semibold tracking-widest uppercase mb-6"
                    >
                        {data.category}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-8"
                    >
                        {data.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed font-light"
                    >
                        {data.description}
                    </motion.p>
                </motion.div>
            </section>

            {/* Sub-Projects Thumbnail Grid */}
            <section className="relative z-20 px-4 md:px-10 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-6 md:space-y-0">
                        {data.subProjects.map((project, index) => (
                            <Link key={project.id} href={`/projects/${params.slug}/${project.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative group cursor-pointer block h-full min-h-[400px]"
                                >
                                    <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 w-full h-full aspect-[4/3]">
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />

                                        {/* Overlay Hover Effect */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 md:p-8">
                                            <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
                                                View Project
                                            </p>
                                            <h3 className="text-white text-3xl font-bold tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:hidden">
                                        <h3 className="text-white text-xl font-bold tracking-tight">{project.title}</h3>
                                        <p className="text-white/60 text-sm mt-2 font-light">{project.description}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
