import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
    CvData,
    DesignSettings,
    SectionType,
    TemplateType,
} from "../types/editor.types";

// =============================================================================
// State Interface
// =============================================================================

interface EditorState {
    // CV Data
    cvData: CvData | null;
    aiDraft: CvData | null;

    // Editor Settings
    sectionOrder: SectionType[];
    design: DesignSettings;
    template: TemplateType;

    // UI State
    isSidebarOpen: boolean;
    activeSection: SectionType | null;
}

interface EditorActions {
    // Data Setters
    setCvData: (data: CvData | null) => void;
    setAiDraft: (data: CvData | null) => void;

    // Field Updates
    updateCvField: (path: string, value: unknown) => void;

    // Section Reordering
    reorderSections: (newOrder: SectionType[]) => void;

    // AI Suggestion Application
    applySuggestion: (
        section: keyof CvData,
        content: unknown,
        index?: number
    ) => void;

    // Design Settings
    setDesign: (design: Partial<DesignSettings>) => void;
    setTemplate: (template: TemplateType) => void;

    // UI Actions
    toggleSidebar: () => void;
    setActiveSection: (section: SectionType | null) => void;

    // Reset
    reset: () => void;
}

// =============================================================================
// Default Values
// =============================================================================

const defaultDesign: DesignSettings = {
    fontFamily: "font-sans",
    fontSize: "text-[0.9em]",
    accentColor: "#000000",
    lineHeight: "leading-relaxed",
    scale: 1,
    pageMargin: "p-1",
    sectionSpacing: "gap-1",
};

const defaultSectionOrder: SectionType[] = [
    "summary",
    "experience",
    "projects",
    "skills",
    "education",
];

const initialState: EditorState = {
    cvData: null,
    aiDraft: null,
    sectionOrder: defaultSectionOrder,
    design: defaultDesign,
    template: "modern",
    isSidebarOpen: true,
    activeSection: null,
};

// =============================================================================
// Store
// =============================================================================

export const useEditorStore = create<EditorState & EditorActions>()(
    immer((set, get) => ({
        ...initialState,

        // -------------------------------------------------------------------------
        // Data Setters
        // -------------------------------------------------------------------------
        setCvData: (data) =>
            set((state) => {
                state.cvData = data;
            }),

        setAiDraft: (data) =>
            set((state) => {
                state.aiDraft = data;
            }),

        // -------------------------------------------------------------------------
        // Field Updates - Handles nested paths like "contact_info.email"
        // -------------------------------------------------------------------------
        updateCvField: (path, value) =>
            set((state) => {
                if (!state.cvData) return;

                const keys = path.replace(/\]/g, "").split(/[.[\]]/);
                let current: Record<string, unknown> = state.cvData as Record<string, unknown>;

                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    if (!current[key]) {
                        current[key] = {};
                    }
                    current = current[key] as Record<string, unknown>;
                }

                current[keys[keys.length - 1]] = value;
            }),

        // -------------------------------------------------------------------------
        // Section Reordering
        // -------------------------------------------------------------------------
        reorderSections: (newOrder) =>
            set((state) => {
                state.sectionOrder = newOrder;
            }),

        // -------------------------------------------------------------------------
        // AI Suggestion Application
        // -------------------------------------------------------------------------
        applySuggestion: (section, content, index) =>
            set((state) => {
                if (!state.cvData) return;

                if (section === "hard_skills" || section === "soft_skills") {
                    // Merge skills without duplicates
                    const existing = state.cvData[section] as string[];
                    const newItems = content as string[];
                    state.cvData[section] = [...new Set([...existing, ...newItems])];
                } else if (index !== undefined && Array.isArray(state.cvData[section])) {
                    // Update array item at index
                    (state.cvData[section] as unknown[])[index] = content;
                } else {
                    // Direct assignment
                    (state.cvData as Record<string, unknown>)[section] = content;
                }
            }),

        // -------------------------------------------------------------------------
        // Design Settings
        // -------------------------------------------------------------------------
        setDesign: (newDesign) =>
            set((state) => {
                state.design = { ...state.design, ...newDesign };
            }),

        setTemplate: (template) =>
            set((state) => {
                state.template = template;
            }),

        // -------------------------------------------------------------------------
        // UI Actions
        // -------------------------------------------------------------------------
        toggleSidebar: () =>
            set((state) => {
                state.isSidebarOpen = !state.isSidebarOpen;
            }),

        setActiveSection: (section) =>
            set((state) => {
                state.activeSection = section;
            }),

        // -------------------------------------------------------------------------
        // Reset
        // -------------------------------------------------------------------------
        reset: () => set(initialState),
    }))
);

// =============================================================================
// Selectors (for performance optimization)
// =============================================================================

export const selectCvData = (state: EditorState & EditorActions) => state.cvData;
export const selectDesign = (state: EditorState & EditorActions) => state.design;
export const selectSectionOrder = (state: EditorState & EditorActions) =>
    state.sectionOrder;
