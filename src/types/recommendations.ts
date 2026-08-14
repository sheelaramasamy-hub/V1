export interface RecommendedItem {
  id: string;
  /** Content source, e.g. "Microsoft Learn". */
  provider: string;
  durationMinutes: number;
  title: string;
  /** Shown as the trailing action, e.g. "Start learning" / "Continue learning". */
  actionLabel: string;
  /** Optional thumbnail override. The first reference item keeps the default Learn artwork. */
  thumbnail?: string;
  /** Resource id this recommendation opens in the learning library. */
  resourceId: string;
}
