import { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

export interface DonutSlice {
  value: number;
  color: string;
  label: string;
}

const SIZE = 140;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const useStyles = makeStyles({
  svg: {
    overflow: "visible",
  },
  slice: {
    cursor: "pointer",
    transitionProperty: "opacity, stroke-width",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    outline: "none",
  },
  valueText: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    fill: tokens.colorNeutralForeground1,
    pointerEvents: "none",
  },
  labelText: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fill: tokens.colorNeutralForeground3,
    pointerEvents: "none",
  },
});

export function DonutChart({ slices, label }: { slices: DonutSlice[]; label: string }) {
  const styles = useStyles();
  const [activeSlice, setActiveSlice] = useState<DonutSlice | null>(null);
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let offset = 0;

  return (
    <svg className={styles.svg} width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label}>
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
        const isActive = activeSlice?.label === slice.label;
        const hasActiveSlice = activeSlice !== null;
        offset += dash;

        return (
          <circle
            key={slice.label}
            className={styles.slice}
            tabIndex={0}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={slice.color}
            strokeWidth={isActive ? STROKE + 2 : STROKE}
            strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
            strokeDashoffset={dashOffset}
            strokeOpacity={hasActiveSlice && !isActive ? 0.56 : 1}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            onMouseEnter={() => setActiveSlice(slice)}
            onMouseLeave={() => setActiveSlice(null)}
            onFocus={() => setActiveSlice(slice)}
            onBlur={() => setActiveSlice(null)}
            aria-label={`${slice.label}: ${slice.value}`}
          >
            <title>{`${slice.label}: ${slice.value}`}</title>
          </circle>
        );
      })}
      {activeSlice && (
        <>
          <text x="70" y="66" textAnchor="middle" className={styles.valueText}>
            {activeSlice.value}
          </text>
          <text x="70" y="82" textAnchor="middle" className={styles.labelText}>
            {activeSlice.label}
          </text>
        </>
      )}
    </svg>
  );
}
