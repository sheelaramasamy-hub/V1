export type ResourceCategory = "Learning path" | "Video" | "Lab" | "Template";

export type ResourceLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  /** e.g. "45 min · 6 modules" or "Download · DOCX". */
  meta: string;
  level: ResourceLevel;
  /** 0-100. Templates and unstarted items sit at 0. */
  progress: number;
  cover: string;
  actionLabel: string;
  /** Detail page "What you'll learn" checklist. */
  points: string[];
}

export interface FeaturedResource {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cover: string;
  moduleLabel: string;
  progress: number;
  actionLabel: string;
}
