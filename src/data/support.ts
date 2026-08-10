import {
  Bug20Regular,
  CalendarLtr20Regular,
  Grid20Regular,
  Person20Regular,
} from "@fluentui/react-icons";
import type { FluentIcon } from "@fluentui/react-icons";

export interface SupportCategory {
  id: string;
  icon: FluentIcon;
  title: string;
  description: string;
}

export const supportCategories: SupportCategory[] = [
  {
    id: "account",
    icon: Person20Regular,
    title: "Account & profile",
    description: "Access, identity, language, and profile settings.",
  },
  {
    id: "tracks",
    icon: Grid20Regular,
    title: "Tracks & submissions",
    description: "Enrollment, milestones, evidence, and deadlines.",
  },
  {
    id: "workshops",
    icon: CalendarLtr20Regular,
    title: "Workshops",
    description: "Registration, event access, recordings, and calendars.",
  },
  {
    id: "technical",
    icon: Bug20Regular,
    title: "Technical issue",
    description: "Unexpected errors, performance, and browser support.",
  },
];

export const ISSUE_TYPES = ["Account and access", "Track or submission", "Workshop", "Technical issue"];
export const PRIORITIES = ["Normal", "High — blocking progress"];

export interface SupportTicket {
  id: string;
  subject: string;
  status: "Resolved" | "Closed" | "Open";
  updated: string;
}

export const recentTickets: SupportTicket[] = [
  { id: "HCK-2016", subject: "Workshop calendar timezone", status: "Resolved", updated: "Jul 24" },
  { id: "HCK-1984", subject: "Submission file preview", status: "Closed", updated: "Jul 12" },
];
