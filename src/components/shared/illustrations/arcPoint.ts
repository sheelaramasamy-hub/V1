/** A point on a circle of `radius` around `(cx, cy)`, at `angleDeg` measured clockwise from straight up. */
export function arcPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}
