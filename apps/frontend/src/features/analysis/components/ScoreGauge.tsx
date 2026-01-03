"use client";

import { motion } from "framer-motion";

export const ScoreGauge = ({ score }: { score: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        
        <circle
          cx="50%" cy="50%" r={radius}
          className="stroke-slate-800 fill-none"
          strokeWidth="8"
        />
        
        <motion.circle
          cx="50%" cy="50%" r={radius}
          className="stroke-amber-500 fill-none"
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
     
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-serif font-bold text-white">{score}</span>
        <span className="text-xs text-slate-400 uppercase tracking-widest">Score</span>
      </div>
    </div>
  );
};
