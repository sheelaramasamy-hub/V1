/**
 * Math for the "fanned glass cards" motif that runs through every illustration
 * in the app (welcome banner, About Your Hackathon, Workshops empty state) —
 * the same visual grammar as the folded-panel artwork Microsoft uses across
 * Fabric marketing surfaces: a hand of translucent rounded panels radiating
 * from a single pivot point, growing and rotating across the sweep.
 *
 * Kept as pure math (no color, no JSX) so every placement can restyle freely
 * while staying geometrically part of the same family.
 */
export interface FanCardSpec {
  /** Rotation in degrees around the pivot; card grows "upward" before rotating. */
  rotation: number;
  /** Card height, tallest at the center of the sweep. */
  height: number;
  /** Gap between the pivot and the near edge of the card. */
  riseOffset: number;
  /** 0 at the first card, 1 at the last — handy for gradient/opacity interpolation. */
  t: number;
}

export function buildFanCards({
  count,
  startAngle,
  endAngle,
  minHeight,
  maxHeight,
  riseOffset,
}: {
  count: number;
  startAngle: number;
  endAngle: number;
  minHeight: number;
  maxHeight: number;
  riseOffset: number;
}): FanCardSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const rotation = startAngle + (endAngle - startAngle) * t;
    // Cards nearest the middle of the sweep read as "closest" and stand tallest.
    const centerBias = 1 - Math.abs(t - 0.5) * 2;
    const height = minHeight + (maxHeight - minHeight) * centerBias;
    return { rotation, height, riseOffset, t };
  });
}
