// Study-plan calculator settings. Each split must add up to 100.

export type PrepLevel = "beginner" | "intermediate" | "advanced";

export const studyCategories = ["DSA", "Aptitude", "Core CS", "Interview Prep"] as const;
export type StudyCategory = (typeof studyCategories)[number];

export const levelSplits: Record<PrepLevel, { label: string; split: Record<StudyCategory, number> }> = {
  beginner: { label: "Just getting started", split: { DSA: 40, Aptitude: 30, "Core CS": 20, "Interview Prep": 10 } },
  intermediate: { label: "I know the basics", split: { DSA: 40, Aptitude: 25, "Core CS": 20, "Interview Prep": 15 } },
  advanced: { label: "Mostly prepared", split: { DSA: 35, Aptitude: 20, "Core CS": 20, "Interview Prep": 25 } },
};

export const categoryNotes: Record<StudyCategory, string> = {
  DSA: "Pattern-wise problems + starred revision",
  Aptitude: "Quant, Logical, Verbal: timed practice",
  "Core CS": "OOPs, DBMS, OS, CN",
  "Interview Prep": "HR answers, project explanation, mock interviews",
};

export const calculatorLimits = {
  defaultDays: 90,
  defaultHours: 3,
  maxDays: 365,
  maxHours: 16,
};
