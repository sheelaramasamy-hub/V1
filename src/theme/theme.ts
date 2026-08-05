import { createDarkTheme, createLightTheme, type Theme } from "@fluentui/react-components";
import { hackableGreen } from "./brandRamp";

export const appLightTheme: Theme = {
  ...createLightTheme(hackableGreen),
};

export const appDarkTheme: Theme = {
  ...createDarkTheme(hackableGreen),
  // Fluent's own dark-theme guidance: the generated brand foreground sits too
  // dark against dark surfaces for comfortable reading, so it's re-pointed at
  // lighter ramp stops than createDarkTheme's default (ramp[100]/[110]).
  colorBrandForeground1: hackableGreen[110],
  colorBrandForeground2: hackableGreen[120],
};

/**
 * Layout tokens that Fluent's Theme object doesn't own but the shell needs
 * consistently across components. Values below are pulled directly from the
 * Figma shell (node 1620:1469) rather than guessed:
 *  - Suite header height: 48px, side nav width: 68px
 *  - Content frame uses a fluid width (not a centered max-width column) with
 *    a consistent 40px horizontal gutter and 32px vertical rhythm between
 *    major sections.
 */
export const layoutTokens = {
  topBarHeight: "48px",
  sideNavWidth: "68px",
  contentPaddingInline: "40px",
  contentPaddingBlockStart: "40px",
  contentPaddingBlockEnd: "48px",
  sectionGap: "16px",
  /** Height of the sticky in-page section nav on a detail page. */
  sectionNavHeight: "44px",
  /**
   * Distance a section keeps from the top of the viewport when jumped to — clears the sticky top
   * bar plus the floating section nav sitting below it.
   */
  sectionScrollMargin: "128px",
} as const;

