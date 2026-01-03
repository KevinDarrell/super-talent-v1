"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps {
    children: string;
    className?: string;
    gradient?: boolean;
    delay?: number;
}

export function KineticText({
    children,
    className,
    gradient = true,
    delay = 0,
}: KineticTextProps) {
    const letters = children.split("");

    return (
        <motion.span
            className={cn(
                gradient && "bg-gradient-to-r from-white via-[hsl(38,92%,70%)] to-white bg-[length:200%] bg-clip-text text-transparent",
                className
            )}
            initial={gradient ? { backgroundPosition: "200% center" } : undefined}
            animate={gradient ? { backgroundPosition: "0% center" } : undefined}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: delay + i * 0.03,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                    style={{
                        display: letter === " " ? "inline" : "inline-block",
                        whiteSpace: letter === " " ? "pre" : "normal"
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
