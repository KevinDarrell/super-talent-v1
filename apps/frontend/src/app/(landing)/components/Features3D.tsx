'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BarChart3, FileCheck, Wrench, Target, Zap, Sparkles, CheckCircle, ArrowRight, type LucideIcon } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    gradient: string;
}

const features: Feature[] = [
    {
        icon: BarChart3,
        title: 'Your CV Score + What It Means',
        description: 'Get a comprehensive score with clear explanations of what each metric means for your job search.',
        color: '#2F6BFF',
        gradient: 'from-[#2F6BFF] to-blue-600',
    },
    {
        icon: FileCheck,
        title: 'ATS Readiness Format',
        description: 'Ensure your CV passes through applicant tracking systems with our format checker.',
        color: '#3CE0B1',
        gradient: 'from-[#3CE0B1] to-emerald-500',
    },
    {
        icon: Wrench,
        title: 'Top 5 Fixes You Can Change Instantly',
        description: 'Get actionable improvements you can implement right away for immediate impact.',
        color: '#F59E0B',
        gradient: 'from-[#F59E0B] to-orange-500',
    },
    {
        icon: Target,
        title: 'Keyword Match to Your Dream Job',
        description: 'See how well your CV keywords align with your target job description.',
        color: '#8B5CF6',
        gradient: 'from-purple-500 to-purple-600',
    },
    {
        icon: Zap,
        title: 'Your Impact Strength',
        description: 'Measure how effectively your achievements and experience are communicated.',
        color: '#EF4444',
        gradient: 'from-[#EF4444] to-red-600',
    },
];

/**
 * Features3D Component
 * 
 * Premium features section with visual screenshot mockup.
 */
export function Features3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            id="features"
            ref={containerRef}
            className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-[#2F6BFF]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#3CE0B1]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F6BFF]/10 text-[#2F6BFF] rounded-full text-sm font-medium mb-4">
                        <Sparkles size={14} />
                        What You Get
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                        We provide <span className="text-gradient-primary">everything</span> you need.
                    </h2>
                    <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                        Everything to transform your CV from average to exceptional.
                    </p>
                </motion.div>

                {/* Main Content: Features + Visual */}
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: Features List */}
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group relative"
                            >
                                <motion.div
                                    className="relative bg-white rounded-2xl p-5 border border-slate-100 transition-all duration-300 group-hover:border-transparent group-hover:shadow-xl flex items-start gap-4"
                                    whileHover={{ x: 8 }}
                                    style={{
                                        borderLeftWidth: '4px',
                                        borderLeftColor: hoveredIndex === index ? feature.color : '#e2e8f0',
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                                        style={{ boxShadow: `0 8px 20px -8px ${feature.color}50` }}
                                    >
                                        <feature.icon size={22} className="text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#2F6BFF] transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Check icon */}
                                    <CheckCircle
                                        size={20}
                                        className="text-[#3CE0B1] flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Visual Screenshot Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#2F6BFF]/20 via-[#3CE0B1]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl" />

                        {/* Screenshot mockup */}
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="bg-white rounded-md px-3 py-1 text-xs text-slate-500 text-center max-w-xs mx-auto">
                                        supercv.ai/results
                                    </div>
                                </div>
                            </div>

                            {/* Results UI */}
                            <div className="p-6 bg-gradient-to-br from-slate-50 to-white">
                                {/* Score section */}
                                <div className="flex items-center gap-6 mb-6 p-4 bg-white rounded-xl border border-slate-100">
                                    <div className="relative w-24 h-24">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                                            <motion.circle
                                                cx="48" cy="48" r="40"
                                                stroke="url(#gradientScore)"
                                                strokeWidth="8"
                                                fill="none"
                                                strokeLinecap="round"
                                                initial={{ strokeDasharray: "0 251" }}
                                                animate={isInView ? { strokeDasharray: "196 251" } : {}}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                            />
                                            <defs>
                                                <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#2F6BFF" />
                                                    <stop offset="100%" stopColor="#3CE0B1" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-black text-slate-900">78</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">Your CV Score</div>
                                        <div className="text-lg font-bold text-slate-900">Good, but can improve</div>
                                        <div className="text-xs text-[#3CE0B1] font-medium">+22 points possible</div>
                                    </div>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <FileCheck size={14} className="text-[#3CE0B1]" />
                                            <span className="text-xs text-slate-500">ATS Ready</span>
                                        </div>
                                        <div className="text-lg font-bold text-[#3CE0B1]">72%</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Target size={14} className="text-[#8B5CF6]" />
                                            <span className="text-xs text-slate-500">Keywords</span>
                                        </div>
                                        <div className="text-lg font-bold text-[#8B5CF6]">4/7</div>
                                    </div>
                                </div>

                                {/* Top fixes preview */}
                                <div className="bg-white rounded-xl p-4 border border-slate-100">
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Top Fixes</div>
                                    <div className="space-y-2">
                                        {[
                                            { num: 1, text: 'Add quantifiable achievements', color: '#EF4444' },
                                            { num: 2, text: 'Include team leadership keyword', color: '#F59E0B' },
                                            { num: 3, text: 'Optimize summary section', color: '#3CE0B1' },
                                        ].map((fix) => (
                                            <div key={fix.num} className="flex items-center gap-2 text-sm">
                                                <div
                                                    className="w-5 h-5 rounded-md flex items-center justify-center text-white text-xs font-bold"
                                                    style={{ backgroundColor: fix.color }}
                                                >
                                                    {fix.num}
                                                </div>
                                                <span className="text-slate-600">{fix.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2 border border-slate-100"
                        >
                            <div className="w-8 h-8 rounded-lg bg-[#3CE0B1]/20 flex items-center justify-center">
                                <Zap size={16} className="text-[#3CE0B1]" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-slate-900">Impact Score</div>
                                <div className="text-xs text-[#3CE0B1] font-bold">Strong</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
