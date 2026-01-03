"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    radius?: number;
    onClick?: () => void;
    disabled?: boolean;
}

/**
 * MagneticButton - Creates a magnetic hover effect that attracts to cursor
 * @param strength - How strongly the button is attracted (0-1, default 0.3)
 * @param radius - Activation radius in pixels (default 150)
 */
export function MagneticButton({
    children,
    className = "",
    strength = 0.3,
    radius = 150,
    onClick,
    disabled = false,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled || !buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < radius) {
                const pullStrength = (1 - distance / radius) * strength;
                setPosition({
                    x: distanceX * pullStrength,
                    y: distanceY * pullStrength,
                });
            }
        },
        [disabled, radius, strength]
    );

    const handleMouseEnter = () => {
        if (!disabled) setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            className={className}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
                scale: isHovering ? 1.05 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5,
            }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
}
