'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

/**
 * AnimatedCounter Component
 * 
 * Counts up from 0 to target number when scrolled into view.
 */
export function AnimatedCounter({
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    className = ''
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true;

            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);

                // Easing function for smooth deceleration
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (end - startValue) * easeOut);

                setCount(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
