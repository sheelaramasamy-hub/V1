import { currentUser } from "../data/banner";
import { challengeTabs, enrolledChallenges } from "../data/challenges";
import { recommendedItems } from "../data/recommendations";
import { tenantSegments, upcomingDeadlines, weeklyActivity } from "../data/stats";
import type { Challenge } from "../types/challenges";

/**
 * Single seam between the UI and content. Every getter here reads from typed
 * mock data — swapping in a real API later means changing these function
 * bodies, not the components that call them.
 */
export const contentService = {
  getCurrentUser: () => currentUser,
  getTenantSegments: () => tenantSegments,
  getWeeklyActivity: () => weeklyActivity,
  getUpcomingDeadlines: () => upcomingDeadlines,
  getChallengeTabs: () => challengeTabs,
  getEnrolledChallenges: () => enrolledChallenges,
  getRecommendedItems: () => recommendedItems,
  /** Empty in the demo so the Workshops panel renders its designed empty state. */
  getWorkshops: (): Challenge[] => [],
};
