"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function Projects() {
    const projects = [
        { title: "Packaging Designs", category: "Branding / Design", slug: "packaging-designs", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800" },
        { title: "Fintech Dashboard", category: "Next.js / Tailwind", slug: "fintech-dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
        { title: "Award Winning Portfolio", category: "Framer Motion", slug: "award-winning-portfolio", image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80&w=800" },
        { title: "Interactive Campaign", category: "Three.js", slug: "interactive-campaign", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-0 md:px-4" style={{ perspective: "1000px" }}>
                    {projects.map((proj, i) => (
                        <ProjectCard key={i} project={proj} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Ensure the props interface matches the array objects
interface ProjectData {
    title: string;
    category: string;
    slug: string;
    image: string;
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Track mouse position on the card
    const rawX = useMotionValue(0.5); // 0 to 1
    const rawY = useMotionValue(0.5); // 0 to 1

    // Smooth out the movement with a spring
    const springConfig = { damping: 20, stiffness: 200, mass: 1 };
    const x = useSpring(rawX, springConfig);
    const y = useSpring(rawY, springConfig);

    // Transform mouse percentage (0-1) into rotation angles (-5deg to +5deg)
    // Note: If mouse is at top (y=0), we want to tilt upwards (rotateX positive)
    // If mouse is at left (x=0), we want to tilt leftwards (rotateY negative)
    const rotateX = useTransform(y, [0, 1], [8, -8]);
    const rotateY = useTransform(x, [0, 1], [-8, 8]);

    // Move the subtle inner highlight based on the mouse
    const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
    const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(y, [0, 1], [0.1, 0.4]); // Glare gets brighter depending on angle

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card boundaries
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize to strictly 0 -> 1
        const pctX = Math.max(0, Math.min(1, mouseX / rect.width));
        const pctY = Math.max(0, Math.min(1, mouseY / rect.height));

        rawX.set(pctX);
        rawY.set(pctY);
    };

    const handleMouseLeave = () => {
        // Smoothly snap back to flat center on leave
        rawX.set(0.5);
        rawY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => router.push(`/projects/${project.slug}`)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-[350px] md:h-[450px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden cursor-pointer shadow-2xl"
        >
            {/* Background Image */}
            <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* The standard gradient bg to ensure text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

            {/* Dynamic Interactive Glare that follows the cursor */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle 300px at calc(${glareX}) calc(${glareY}), rgba(255,255,255,1) 0%, transparent 60%)`,
                    opacity: opacity
                }}
            />

            {/* Text Content - lifted up slightly in 3D space */}
            <div
                className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 will-change-transform"
                style={{ transform: "translateZ(40px)" }} // Pushes text outwards in 3D
            >
                <p className="text-sm font-medium tracking-widest text-gray-400 mb-3 uppercase drop-shadow-md">
                    {project.category}
                </p>
                <h4 className="text-3xl font-semibold text-white tracking-tight drop-shadow-md">
                    {project.title}
                </h4>
            </div>
        </motion.div>
    );
}
