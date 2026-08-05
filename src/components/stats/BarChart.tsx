import { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { barPalette } from "../../theme/chartPalette";
import type { ActivityDay } from "../../types/stats";

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  plot: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    gap: tokens.spacingHorizontalS,
    height: "120px",
    overflow: "visible",
  },
  gridline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 0,
    borderTop: `${tokens.strokeWidthThin} dashed ${barPalette.gridline}`,
  },
  column: {
    position: "relative",
    flex: 1,
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    padding: 0,
    border: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: tokens.borderRadiusSmall,
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },
  bar: {
    width: "100%",
    borderRadius: `${tokens.borderRadiusSmall} ${tokens.borderRadiusSmall} 0 0`,
    transitionProperty: "opacity, background-color",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  dataLabel: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -100%)",
    padding: `0 ${tokens.spacingHorizontalXXS}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  labels: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    color: tokens.colorNeutralForeground3,
    transitionProperty: "color, font-weight",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
  },
});

export function BarChart({ data }: { data: ActivityDay[] }) {
  const styles = useStyles();
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const max = Math.max(...data.map((day) => day.hours));
  const peak = data.reduce((best, day) => (day.hours > best.hours ? day : best), data[0]);

  return (
    <div className={styles.root}>
      <div className={styles.plot}>
        {[0, 50, 100].map((position) => (
          <span key={position} className={styles.gridline} style={{ top: `${position}%` }} aria-hidden="true" />
        ))}
        {data.map((day) => {
          const isActive = activeDay === day.label;
          const hasActiveDay = activeDay !== null;
          const heightPercent = max === 0 ? 0 : (day.hours / max) * 100;

          return (
            <button
              type="button"
              className={styles.column}
              key={day.label}
              title={`${day.label}: ${day.hours} hours`}
              aria-label={`${day.label}: ${day.hours} hours invested`}
              onMouseEnter={() => setActiveDay(day.label)}
              onMouseLeave={() => setActiveDay(null)}
              onFocus={() => setActiveDay(day.label)}
              onBlur={() => setActiveDay(null)}
            >
              {isActive && (
                <span className={styles.dataLabel} style={{ bottom: `calc(${heightPercent}% + 4px)` }}>
                  {day.hours}h
                </span>
              )}
              <span
                className={styles.bar}
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: day.label === peak.label ? barPalette.peak : barPalette.rest,
                  opacity: hasActiveDay && !isActive ? 0.58 : 1,
                }}
              />
            </button>
          );
        })}
      </div>
      <div className={styles.labels}>
        {data.map((day) => {
          const isActive = activeDay === day.label;

          return (
            <span
              className={styles.label}
              key={day.label}
              style={{
                color: isActive ? tokens.colorBrandForeground1 : undefined,
                fontWeight: isActive ? tokens.fontWeightSemibold : undefined,
              }}
            >
              {day.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
