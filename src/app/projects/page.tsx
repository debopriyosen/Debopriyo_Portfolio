"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ProjectsGalleryPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Extended list of projects for the gallery
    const allProjects = [
        { title: "Packaging Designs", category: "Branding / Design", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800", slug: "packaging-designs" },
        { title: "Fintech Dashboard", category: "Next.js / Tailwind", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", slug: "fintech-dashboard" },
        { title: "Eco Packaging", category: "Sustainable Design", image: "/images/projects/packaging/project1/1.jpg", slug: "packaging-designs" },
        { title: "Award Winning Portfolio", category: "Framer Motion", image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80&w=800", slug: "award-winning-portfolio" },
        { title: "Interactive Campaign", category: "Three.js", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", slug: "interactive-campaign" },
        { title: "Minimalist Brand", category: "Identity", image: "https://images.unsplash.com/photo-1605204481358-fc29906666eb?auto=format&fit=crop&q=80&w=800", slug: "packaging-designs" },
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-[#0a0a0a] selection:bg-white selection:text-black">
            {/* Header / Nav Area */}
            <header className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference pointer-events-none">
                <Link href="/" className="text-xl font-bold text-white tracking-widest pointer-events-auto hover:opacity-70 transition-opacity">
                    DS.
                </Link>
                <Link href="/" className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest pointer-events-auto transition-colors">
                    Back to Home
                </Link>
            </header>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: yTitle, opacity: opacityTitle }}
                    className="relative z-10 text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter"
                    >
                        Archive.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 text-lg md:text-xl text-white/50 font-light"
                    >
                        A curated selection of works and experiments.
                    </motion.p>
                </motion.div>

                {/* Background ambient noise/gradient can go here */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
            </section>

            {/* Masonry Grid Section */}
            <section className="relative z-20 px-4 md:px-10 pb-32">
                <div className="max-w-7xl mx-auto">
                    {/* CSS Columns approach for masonry layout */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {allProjects.map((project, index) => (
                            <Link key={index} href={`/projects/${project.slug}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="break-inside-avoid relative group cursor-pointer block"
                                >
                                    <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[3/4] md:aspect-auto md:h-96">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* Overlay Hover Effect */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 md:p-8">
                                            <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
                                                {project.category}
                                            </p>
                                            <h3 className="text-white text-2xl font-bold tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
                                                {project.title}
                                            </h3>
                                        </div>
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
