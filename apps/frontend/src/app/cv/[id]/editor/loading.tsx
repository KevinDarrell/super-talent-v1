"use client";

import { motion } from "framer-motion";
import { Loader2, Sparkles, FileEdit, Wand2 } from "lucide-react";

/**
 * Premium loading UI for Editor route transition
 * Features: Glassmorphism, floating particles, gradient animations
 */
export default function EditorLoading() {
    return (
        <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center overflow-hidden">
            {/* Ambient background effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-champagne-500/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px]"
                />

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                        className="absolute w-2 h-2 bg-champagne-400/40 rounded-full blur-sm"
                        style={{
                            top: `${20 + (i * 12)}%`,
                            left: `${15 + (i * 13)}%`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Animated icon container */}
                <div className="relative mb-10">
                    {/* Outer pulse rings */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 w-28 h-28 border-2 border-champagne-500/30 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute inset-0 w-28 h-28 border border-champagne-500/20 rounded-full"
                    />

                    {/* Main icon */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-28 h-28 bg-gradient-to-br from-champagne-400 via-orange-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.4)]"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-2 border-2 border-white/20 rounded-2xl border-t-white/60"
                        />
                        <FileEdit size={40} className="text-white relative z-10" />
                    </motion.div>
                </div>

                {/* Text content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-serif font-bold text-white mb-3 tracking-tight">
                        Preparing Your Editor
                    </h2>
                    <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
                        Setting up your professional workspace with AI-powered suggestions
                    </p>
                </motion.div>

                {/* Progress indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex items-center gap-3"
                >
                    {["Loading assets", "Syncing data", "Almost ready"].map((step, i) => (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                        >
                            <Sparkles size={14} className="text-champagne-400" />
                            <span className="text-sm text-slate-300 font-medium">{step}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
