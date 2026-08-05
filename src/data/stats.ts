import type { ActivityDay, Deadline, TenantSegment } from "../types/stats";

/** Tenant Segmentation donut — Figma node 1620:1518. */
export const tenantSegments: TenantSegment[] = [
  { status: "notStarted", label: "Not started", count: 20 },
  { status: "inProgress", label: "In progress", count: 20 },
  { status: "submitted", label: "Submitted", count: 20 },
  { status: "completed", label: "Completed", count: 20 },
];

/** Weekly activity bar chart — Figma node 1620:1550. Thursday is the peak at 3.5h. */
export const weeklyActivity: ActivityDay[] = [
  { label: "Mon", hours: 1.5 },
  { label: "Tue", hours: 2 },
  { label: "Wed", hours: 2.5 },
  { label: "Thu", hours: 3.5 },
  { label: "Fri", hours: 2.75 },
  { label: "Sat", hours: 1.75 },
  { label: "Sun", hours: 1 },
];

export const weeklyActivitySummary = {
  totalLabel: "12.5h",
  caption: "Hours invested",
  trend: "18% above your 4-week average",
};

/** Upcoming deadlines — Figma node 1620:1588. */
export const upcomingDeadlines: Deadline[] = [
  {
    id: "concept-brief",
    day: "01",
    month: "Aug",
    title: "Concept brief checkpoint",
    subtitle: "Cloud Resilience Challenge",
    daysRemaining: 3,
    urgent: true,
  },
  {
    id: "prototype-review",
    day: "08",
    month: "Aug",
    title: "Prototype review",
    subtitle: "AI for Accessibility",
    daysRemaining: 10,
    urgent: false,
  },
  {
    id: "sprint-registration",
    day: "18",
    month: "Aug",
    title: "Sprint registration",
    subtitle: "Responsible AI Sprint",
    daysRemaining: 20,
    urgent: false,
  },
];
