"use client";

import { useState } from "react";
import { useCvPolling } from "@/hooks/useCvPolling";
import { ScoreGauge } from "@/components/ScoreGauge";
import { GuestBlocker } from "@/components/GuestBlocker";
import { FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResultDashboard({ params }: { params: { id: string } }) {
  const { status, data } = useCvPolling(params.id);
  
  // Mobile View Switcher State
  const [mobileTab, setMobileTab] = useState<'pdf' | 'analysis'>('analysis');
  
  // MOCK USER STATE
  const isGuest = true; 

  if (status !== 'COMPLETED') {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-500 animate-pulse">
        Loading Analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 md:pb-0">
      
      {/* HEADER */}
      <header className="h-16 border-b border-white/10 flex items-center px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="font-serif text-xl text-amber-500">Super CV</h1>
      </header>

      {/* MOBILE TOGGLE (Visible only on small screens) */}
      <div className="md:hidden flex border-b border-white/10 bg-slate-900 sticky top-16 z-40">
        <button
          onClick={() => setMobileTab('pdf')}
          className={cn(
            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2",
            mobileTab === 'pdf' ? "text-amber-500 border-b-2 border-amber-500" : "text-slate-500"
          )}
        >
          <FileText size={16} /> View PDF
        </button>
        <button
          onClick={() => setMobileTab('analysis')}
          className={cn(
            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2",
            mobileTab === 'analysis' ? "text-amber-500 border-b-2 border-amber-500" : "text-slate-500"
          )}
        >
          <Sparkles size={16} /> AI Analysis
        </button>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        
        {/* LEFT PANEL: PDF PREVIEW */}
        {/* Hidden on mobile if tab is 'analysis' */}
        <section className={cn(
          "w-full md:w-1/2 h-full bg-slate-900 border-r border-white/5 p-4",
          mobileTab === 'analysis' ? "hidden md:block" : "block"
        )}>
          <div className="w-full h-full rounded-xl bg-slate-800 flex items-center justify-center border border-white/10">
            <p className="text-slate-500">[ PDF Viewer Component Here ]</p>
          </div>
        </section>

        {/* RIGHT PANEL: ANALYSIS */}
        {/* Hidden on mobile if tab is 'pdf' */}
        <section className={cn(
          "w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-10 scrollbar-hide",
          mobileTab === 'pdf' ? "hidden md:block" : "block"
        )}>
          
          <div className="max-w-2xl mx-auto space-y-10">
            
            {/* 1. Score Section (Always Visible) */}
            <div className="flex flex-col items-center text-center space-y-4">
               <ScoreGauge score={data?.score || 0} />
               <div>
                 <h2 className="text-2xl font-serif text-white">Analysis Complete</h2>
                 <p className="text-slate-400 text-sm">Based on industry standards</p>
               </div>
            </div>

            {/* 2. Summary (Always Visible) */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-amber-500 font-serif mb-2">Executive Summary</h3>
              <p className="leading-relaxed text-slate-300">
                {data?.summary}
              </p>
            </div>

            {/* 3. Detailed Feedback (GUEST BLOCKED) */}
            <GuestBlocker isGuest={isGuest}>
              <div className="space-y-6">
                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-lg font-serif text-white mb-4">Detailed Feedback</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1 h-full bg-red-500 rounded-full" />
                        <div>
                          <h4 className="font-bold text-slate-200">Weak Action Verbs</h4>
                          <p className="text-sm text-slate-400 mt-1">
                            Avoid using passive voice in your experience section.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
                   <h3 className="text-lg font-serif text-white mb-4">Suggested Rewrite</h3>
                   <p className="text-slate-400 italic">"Led a team of..."</p>
                </div>
              </div>
            </GuestBlocker>

          </div>
        </section>

      </main>
    </div>
  );
}