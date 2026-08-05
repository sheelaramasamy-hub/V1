/** Minimal abstract figure — carries the "people collaborating" beat of the banner without literal illustration. */
export function PersonSilhouette({
  x,
  y,
  scale = 1,
  color,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  color: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <circle cx="0" cy="0" r="5" fill={color} />
      <path d="M-7 26c0-9 3.2-16 7-16s7 7 7 16Z" fill={color} />
    </g>
  );
}
