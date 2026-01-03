"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { luxuryEasing } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface OdometerCounterProps {
    value: number;
    className?: string;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export function OdometerCounter({
    value,
    className,
    duration = 2,
    suffix = "",
    prefix = "",
}: OdometerCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!ref.current || !isInView) return;

        const node = ref.current;
        const controls = animate(0, value, {
            duration,
            ease: luxuryEasing.power4,
            onUpdate(latest) {
                node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
            },
        });

        return () => controls.stop();
    }, [value, isInView, duration, suffix, prefix]);

    return (
        <span
            ref={ref}
            className={cn("tabular-nums font-mono-display", className)}
        >
            {prefix}0{suffix}
        </span>
    );
}
