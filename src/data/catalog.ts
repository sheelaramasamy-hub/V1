import { catalogChallenges } from "./catalogChallenges";
import type { Challenge } from "../types/challenges";

export { catalogChallenges };

/** Status values the catalogue can be filtered by — the participant's words, not the model's. */
export type CatalogStatus = "open" | "running" | "enrolled" | "ended";

export type CatalogSort = "soonest" | "closing" | "shortest" | "title";

export interface CatalogQuery {
  /** Free text, matched against title, format, category, industry, and level. */
  search: string;
  formats: string[];
  categories: string[];
  levels: string[];
  participation: string[];
  statuses: string[];
  sort: CatalogSort;
}

export const EMPTY_CATALOG_QUERY: CatalogQuery = {
  search: "",
  formats: [],
  categories: [],
  levels: [],
  participation: [],
  statuses: [],
  sort: "soonest",
};

export const CATALOG_SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: "soonest", label: "Starting soonest" },
  { value: "closing", label: "Registration closing" },
  { value: "shortest", label: "Shortest first" },
  { value: "title", label: "A–Z" },
];

/**
 * Filter option lists, derived from the content rather than hardcoded.
 *
 * If a new hackathon adds a level or industry no earlier entry used, the filter gains the option
 * automatically — a hardcoded list would silently make that content unfindable.
 */
const uniqueOptions = (values: string[]): { value: string; label: string }[] =>
  [...new Set(values)].sort().map((value) => ({ value, label: value }));

export const CATALOG_FILTER_OPTIONS = {
  formats: uniqueOptions(catalogChallenges.map((challenge) => challenge.format)),
  categories: uniqueOptions(catalogChallenges.map((challenge) => challenge.category)),
  levels: uniqueOptions(catalogChallenges.map((challenge) => challenge.level)),
  participation: uniqueOptions(catalogChallenges.map((challenge) => challenge.participation)),
  statuses: [
    { value: "open", label: "Registration open" },
    { value: "running", label: "Running now" },
    { value: "enrolled", label: "I'm enrolled" },
    { value: "ended", label: "Finished" },
  ] satisfies { value: CatalogStatus; label: string }[],
} as const;

function matchesSearch(challenge: Challenge, search: string): boolean {
  const term = search.trim().toLowerCase();

  if (term.length === 0) {
    return true;
  }

  return [challenge.title, challenge.format, challenge.category, challenge.industry, challenge.level]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

type ChallengePhase = "upcoming" | "running" | "ended" | "unscheduled";

function challengePhase(challenge: Challenge, now: Date): ChallengePhase {
  if (!challenge.startsAt || !challenge.endsAt) {
    return "unscheduled";
  }
  if (now < challenge.startsAt) {
    return "upcoming";
  }
  if (now > challenge.endsAt) {
    return "ended";
  }
  return "running";
}

function matchesStatus(challenge: Challenge, statuses: string[], now: Date): boolean {
  if (statuses.length === 0) {
    return true;
  }

  const phase = challengePhase(challenge, now);

  // Statuses are OR-ed within the filter: selecting two means "either", which is what people
  // expect from a multi-select.
  return statuses.some((status) => {
    switch (status as CatalogStatus) {
      case "open":
        return Boolean(challenge.registrationClosesAt) && now < challenge.registrationClosesAt!;
      case "running":
        return phase === "running";
      case "enrolled":
        return challenge.enrolled;
      case "ended":
        return phase === "ended";
      default:
        return false;
    }
  });
}

/**
 * Sort comparators.
 *
 * `soonest` pushes finished hackathons to the bottom before comparing start dates. Sorting purely
 * by start date is technically "soonest" and practically useless: it fills the top of the
 * catalogue with events that ended months ago, because those have the earliest start dates.
 */
const SORTERS: Record<CatalogSort, (a: Challenge, b: Challenge) => number> = {
  soonest: (a, b) => {
    const now = Date.now();
    const aEnded = (a.endsAt?.getTime() ?? Number.POSITIVE_INFINITY) < now;
    const bEnded = (b.endsAt?.getTime() ?? Number.POSITIVE_INFINITY) < now;

    if (aEnded !== bEnded) {
      return aEnded ? 1 : -1;
    }

    return (
      (a.startsAt?.getTime() ?? Number.POSITIVE_INFINITY) -
      (b.startsAt?.getTime() ?? Number.POSITIVE_INFINITY)
    );
  },
  closing: (a, b) =>
    (a.registrationClosesAt?.getTime() ?? Number.POSITIVE_INFINITY) -
    (b.registrationClosesAt?.getTime() ?? Number.POSITIVE_INFINITY),
  shortest: (a, b) => (a.durationHours ?? Number.POSITIVE_INFINITY) - (b.durationHours ?? Number.POSITIVE_INFINITY),
  title: (a, b) => a.title.localeCompare(b.title),
};

/**
 * Applies a catalogue query.
 *
 * Different filter *groups* are AND-ed and values within a group are OR-ed — the standard
 * faceted-search behaviour. Getting this backwards produces a catalogue that empties out as soon
 * as two boxes are ticked.
 */
export function queryCatalog(query: CatalogQuery, now: Date = new Date()): Challenge[] {
  const matched = catalogChallenges.filter(
    (challenge) =>
      matchesSearch(challenge, query.search) &&
      (query.formats.length === 0 || query.formats.includes(challenge.format)) &&
      (query.categories.length === 0 || query.categories.includes(challenge.category)) &&
      (query.levels.length === 0 || query.levels.includes(challenge.level)) &&
      (query.participation.length === 0 || query.participation.includes(challenge.participation)) &&
      matchesStatus(challenge, query.statuses, now),
  );

  return [...matched].sort(SORTERS[query.sort]);
}

export const activeFilterCount = (query: CatalogQuery): number =>
  query.formats.length +
  query.categories.length +
  query.levels.length +
  query.participation.length +
  query.statuses.length +
  (query.search.trim().length > 0 ? 1 : 0);
