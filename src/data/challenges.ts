import coverOne from "../assets/images/challenge-cover-1.png";
import coverTwo from "../assets/images/challenge-cover-2.png";
import coverThree from "../assets/images/challenge-cover-3.png";
import type { Challenge, ChallengeTab } from "../types/challenges";

/** Figma node 1620:1637 — the "Enrolled" tab carries a count badge. */
export const challengeTabs: ChallengeTab[] = [
  { key: "enrolled", label: "Enrolled", count: 3 },
  { key: "inProgress", label: "In Progress" },
  { key: "upcoming", label: "Upcoming" },
  { key: "previous", label: "Previous" },
];

export const aboutHackathon = {
  title: "About Your Hackathon",
  description:
    "In this Hackathon, you'll explore and build solutions using Microsoft technologies such as Fabric, Microsoft Dynamics 365, Azure, Power Platform and more. Participants may choose any one use case from the available use cases. Once enrolled in a use case, you won't be able to enroll in another, so choose carefully.",
};

/** The three enrolled challenge cards from Figma node 1620:1638. */
export const enrolledChallenges: Challenge[] = [
  {
    id: "multi-agent-rfp",
    format: "Hack in a Day",
    category: "AI & Learning",
    title: "Multi-agent RFP Workflow for E-commerce using AI Foundry and Autogen",
    schedule: "Wednesday, November 19, 9:00 AM - Thursday, November 20, 5:30 PM IST",
    level: "Beginner",
    duration: "1 day (4 hrs)",
    participation: "Individual",
    industry: "Cross-Industry",
    enrolled: true,
    cover: coverOne,
    ctaLabel: "Start Challenge",
  },
  {
    id: "meeting-to-action",
    format: "Hack in a Day",
    category: "AI & Learning",
    title: "Meeting-to-Action Automation Challenge",
    schedule: "Wednesday, November 19, 9:00 AM - Thursday, November 20, 5:30 PM IST",
    level: "Beginner",
    duration: "1 day (4 hrs)",
    participation: "Individual",
    industry: "Cross-Industry",
    enrolled: true,
    cover: coverTwo,
    ctaLabel: "Enroll",
  },
  {
    id: "agent-maker-league",
    format: "Hack in a Day",
    category: "AI & Learning",
    title: "Agent Maker League: Copilot Studio Five-Level Challenge",
    schedule: "Wednesday, November 19, 9:00 AM - Thursday, November 20, 5:30 PM IST",
    level: "Beginner",
    duration: "1 day (4 hrs)",
    participation: "Individual",
    industry: "Cross-Industry",
    enrolled: true,
    cover: coverThree,
    ctaLabel: "Enroll",
  },
];
