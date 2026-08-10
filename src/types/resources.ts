export type ResourceCategory = "Learning path" | "Video" | "Lab" | "Template";

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  /** e.g. "45 min · 6 modules" or "Download · DOCX". */
  meta: string;
  /** 0-100. Templates and unstarted items sit at 0. */
  progress: number;
  cover: string;
  actionLabel: string;
}

export interface FeaturedResource {
  eyebrow: string;
  title: string;
  description: string;
  cover: string;
  moduleLabel: string;
  progress: number;
  actionLabel: string;
}
