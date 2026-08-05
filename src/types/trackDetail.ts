export interface Milestone {
  id: string;
  title: string;
  /** Rendered as the marker's connector line and the "≈" duration in the step list. */
  estimateMinutes: number;
  /** XP awarded on completion, shown as a small badge under the first milestone. */
  xp?: number;
}

export interface Track {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  milestones: Milestone[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface RelatedItem {
  id: string;
  code: string;
  title: string;
}

/**
 * Everything the track detail page needs beyond the catalogue card's own fields.
 * Optional at the `Challenge` level — a card with no detail simply doesn't link anywhere new.
 */
export interface ChallengeDetail {
  /** Catalogue reference code, e.g. "FY27-C1-H01". */
  code: string;
  scenarioQuote: string;
  scenarioBody: string[];
  intendedAudience?: string;
  prerequisites: string[];
  techTags: string[];
  deliverables: string[];
  prizes: string[];
  tracks: Track[];
  processTitle: string;
  processDescription: string;
  processSteps: ProcessStep[];
  relatedIds: string[];
}
