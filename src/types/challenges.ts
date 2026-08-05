import type { ChallengeDetail } from "./trackDetail";

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
  /**
   * Catalogue-only scheduling metadata, used for sorting and status filtering on the All Tracks
   * page. Optional because the home page's hand-authored challenge lists don't need it.
   */
  startsAt?: Date;
  endsAt?: Date;
  registrationClosesAt?: Date;
  /** Numeric duration for sorting; `duration` remains the human-readable label shown on the card. */
  durationHours?: number;
  /**
   * Track detail page content. Optional — a challenge without one still renders in the catalogue,
   * its title just isn't a link.
   */
  detail?: ChallengeDetail;
}
