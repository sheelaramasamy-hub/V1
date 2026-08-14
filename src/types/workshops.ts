export type WorkshopStatus = "Live now" | "Upcoming" | "On demand";

export interface Workshop {
  id: string;
  status: WorkshopStatus;
  category: string;
  title: string;
  presenterName: string;
  presenterInitials: string;
  date: string;
  actionLabel: string;
  cover: string;
  /** Detail page intro paragraph. */
  description: string;
  /** Detail page "What to expect" checklist. */
  agenda: string[];
}
