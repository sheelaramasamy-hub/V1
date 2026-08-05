import { tokens } from "@fluentui/react-components";
import type { SegmentStatus } from "../types/stats";

/**
 * Categorical palette for data visualisation, expressed through Fluent semantic
 * tokens so the non-requested charts continue to follow the active theme.
 */
export const segmentPalette: Record<SegmentStatus, string> = {
  notStarted: tokens.colorNeutralStroke1,
  inProgress: tokens.colorStatusWarningBackground3,
  submitted: tokens.colorPaletteBlueBorderActive,
  completed: tokens.colorStatusSuccessBackground3,
};

/** Weekly activity colors matched to the Figma reference screenshot. */
export const barPalette = {
  rest: "#8fb7ba",
  peak: "#245f68",
  gridline: "rgba(36, 95, 104, 0.12)",
} as const;
