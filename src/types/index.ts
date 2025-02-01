import { z } from 'zod';

export interface CallAnalysis {
  overallScore: number;
  summary: string;
  sections: {
    opener: SectionAnalysis;
    problemProposition: SectionAnalysis;
    objectionHandling: SectionAnalysis;
    engagementAndFlow: SectionAnalysis;
    closingAndNextSteps: SectionAnalysis;
  };
  actionableTakeaways: {
    quickWins: string[];
    scriptExample: string;
  };
}

export interface SectionAnalysis {
  score: number;
  feedback: string[];
  improvement?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TranscriptionResult {
  text: string;
  duration: number;
}

// Raw feedback result from the analysis function
export interface FeedbackResult {
  overallScore: {
    score?: number;
    summary: string;
  };
  openerAnalysis: {
    score?: number;
    feedback: string[];
    alternativeOpener?: string;
  };
  problemProposition: {
    score?: number;
    feedback: string[];
    alternativeProposition?: string;
  };
  objectionHandling: {
    score?: number;
    feedback: string[];
    alternativeFramework?: string;
  };
  engagementAndFlow: {
    score?: number;
    feedback: string[];
    recommendations: string[];
  };
  closingAndNextSteps: {
    score?: number;
    feedback: string[];
    alternativeClosing?: string;
  };
  actionableTakeaways: {
    improvements: string[];
    scriptExample: string;
  };
}

// Zod schemas for runtime validation
export const SectionAnalysisSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.array(z.string()),
  improvement: z.string().optional(),
});

export const CallAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(10),
  summary: z.string(),
  sections: z.object({
    opener: SectionAnalysisSchema,
    problemProposition: SectionAnalysisSchema,
    objectionHandling: SectionAnalysisSchema,
    engagementAndFlow: SectionAnalysisSchema,
    closingAndNextSteps: SectionAnalysisSchema,
  }),
  actionableTakeaways: z.object({
    quickWins: z.array(z.string()),
    scriptExample: z.string(),
  }),
}); 