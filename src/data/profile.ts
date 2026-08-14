import {
  BookOpen20Regular,
  Certificate20Regular,
  CheckmarkCircle20Regular,
  DocumentBulletList20Regular,
  Ribbon20Filled,
  RibbonStar20Filled,
  Star20Filled,
  Trophy20Filled,
  Trophy20Regular,
} from "@fluentui/react-icons";
import type { UserProfile } from "../types/profile";

/** The signed-in participant. Name and initials match the TopBar account menu (Priya Hariharan / PH). */
export const currentUser: UserProfile = {
  name: "Priya Hariharan",
  initials: "PH",
  role: "Data & AI Engineer",
  organization: "HCLTech",
  email: "priya.hariharan@hcltech.com",
  location: "Bengaluru, India",
  bio: "Building analytics and AI solutions on Microsoft Fabric. Three-time hackathon participant, currently focused on the Data for Impact Sprint.",
  skills: ["Microsoft Fabric", "Power BI", "Azure AI", "Python", "Responsible AI", "Data Engineering"],
  stats: [
    { id: "hackathons", label: "Hackathons joined", value: "4", icon: Trophy20Regular },
    { id: "points", label: "Total points", value: "2,480", icon: Star20Filled },
    { id: "badges", label: "Badges earned", value: "6", icon: Ribbon20Filled },
    { id: "resources", label: "Resources completed", value: "9", icon: BookOpen20Regular },
  ],
  achievements: [
    {
      id: "fabric-finisher",
      title: "Fabric Finisher",
      description: "Completed the Microsoft Fabric for analytics teams learning path.",
      earnedOn: "Earned Jul 2026",
      icon: Trophy20Filled,
    },
    {
      id: "first-hack",
      title: "First Hack",
      description: "Submitted a project in your first Hackable challenge.",
      earnedOn: "Earned Mar 2026",
      icon: RibbonStar20Filled,
    },
    {
      id: "top-10-percent",
      title: "Top 10%",
      description: "Finished in the top 10% of the Data for Impact Sprint leaderboard.",
      earnedOn: "Earned Jun 2026",
      icon: Certificate20Regular,
    },
    {
      id: "responsible-ai-certified",
      title: "Responsible AI Certified",
      description: "Completed the Responsible AI design review video and checklist.",
      earnedOn: "Earned May 2026",
      icon: CheckmarkCircle20Regular,
    },
  ],
  activity: [
    {
      id: "activity-1",
      title: "Continued \"Secure your AI apps on Azure\"",
      description: "Reached 60% completion.",
      timestamp: "2 days ago",
      icon: BookOpen20Regular,
    },
    {
      id: "activity-2",
      title: "Enrolled in Data for Impact Sprint",
      description: "Joined the Fabric analytics track.",
      timestamp: "1 week ago",
      icon: Trophy20Regular,
    },
    {
      id: "activity-3",
      title: "Submitted a support ticket",
      description: "SUP-1042 · Workshop calendar sync",
      timestamp: "2 weeks ago",
      icon: DocumentBulletList20Regular,
    },
  ],
};
