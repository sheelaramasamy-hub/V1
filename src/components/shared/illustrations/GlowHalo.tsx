import { useId } from "react";

/** Soft blurred radial glow used behind every illustration in the fan family. */
export function GlowHalo({
  cx,
  cy,
  r,
  color,
  opacity = 0.5,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity?: number;
}) {
  const id = useId();

  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  );
}
