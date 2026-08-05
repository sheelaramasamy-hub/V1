import { tokens } from "@fluentui/react-components";

export interface DonutSlice {
  value: number;
  color: string;
  label: string;
}

const SIZE = 140;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Ring chart for the Tenant Segmentation card (Figma node 1620:1523 — 140px
 * ring inside a 166x172 frame). Slice colors are passed in as Fluent tokens by
 * the caller, so the chart itself owns no palette.
 */
export function DonutChart({ slices, label }: { slices: DonutSlice[]; label: string }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let offset = 0;

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label}>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={tokens.colorNeutralBackground3}
        strokeWidth={STROKE}
      />
      {slices.map((slice) => {
        const fraction = total === 0 ? 0 : slice.value / total;
        const dash = fraction * CIRCUMFERENCE;
        const dashOffset = -offset;
        offset += dash;

        return (
          <circle
            key={slice.label}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={slice.color}
            strokeWidth={STROKE}
            strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        );
      })}
    </svg>
  );
}
