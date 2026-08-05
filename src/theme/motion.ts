import { motionTokens, tokens } from "@fluentui/react-components";
import type { GriffelStyle } from "@fluentui/react-components";

/**
 * The motion vocabulary.
 *
 * Motion in this product has three jobs, and anything that does none of them is decoration:
 *
 *   1. **Feedback** — acknowledge that the product received your input.
 *   2. **Orientation** — say where something came from, or where it went.
 *   3. **Continuity** — say that the thing that just changed is the same thing that was there.
 *
 * Durations and curves come from Fluent's `motionTokens`, not from taste. The pairing of curve to
 * intent is the part worth knowing: things *entering* decelerate (they arrive and settle), things
 * *leaving* accelerate (they are gone, do not make anyone watch), and things changing in place
 * ease evenly at both ends because there is no arrival or departure to express.
 *
 * ── Not used here, deliberately ────────────────────────────────────────────────────────────
 *
 *   • Looping or idle animation. Nothing moves unless something happened.
 *   • Motion on text, headings, or body copy — it delays reading to no benefit.
 *   • Entrance animation on content that was already on screen. Re-animating on every render is
 *     the fastest way to make a product feel cheap.
 *   • Anything over 300ms in an interaction path. Past that it stops reading as responsiveness
 *     and starts reading as lag.
 *
 * Every transition here is suppressed under `prefers-reduced-motion` by the global rule in
 * `index.css`, so individual components never have to handle that themselves.
 */

export interface MotionIntent {
  /** Milliseconds — for JS-driven motion and Fluent's motion components. */
  durationMs: number;
  /** The same duration as a theme token, for CSS transitions. */
  duration: string;
  curve: string;
}

/** Acknowledging a pointer: hover, press, focus. Must feel immediate, so it is the fastest step. */
const feedback: MotionIntent = {
  durationMs: motionTokens.durationFaster,
  duration: tokens.durationFaster,
  curve: motionTokens.curveEasyEase,
};

/** Something arriving. Decelerates, so it settles rather than stopping dead. */
const enter: MotionIntent = {
  durationMs: motionTokens.durationNormal,
  duration: tokens.durationNormal,
  curve: motionTokens.curveDecelerateMid,
};

/** Something leaving. Accelerates and is quicker than `enter` — nobody waits for an exit. */
const exit: MotionIntent = {
  durationMs: motionTokens.durationFaster,
  duration: tokens.durationFaster,
  curve: motionTokens.curveAccelerateMid,
};

/** Disclosure — a panel opening, a row expanding. */
const expand: MotionIntent = {
  durationMs: motionTokens.durationNormal,
  duration: tokens.durationNormal,
  curve: motionTokens.curveEasyEaseMax,
};

export const motion = { feedback, enter, exit, expand } as const;

export type MotionIntentName = keyof typeof motion;

/**
 * A CSS transition for the given properties at the given intent.
 *
 * Always name the properties explicitly. `transition: all` animates properties you did not think
 * about — including ones that change on theme switch — and is how a hover effect ends up
 * animating a color change it had nothing to do with.
 */
export const transitionFor = (properties: string, intent: MotionIntent): GriffelStyle => ({
  transitionProperty: properties,
  transitionDuration: intent.duration,
  transitionTimingFunction: intent.curve,
});

/**
 * The standard treatment for a card-sized surface that is entirely clickable.
 *
 * One recipe rather than each card inventing its own, because inconsistent hover depth across
 * cards is legible to a viewer even when they cannot name what is wrong. The press state returns
 * to rest: pushing back down on click is the affordance that says the click registered.
 */
export const liftOnHover: GriffelStyle = {
  ...transitionFor("box-shadow, transform", feedback),

  ":hover": {
    boxShadow: tokens.shadow16,
    transform: "translateY(-2px)",
  },

  ":active": {
    transform: "translateY(0)",
    boxShadow: tokens.shadow8,
    // Snap back faster than it lifted, so the press feels like contact rather than a bounce.
    transitionDuration: tokens.durationUltraFast,
  },
};
