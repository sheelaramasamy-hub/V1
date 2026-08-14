import type { FluentIcon } from "@fluentui/react-icons";

export interface ProfileStat {
  id: string;
  label: string;
  value: string;
  icon: FluentIcon;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedOn: string;
  icon: FluentIcon;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: FluentIcon;
}

export interface UserProfile {
  name: string;
  initials: string;
  role: string;
  organization: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  stats: ProfileStat[];
  achievements: Achievement[];
  activity: ActivityItem[];
}
