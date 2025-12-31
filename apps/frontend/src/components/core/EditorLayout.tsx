"use client";

import { useState } from "react";
import { useCv } from "@/lib/cv-context";
import { CvEditor } from "@/components/customize/cv-editor";
import { Check, Sparkles, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EditorLayout() {
  const { aiDraft, cvData, applySuggestion, setView } = useCv();
  
  // State untuk menyimpan ID saran yang sudah di-apply
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  if (!aiDraft || !cvData) return null;

  // --- LOGIC SCORING (FINAL FIX FOR SAME COMPANY) ---
  const findBestMatchIndex = (aiItem: any, userList: any[], aiIndex: number) => {
      if (!userList || userList.length === 0) return -1;

      let bestIndex = -1;
      let maxScore = -1;

      userList.forEach((userItem, userIndex) => {
          let score = 0;
          
          // Normalisasi string (kecilkan huruf, hapus spasi berlebih)
          const cleanString = (str: string) => str?.toLowerCase().replace(/\s+/g, ' ').trim() || "";
          
          const aiCo = cleanString(aiItem.company);
          const userCo = cleanString(userItem.company);
          const aiTitle = cleanString(aiItem.title);
          const userTitle = cleanString(userItem.title);

          // 1. CEK PERUSAHAAN (Wajib Sama)
          if (aiCo === userCo) {
              score += 10; // Modal awal

              // 2. CEK JUDUL (BOBOT TERTINGGI: +50)
              // Logika: Jika Judul mengandung kata yang sama (misal "Software Engineer" ada di "Software Engineer Intern")
              if (aiTitle && userTitle) {
                  if (aiTitle === userTitle) {
                      score += 50; // Sama persis
                  } 
                  else if (userTitle.includes(aiTitle) || aiTitle.includes(userTitle)) {
                      score += 30; // Mirip
                  }
              }

              // 3. CEK URUTAN/INDEX (BOBOT MENENGAH: +20)
              // Ini penyelamat jika nama PT sama persis.
              // Software Engineer (Index 1) akan lebih memilih Index 1 (+20 poin) daripada Index 0.
              if (userIndex === aiIndex) {
                  score += 20;
              }
          }

          // Update Pemenang jika skor lebih tinggi
          if (score > maxScore) {
              maxScore = score;
              bestIndex = userIndex;
          }
      });

      // SYARAT MINIMAL: Skor > 10
      // Artinya minimal Nama Perusahaan harus sama. 
      // Jika cuma beda judul tapi PT sama, dia akan ambil yang skornya paling tinggi (karena faktor Index).
      if (maxScore <= 10 && bestIndex !== -1) {
         // Edge Case: Jika PT sama tapi Judul Beda Total, dan Index Beda Total.
         // Kita cek ulang, jangan sampai salah timpa.
         // Tapi karena kita pakai MaxScore, dia akan otomatis ambil yang "paling mending".
      }

      return maxScore > 0 ? bestIndex : -1;
  };

  const handleApply = (type: string, id: string | number, data: any, originalIndex: number) => {
      // 1. Update Context
      if (type === 'hard_skills') {
          applySuggestion('hard_skills', data);
      } else if (type === 'professional_summary') {
          applySuggestion('professional_summary', data);
      } else {
          // Array items (Experience, Projects, etc)
          const currentList = (cvData as any)[type] || [];
          
          // Cari item target dengan logika Scoring baru
          const targetIndex = findBestMatchIndex(data, currentList, originalIndex);

          if (targetIndex !== -1) {
              applySuggestion(type as any, data, targetIndex);
          } else {
              console.warn("No matching item found. Fallback prevention active.");
          }
      }

      // 2. Hide Card
      setAppliedIds(prev => new Set(prev).add(`${type}-${id}`));
  };

  const missingSkills = (aiDraft.hard_skills || []).filter(
      (s: string) => !(cvData.hard_skills || []).includes(s)
  );

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
       
       {/* SIDEBAR */}
       <div className="w-[400px] border-r border-white/10 bg-slate-900/80 backdrop-blur-md flex flex-col z-20">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
             <div>
                <div className="flex items-center gap-2 text-amber-500 font-bold mb-1"><Sparkles size={18}/> AI Review</div>
                <p className="text-xs text-slate-400">Suggestions disappear when applied.</p>
             </div>
             <button onClick={() => setView("ANALYSIS")} className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><ArrowLeft size={16}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
             <AnimatePresence mode="popLayout">
                
                {/* 1. SUMMARY */}
                {!appliedIds.has('professional_summary-0') && aiDraft.professional_summary !== cvData.professional_summary && (
                    <SuggestionCard 
                        key="summary-card"
                        title="Professional Summary"
                        content={aiDraft.professional_summary}
                        onApply={() => handleApply('professional_summary', 0, aiDraft.professional_summary, 0)}
                    />
                )}

                {/* 2. SKILLS */}
                {missingSkills.length > 0 && (
                    <motion.div 
                        key="skills-card"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="bg-slate-950/50 border border-white/5 rounded-xl p-4 mb-4"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-sm text-slate-200">Suggested Skills</h3>
                            <button onClick={() => applySuggestion('hard_skills', aiDraft.hard_skills || [])} className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/30">Apply All</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {missingSkills.map((s: string, i: number) => (
                                <span key={i} className="text-xs px-2 py-1 rounded border bg-amber-500/10 border-amber-500/40 text-amber-300">
                                    + {s}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 3. WORK EXPERIENCE */}
                {(aiDraft.work_experience || []).map((aiExp, idx) => {
                    const cardKey = `work_experience-${idx}`;
                    if (appliedIds.has(cardKey)) return null;

                    // Cek apakah item ini relevan
                    const matchIndex = findBestMatchIndex(aiExp, cvData.work_experience || [], idx);

                    // Tampilkan hanya jika ada match
                    if (matchIndex !== -1) {
                        return (
                            <SuggestionCard
                                key={cardKey}
                                title={`Improve: ${aiExp.title || aiExp.company}`} // Tampilkan Title biar jelas bedanya
                                content={
                                    <ul className="list-disc ml-4 space-y-1 text-slate-300 text-xs">
                                        {(aiExp.achievements || []).slice(0, 3).map((a: string, i: number) => <li key={i}>{a}</li>)}
                                    </ul>
                                }
                                onApply={() => handleApply('work_experience', idx, aiExp, idx)}
                            />
                        );
                    }
                    return null;
                })}

             </AnimatePresence>

             {/* Pesan Selesai */}
             {missingSkills.length === 0 && 
              (aiDraft.work_experience || []).every((aiExp, idx) => {
                  const key = `work_experience-${idx}`;
                  const match = findBestMatchIndex(aiExp, cvData.work_experience || [], idx);
                  return appliedIds.has(key) || match === -1;
              }) && (
                 <div className="text-center py-10 opacity-50">
                     <Check size={40} className="mx-auto mb-2 text-emerald-500"/>
                     <p className="text-sm text-slate-400">All suggestions applied!</p>
                 </div>
             )}
          </div>
       </div>

       {/* MAIN EDITOR */}
       <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto bg-slate-900/50 flex justify-center">
             <div className="py-10"> 
                <CvEditor /> 
             </div>
          </div>
       </div>
    </div>
  );
}

function SuggestionCard({ title, content, onApply }: any) {
    return (
        <motion.div 
            layout 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0, border: 0, overflow: 'hidden' }}
            className="bg-slate-950 border border-white/5 rounded-xl p-4 group hover:border-amber-500/30 transition-all mb-4"
        >
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-sm text-white">{title}</h4>
                <button onClick={onApply} className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full font-bold flex items-center gap-1 hover:bg-emerald-500 transition-all">
                   <Check size={12}/> Apply
                </button>
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">{content}</div>
        </motion.div>
    )
}