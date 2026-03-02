"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Section 1: Center (0% -> 15%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

    // Section 2: Left aligned (25% -> 45%)
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.45], [100, -100]);

    // Section 3: Right aligned (55% -> 75%)
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.75], [100, -100]);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8 z-10">

            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center px-4"
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wide text-white drop-shadow-2xl">
                    Debopriyo Sen
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-gray-300 font-medium tracking-widest drop-shadow-lg uppercase">
                    Product & Experience Designer.
                </p>
            </motion.div>

            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-2xl max-w-[90vw] md:max-w-2xl leading-snug">
                    I build digital <br /><span className="text-gray-400">experiences.</span>
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute top-1/2 right-[5%] md:right-[10%] -translate-y-1/2 text-right"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-2xl max-w-[90vw] md:max-w-2xl leading-snug ml-auto">
                    Bridging design <br /><span className="text-gray-400">and engineering.</span>
                </h2>
            </motion.div>

        </div>
    );
}
