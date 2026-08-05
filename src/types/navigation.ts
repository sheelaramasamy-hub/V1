export type NavIconKey =
  | "home"
  | "allTracks"
  | "resources"
  | "leaderboard"
  | "workshop"
  | "feedback"
  | "support"
  | "faq";

export interface NavItem {
  key: string;
  label: string;
  icon: NavIconKey;
  href: string;
}
