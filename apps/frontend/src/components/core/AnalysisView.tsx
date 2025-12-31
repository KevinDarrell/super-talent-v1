"use client";

import { useState } from "react";
import { useCv } from "@/lib/cv-context"; 
import { ArrowRight, Sparkles, AlertCircle, ChevronLeft, Loader2 } from "lucide-react";

export function AnalysisView() {
  // Ambil cvData juga untuk pengecekan fallback
  const { analysisResult, file, setAiDraft, setCvData, cvData, setView } = useCv(); 
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCustomize = async (mode: 'analysis' | 'job_desc') => {
    if (!file) {
        alert("File lost. Please re-upload.");
        setView("UPLOAD");
        return;
    }

    setIsGenerating(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    
    if (mode === 'analysis' && analysisResult) {
        formData.append("analysis_context", JSON.stringify(analysisResult));
    } else {
        formData.append("job_description", "General Role");
    }

    try {
        const res = await fetch("http://localhost:8000/api/customize", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Backend Error");

        const newData = await res.json();
        
        const safeData = {
            ...newData,
            contact_info: newData.contact_info || { email: "", phone: "", location: "" },
            hard_skills: newData.hard_skills || [],
            soft_skills: newData.soft_skills || [],
            work_experience: newData.work_experience || [],
            education: newData.education || [],
            projects: newData.projects || []
        };

        // --- LOGIC PERBAIKAN ALUR ---
        
        // 1. Simpan hasil rewrite AI hanya ke DRAFT (Sidebar Kiri)
        setAiDraft(safeData);
        
        // 2. Cek apakah Preview Utama (cvData) sudah ada isinya (Data Original)?
        // Jika cvData kosong (misal karena refresh), terpaksa kita isi pakai safeData agar tidak blank.
        // TAPI jika cvData ada (dari step Upload), JANGAN TIMPA. Biarkan user melihat Original vs AI Suggestion.
        if (!cvData || !cvData.full_name) {
            setCvData(safeData); 
        }

        // 3. Pindah ke Editor
        setView("EDITOR");

    } catch (e) {
        alert("Gagal Customize.");
    } finally {
        setIsGenerating(false);
    }
  };

  if (!analysisResult) return null;

  return (
    <div className="max-w-6xl mx-auto w-full">
       <button onClick={() => setView("UPLOAD")} className="flex items-center gap-2 text-slate-400 mb-6 hover:text-white transition-colors">
          <ChevronLeft size={16}/> Back to Upload
       </button>

       <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-10 shadow-2xl">
          {/* Header & Score sama seperti kode Anda sebelumnya... */}
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between border-b border-white/5 pb-8 mb-8">
             <div>
                <h2 className="text-3xl font-bold text-white mb-2">Analysis Report</h2>
                <p className="text-slate-400 max-w-2xl">{analysisResult.overall_summary}</p>
             </div>
             <div className="text-center">
                <div className="text-6xl font-black text-amber-500 mb-1">{analysisResult.overall_score}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Overall Score</div>
             </div>
          </div>

          {/* Details Score Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
             <div className="grid grid-cols-2 gap-4">
                <ScoreBox label="ATS Friendly" score={analysisResult.ats_score} />
                <ScoreBox label="Writing Impact" score={analysisResult.writing_score} />
                <ScoreBox label="Skill Match" score={analysisResult.skill_score} />
                <ScoreBox label="Experience" score={analysisResult.experience_score} />
             </div>
             <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2"><AlertCircle size={18}/> Critical Gaps</h3>
                <ul className="space-y-2">
                   {(analysisResult.missing_skills || []).length > 0 ? analysisResult.missing_skills.map((s: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm text-red-200/70"><span className="text-red-500">•</span> {s}</li>
                   )) : <li className="text-sm text-slate-500">No critical gaps found.</li>}
                </ul>
             </div>
          </div>

          {/* Action Bar */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
                   <Sparkles size={24}/>
                </div>
                <div>
                   <h3 className="font-bold text-white text-lg">AI Optimization Ready</h3>
                   <p className="text-sm text-slate-400">Generate a world-class version based on these insights.</p>
                </div>
             </div>
             <button 
                onClick={() => handleCustomize('analysis')} 
                disabled={isGenerating}
                className="bg-white text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
             >
                {isGenerating ? <Loader2 className="animate-spin"/> : <ArrowRight size={20}/>}
                {isGenerating ? "Drafting New CV..." : "Fix with AI & Edit"}
             </button>
          </div>
       </div>
    </div>
  );
}

function ScoreBox({label, score}: {label: string, score: number}) {
   const color = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400";
   return (
      <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
         <div className="text-slate-400 text-xs font-bold uppercase mb-1">{label}</div>
         <div className={`text-2xl font-bold ${color}`}>{score}</div>
      </div>
   )
}