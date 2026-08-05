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
  },
  /**
   * Figma's three ruled lines sit well behind the data, so they are drawn as a
   * faint dashed rule rather than a solid stroke.
   */
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
  },
  bar: {
    width: "100%",
    borderRadius: `${tokens.borderRadiusSmall} ${tokens.borderRadiusSmall} 0 0`,
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
  },
});

/** Weekly hours bar chart — Figma node 1620:1559. The peak day is promoted to the solid brand fill. */
export function BarChart({ data }: { data: ActivityDay[] }) {
  const styles = useStyles();
  const max = Math.max(...data.map((day) => day.hours));
  const peak = data.reduce((best, day) => (day.hours > best.hours ? day : best), data[0]);

  return (
    <div className={styles.root}>
      <div className={styles.plot}>
        {[0, 50, 100].map((position) => (
          <span key={position} className={styles.gridline} style={{ top: `${position}%` }} aria-hidden="true" />
        ))}
        {data.map((day) => (
          <div className={styles.column} key={day.label}>
            <div
              className={styles.bar}
              style={{
                height: `${max === 0 ? 0 : (day.hours / max) * 100}%`,
                backgroundColor: day.label === peak.label ? barPalette.peak : barPalette.rest,
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.labels}>
        {data.map((day) => (
          <span className={styles.label} key={day.label}>
            {day.label}
          </span>
        ))}
      </div>
    </div>
  );
}
