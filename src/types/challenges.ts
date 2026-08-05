export type ChallengeTabKey = "enrolled" | "inProgress" | "upcoming" | "previous";

export interface ChallengeTab {
  key: ChallengeTabKey;
  label: string;
  /** Rendered as a CounterBadge next to the tab label when present. */
  count?: number;
}

export interface Challenge {
  id: string;
  /** Hackathon format, e.g. "Hack in a Day". */
  format: string;
  /** Content category, e.g. "AI & Learning". */
  category: string;
  title: string;
  schedule: string;
  level: string;
  duration: string;
  participation: string;
  industry: string;
  enrolled: boolean;
  /** Cover artwork imported from the Fabric-style visuals in the design file. */
  cover: string;
  ctaLabel: string;
}
