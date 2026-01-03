"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { pageVariants, transitions, staggerContainer, staggerChild, luxuryEasing } from "@/lib/animations";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitions.pageEntry}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeIn({
    children,
    delay = 0,
    className
}: {
    children: ReactNode;
    delay?: number;
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay, ease: luxuryEasing.power4 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SlideUp({
    children,
    delay = 0,
    className
}: {
    children: ReactNode;
    delay?: number;
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay,
                ease: luxuryEasing.power4
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.12
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.2
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className
}: {
    children: ReactNode;
    className?: string
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: luxuryEasing.power4 }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
