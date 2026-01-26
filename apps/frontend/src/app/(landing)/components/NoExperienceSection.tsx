'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Users, CheckSquare, Search, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const helpItems = [
    {
        icon: Lightbulb,
        title: 'Turn projects into impact bullets',
        description: 'Problem → Action → Result format that recruiters love',
        color: '#F59E0B',
        step: 1,
    },
    {
        icon: Users,
        title: 'Translate organization experience',
        description: 'Convert club, volunteer & org work into relatable skills',
        color: '#8B5CF6',
        step: 2,
    },
    {
        icon: CheckSquare,
        title: 'Auto-check ATS format',
        description: 'Ensure your CV passes automated screening systems',
        color: '#3CE0B1',
        step: 3,
    },
    {
        icon: Search,
        title: 'Suggest skill keywords',
        description: 'Get keyword recommendations for your dream job',
        color: '#2F6BFF',
        step: 4,
    },
];

/**
 * NoExperienceSection Component
 * 
 * Section targeting users with little or no work experience.
 * Polished version with step numbers, accent borders, and enhanced hover effects.
 */
export function NoExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section ref={containerRef} className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F59E0B]/10 rounded-full text-[#F59E0B] text-sm font-medium">
                        <Sparkles size={14} />
                        This is for you
                    </span>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        No experience? <span className="text-gradient-primary">No problem.</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
                        Built for someone with little or no work experience.
                    </p>
                    <span className="inline-block px-6 py-2 bg-slate-100 rounded-full text-slate-700 font-semibold">
                        We'll help you:
                    </span>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {helpItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div
                                className="relative bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full overflow-hidden"
                                style={{
                                    borderTopColor: item.color,
                                    borderTopWidth: '3px',
                                }}
                            >
                                {/* Hover gradient background */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(180deg, ${item.color}08 0%, transparent 50%)`
                                    }}
                                />

                                {/* Step number badge */}
                                <div
                                    className="absolute -top-0.5 right-4 px-3 py-1 rounded-b-lg text-white text-xs font-bold shadow-md"
                                    style={{ backgroundColor: item.color }}
                                >
                                    Step {item.step}
                                </div>

                                {/* Icon with ring effect */}
                                <div className="relative mb-5">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10"
                                        style={{ backgroundColor: `${item.color}15` }}
                                    >
                                        <item.icon size={28} style={{ color: item.color }} />
                                    </div>
                                    {/* Pulse ring on hover */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                                        style={{ backgroundColor: `${item.color}10` }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-slate-800 transition-colors relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                                    {item.description}
                                </p>

                                {/* Bottom accent line on hover */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1"
                                    style={{ backgroundColor: item.color }}
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA with background highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-block relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#2F6BFF]/20 to-[#3CE0B1]/20 rounded-2xl blur-xl" />

                        <Link
                            href="/register"
                            className="relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#2F6BFF] to-[#3CE0B1] text-white font-bold text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#2F6BFF]/30 group"
                        >
                            <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
                            Analyze My CV for Free
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
