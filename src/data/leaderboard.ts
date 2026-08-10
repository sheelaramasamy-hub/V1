export interface LeaderboardEntry {
  rank: number;
  initials: string;
  name: string;
  org: string;
  hackathon: string;
  milestones: string;
  points: number;
  trend: "up" | "down" | "flat";
  trendValue?: number;
}

export const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    initials: "NB",
    name: "Northstar Builders",
    org: "Fabrikam APAC",
    hackathon: "Cloud Resilience",
    milestones: "18 / 20",
    points: 9680,
    trend: "up",
    trendValue: 2,
  },
  {
    rank: 2,
    initials: "CI",
    name: "Cloud Crafters",
    org: "Contoso India",
    hackathon: "Cloud Resilience",
    milestones: "17 / 20",
    points: 8940,
    trend: "flat",
  },
  {
    rank: 3,
    initials: "DF",
    name: "Data Foundry",
    org: "Adventure Works",
    hackathon: "Data for Impact",
    milestones: "16 / 20",
    points: 8510,
    trend: "up",
    trendValue: 1,
  },
  {
    rank: 4,
    initials: "AA",
    name: "Access Allies",
    org: "Woodgrove Bank",
    hackathon: "AI for Accessibility",
    milestones: "15 / 20",
    points: 7960,
    trend: "down",
    trendValue: 1,
  },
  {
    rank: 5,
    initials: "GF",
    name: "Green Futures",
    org: "Tailwind Traders",
    hackathon: "Green Cloud",
    milestones: "14 / 20",
    points: 7420,
    trend: "up",
    trendValue: 3,
  },
];

export const yourTeamRank = 14;
