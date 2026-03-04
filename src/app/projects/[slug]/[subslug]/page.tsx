"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { notFound } from "next/navigation";
import { projectDatabase } from "../../../../lib/projectData";

export default function SubProjectDynamicPage({ params }: { params: { slug: string; subslug: string } }) {
    // 1. First, validate the main Category exists (e.g., "packaging-designs")
    const categoryData = projectDatabase[params.slug];
    if (!categoryData) notFound();

    // 2. Second, validate the specific Sub-Project exists (e.g., "project-1")
    const subProjectData = categoryData.subProjects.find(p => p.id === params.subslug);
    if (!subProjectData) notFound();

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
                <Link href={`/projects/${params.slug}`} className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest pointer-events-auto transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to {categoryData.title}
                </Link>
            </header>

            {/* Sub-Project Header */}
            <section className="relative min-h-[70vh] flex flex-col justify-end px-6 md:px-10 pb-24 pt-32 overflow-hidden max-w-7xl mx-auto w-full">
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
                        {categoryData.category} / {subProjectData.title}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-8"
                    >
                        {subProjectData.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed font-light"
                    >
                        {subProjectData.description}
                    </motion.p>
                </motion.div>
            </section>

            {/* Asymmetrical Gallery Grid for Specific Project */}
            <section className="relative z-10 px-4 md:px-10 pb-48">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {subProjectData.images.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative rounded-xl md:rounded-3xl overflow-hidden bg-white/5 ${img.span || 'col-span-1'} ${img.span === 'col-span-2' ? 'aspect-[16/9]' : 'aspect-square'}`}
                            >
                                <Image
                                    src={img.url}
                                    alt={`${subProjectData.title} showcase image ${index + 1}`}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    sizes={img.span === 'col-span-2' ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                                    priority={index === 0}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
