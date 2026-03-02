"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 120; // 0 to 119

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        // Preload all frames
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            // Format number to 3 digits e.g. 000, 001, ..., 119
            const formattedNumber = i.toString().padStart(3, "0");
            img.src = `/frames/frame_${formattedNumber}_delay-0.07s.gif`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImagesLoaded(true);
                }
            };
            // In case of error (e.g. missing frame), continue loading to avoid blocking
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const drawFrame = (index: number) => {
        if (!canvasRef.current || !images.length) return;
        const ctx = canvasRef.current.getContext("2d", { alpha: false });
        if (!ctx) return;

        const img = images[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const canvas = canvasRef.current;
        const { width: canvasWidth, height: canvasHeight } = canvas;
        const { naturalWidth: imgWidth, naturalHeight: imgHeight } = img;

        // object-fit: cover logic
        const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const x = (canvasWidth / 2) - (imgWidth / 2) * scale;
        const y = (canvasHeight / 2) - (imgHeight / 2) * scale;

        ctx.fillStyle = "#121212";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!imagesLoaded) return;
        drawFrame(Math.floor(latest));
    });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
            if (imagesLoaded) {
                drawFrame(Math.floor(frameIndex.get()));
            }
        };

        handleResize(); // Initial setup
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                />
                {/* Render overlay elements on top of the canvas */}
                <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
