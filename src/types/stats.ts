export type SegmentStatus = "notStarted" | "inProgress" | "submitted" | "completed";

export interface TenantSegment {
  status: SegmentStatus;
  label: string;
  count: number;
}

export interface ActivityDay {
  /** Short weekday label shown under the bar, e.g. "Mon". */
  label: string;
  hours: number;
}

export interface Deadline {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle: string;
  daysRemaining: number;
  /** Renders the countdown in the danger color when the deadline is close. */
  urgent: boolean;
}
