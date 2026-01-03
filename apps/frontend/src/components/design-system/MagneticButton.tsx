"use client";

import { motion } from "framer-motion";
import { useState, useRef, ReactNode, MouseEvent } from "react";
import { transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    magneticStrength?: number;
    magneticRadius?: number;
}

export function MagneticButton({
    children,
    className,
    onClick,
    disabled = false,
    magneticStrength = 0.3,
    magneticRadius = 150,
}: MagneticButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || disabled) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < magneticRadius) {
            const pull = (magneticRadius - distance) / magneticRadius;
            setPosition({
                x: distanceX * magneticStrength * pull,
                y: distanceY * magneticStrength * pull,
            });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={transitions.spring}
            className={cn(
                "relative overflow-hidden",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {children}
        </motion.button>
    );
}
