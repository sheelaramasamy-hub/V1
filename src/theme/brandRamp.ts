import type { BrandVariants } from "@fluentui/react-components";

/**
 * The single source of brand color for the app. Fluent derives every brand
 * token (colorBrandBackground, colorBrandForeground1, colorCompoundBrandStroke,
 * hover/pressed/selected variants, and their dark-theme counterparts) from this
 * ramp, so nothing outside this file should ever hardcode a brand color.
 *
 * Shade 80 is the exact value the Figma file's own design tokens resolve to
 * (`colorBrandBackground` / `colorBrandForeground1` = #117865, verified via
 * get_variable_defs on node 1620:1469). The remaining stops are interpolated in
 * HSL space around that anchor — regenerate with scripts/generate-brand-ramp.mjs.
 */
export const hackableGreen: BrandVariants = {
  10: "#041B17",
  20: "#062822",
  30: "#08362D",
  40: "#094338",
  50: "#0B5044",
  60: "#0D5E4F",
  70: "#0F6B5A",
  80: "#117865",
  90: "#148F78",
  100: "#19B396",
  110: "#1ED6B4",
  120: "#43E4C7",
  130: "#70EBD4",
  140: "#9DF1E2",
  150: "#C5F7EE",
  160: "#E9FCF8",
};
