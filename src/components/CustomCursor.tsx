"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    // Track mouse coordinates
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration for buttery smooth lag
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only show cursor on devices with a fine pointer (desktop)
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseOut);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseOut);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white pointer-events-none mix-blend-difference z-[9999]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        />
    );
}
