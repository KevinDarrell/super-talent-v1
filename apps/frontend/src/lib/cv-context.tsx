"use client";

import React, { createContext, useContext, useState, ReactNode, useRef, RefObject } from "react";

// ... (Interface Type CvContactInfo, CvData, dll TETAP SAMA seperti sebelumnya) ...
// Copy paste saja bagian interface dari kode sebelumnya

export interface CvContactInfo { email: string; phone: string; location: string; linkedin?: string; portfolio?: string; }
export interface CvExperience { title: string; company: string; dates: string; achievements: string[]; location?: string; }
export interface CvEducation { institution: string; degree: string; year: string; location?: string; }
export interface CvProject { name: string; description: string; highlights: string[]; technologies?: string[]; }

export interface CvData {
  full_name: string;
  professional_summary: string;
  contact_info: CvContactInfo;
  hard_skills: string[];
  soft_skills: string[];
  work_experience: CvExperience[];
  education: CvEducation[];
  projects: CvProject[];
  certifications?: string[];
}

export interface AnalysisData {
  candidate_name: string;
  overall_score: number;
  overall_summary: string;
  writing_score: number;
  writing_detail: string;
  ats_score: number;
  ats_detail: string;
  skill_score: number;
  skill_detail: string;
  experience_score: number;
  experience_detail: string;
  keyword_score: number;
  key_strengths: string[];
  missing_skills: string[];
}

export interface DesignSettings {
    fontFamily: 'font-sans' | 'font-serif' | 'font-mono';
    fontSize: string;
    accentColor: string;
    lineHeight: string;
    scale: number;
    pageMargin: string;    // e.g. 'p-4', 'p-8', 'p-12'
    sectionSpacing: string;
}

export type SectionType = "summary" | "experience" | "projects" | "skills" | "education";
export type TemplateType = "modern" | "classic" | "minimal";

interface CvContextType {
  cvData: CvData | null;
  setCvData: (data: CvData) => void;
  analysisResult: AnalysisData | null;
  setAnalysisResult: (data: AnalysisData | null) => void;
  aiDraft: CvData | null;
  setAiDraft: (data: CvData | null) => void;
  view: "UPLOAD" | "ANALYSIS" | "EDITOR";
  setView: (v: "UPLOAD" | "ANALYSIS" | "EDITOR") => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  design: DesignSettings;
  setDesign: (d: DesignSettings) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  sectionOrder: SectionType[];
  setSectionOrder: (order: SectionType[]) => void;
  updateCvField: (path: string, value: any) => void;
  applySuggestion: (section: keyof CvData, content: any, index?: number) => void;
  printRef: RefObject<HTMLDivElement | null>; // Ref untuk kertas CV
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
}

const defaultDesign: DesignSettings = {
    fontFamily: 'font-sans', 
    fontSize: 'text-[0.9em]', 
    accentColor: '#000000', 
    lineHeight: 'leading-relaxed',
    scale: 1,
    pageMargin: 'p-1',      // Default margin standard
    sectionSpacing: 'gap-1' // Default scale
};

// --- INI YANG KEMARIN HILANG/ERROR ---
const defaultOrder: SectionType[] = ["summary", "experience", "projects", "skills", "education"];

const CvContext = createContext<CvContextType | undefined>(undefined);

export function CvProvider({ children }: { children: ReactNode }) {
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [aiDraft, setAiDraft] = useState<CvData | null>(null);
  const [view, setView] = useState<"UPLOAD" | "ANALYSIS" | "EDITOR">("UPLOAD");
  const [isLoading, setIsLoading] = useState(false);
  const [design, setDesign] = useState<DesignSettings>(defaultDesign);
  const [file, setFile] = useState<File | null>(null);
  
  // Gunakan defaultOrder disini
  const [sectionOrder, setSectionOrder] = useState<SectionType[]>(defaultOrder);
  const printRef = useRef<HTMLDivElement>(null); // Ref inisialisasi null
  const [template, setTemplate] = useState<TemplateType>("modern");

  const applySuggestion = (section: keyof CvData, content: any, index?: number) => {
      if (!cvData) return;
      const newData = JSON.parse(JSON.stringify(cvData)); // Deep clone aman

      if (section === 'hard_skills' || section === 'soft_skills') {
          // Khusus skills, kita merge unik
          newData[section] = [...new Set([...(newData[section] as string[]), ...content])];
      } else if (index !== undefined && Array.isArray(newData[section])) {
          // Jika ada index (misal Experience[0]), update hanya item itu
          newData[section][index] = content;
      } else {
          // Jika tidak, replace semua (misal Summary)
          (newData as any)[section] = content;
      }
      
      setCvData(newData);
  };

  const updateCvField = (path: string, value: any) => {
    if (!cvData) return;
    const newData = JSON.parse(JSON.stringify(cvData)); 
    const keys = path.replace(/\]/g, "").split(/[.\[]/);
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; 
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setCvData(newData);
  };

  return (
    <CvContext.Provider value={{ 
        cvData, setCvData, analysisResult, setAnalysisResult, aiDraft, setAiDraft,
        view, setView, isLoading, setIsLoading, design, setDesign, 
        applySuggestion, file, setFile, sectionOrder, setSectionOrder, updateCvField,
        printRef, template, setTemplate 
    }}>
      {children}
    </CvContext.Provider>
  );
}

export function useCv() {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCv must be used within CvProvider");
  return ctx;
}