"use client";

import { ArrowRight } from "lucide-react";
import { OdometerCounter } from "@/components/design-system/OdometerCounter";
import { TiltCard } from "@/components/design-system/TiltCard";
import { motion } from "framer-motion";
import { luxuryEasing } from "@/lib/animations";

export function getScoreTextColor(score: number) {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-[hsl(38,92%,65%)]";
    return "text-red-400";
}

export function getScoreBgColor(score: number) {
    if (score >= 80) return "text-emerald-400 bg-emerald-400/10";
    if (score >= 60) return "text-[hsl(38,92%,65%)] bg-[hsla(38,92%,50%,0.1)]";
    return "text-red-400 bg-red-400/10";
}

interface ScoreCardProps {
    label: string;
    score: number;
    detail: string;
    onClick: () => void;
}

export function ScoreCard({ label, score, detail, onClick }: ScoreCardProps) {
    const textColor = getScoreTextColor(score);

    return (
        <TiltCard
            className="h-full"
            tiltStrength={25}
            glareEnabled={true}
        >
            <motion.div
                onClick={onClick}
                whileHover={{
                    y: -4,
                    transition: { duration: 0.5, ease: luxuryEasing.power4 }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-panel p-[clamp(1.25rem,3vw,1.75rem)] rounded-[clamp(1.25rem,3vw,2rem)] cursor-pointer h-full
                           flex flex-col justify-between relative overflow-hidden
                           border-b-2 border-b-transparent hover:border-b-[hsla(38,92%,50%,0.4)]
                           transition-[border-color] duration-500"
            >

                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsla(38,92%,50%,0.05)] to-transparent" />
                </div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="text-[hsl(215,20%,50%)] text-xs font-bold uppercase tracking-wider">
                        {label}
                    </div>
                    <motion.div
                        className="w-8 h-8 rounded-full bg-[hsl(222,47%,8%)] border border-white/5 flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: "hsla(38,92%,50%,0.1)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowRight size={14} className="text-[hsl(215,20%,45%)] -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </motion.div>
                </div>

                <div className="mb-2 relative z-10">
                    <span className={`text-4xl font-bold tracking-tight ${textColor}`}>
                        <OdometerCounter value={score} />
                    </span>
                    <span className="text-sm text-[hsl(215,20%,35%)] font-medium ml-1">/100</span>
                </div>

                <p className="text-xs text-[hsl(215,20%,50%)] leading-relaxed line-clamp-2 h-9 relative z-10">
                    {detail || "Click to see detailed analysis."}
                </p>
            </motion.div>
        </TiltCard>
    );
}
