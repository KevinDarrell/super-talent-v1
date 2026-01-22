'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Particle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    opacity: number;
}

/**
 * FloatingParticles Component
 * 
 * Optimized floating particles with reduced count on mobile.
 */
export function FloatingParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Reduced particles: 10 on mobile, 20 on desktop (was 25)
        const count = window.innerWidth < 768 ? 10 : 20;

        const generated = Array.from({ length: count }, (_, i) => ({
            id: i,
            size: Math.random() * 8 + 6, // 6-14px (restored visibility)
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 8 + 10,
            delay: Math.random() * 2,
            opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5 (restored)
        }));
        setParticles(generated);
    }, []);

    if (particles.length === 0) {
        return null;
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-[#2F6BFF]"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: particle.opacity,
                        willChange: 'transform',
                    }}
                    animate={{
                        y: [-15, 15, -15],
                        x: [-8, 8, -8],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}
