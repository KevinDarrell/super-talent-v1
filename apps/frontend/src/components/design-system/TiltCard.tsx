"use client";

import { motion } from "framer-motion";
import { useState, ReactNode, MouseEvent } from "react";
import { transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltStrength?: number;
    glareEnabled?: boolean;
}

export function TiltCard({
    children,
    className,
    tiltStrength = 20,
    glareEnabled = true,
}: TiltCardProps) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientY - rect.top - rect.height / 2) / tiltStrength;
        const y = (e.clientX - rect.left - rect.width / 2) / -tiltStrength;

        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        setRotateX(x);
        setRotateY(y);
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={transitions.tilt}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={cn("relative", className)}
        >
            {children}


            {glareEnabled && (
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                />
            )}
        </motion.div>
    );
}
