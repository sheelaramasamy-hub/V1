/** Formats a duration in minutes as "45 min" or "1h 30min" once it crosses an hour. */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}min`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days between `date` and `now`, rounding toward zero at the boundary. */
function daysUntil(date: Date, now: Date): number {
  return Math.round((date.getTime() - now.getTime()) / DAY_MS);
}

/** "starts in 21 days" / "started 3 days ago" / "starts today". */
export function formatRelativeDays(date: Date, now: Date = new Date()): string {
  const days = daysUntil(date, now);
  if (days === 0) return "today";
  if (days > 0) return `in ${days} day${days === 1 ? "" : "s"}`;
  return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`;
}

/** "25-26 Aug" for same-month ranges, "28 Aug - 3 Sep" once the range crosses a month. */
export function formatShortDateRange(start: Date, end: Date): string {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const day = (date: Date) => date.getDate();
  const month = (date: Date) => date.toLocaleDateString("en-US", { month: "short" });

  if (sameMonth) {
    return `${day(start)}-${day(end)} ${month(end)}`;
  }
  return `${day(start)} ${month(start)} - ${day(end)} ${month(end)}`;
}

/** "August 25, 2026" — the full date for a tooltip/title attribute. */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
