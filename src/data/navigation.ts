import type { NavItem } from "../types/navigation";

/**
 * The 8 hub positions from the Figma side navigation (node 1643:54068).
 * Icon keys map to the exact Fluent System Icons the design references —
 * see the component descriptions attached to that node.
 */
export const primaryNavItems: NavItem[] = [
  { key: "home", label: "Home", icon: "home", href: "/" },
  { key: "all-tracks", label: "All Tracks", icon: "allTracks", href: "/tracks" },
  { key: "resources", label: "Resources", icon: "resources", href: "/resources" },
  { key: "leaderboard", label: "Leaderboard", icon: "leaderboard", href: "/leaderboard" },
  { key: "workshop", label: "Workshop", icon: "workshop", href: "/workshop" },
  { key: "feedback", label: "Feedback", icon: "feedback", href: "/feedback" },
  { key: "support", label: "Support", icon: "support", href: "/support" },
  { key: "faq", label: "FAQ", icon: "faq", href: "/faq" },
];
