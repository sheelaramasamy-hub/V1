import { makeStyles, Subtitle2, tokens } from "@fluentui/react-components";
import { weeklyActivity, weeklyActivitySummary } from "../../data/stats";
import { SurfaceCard } from "../shared/SurfaceCard";
import { BarChart } from "./BarChart";

const useStyles = makeStyles({
  card: {
    padding: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
  },
  caption: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  /** Figma: the running total is set larger and semibold, right-aligned. */
  total: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
  trend: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorBrandForeground1,
  },
});

export function WeeklyActivityCard() {
  const styles = useStyles();

  return (
    <SurfaceCard className={styles.card}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <Subtitle2 as="h2">Weekly activity</Subtitle2>
          <span className={styles.caption}>{weeklyActivitySummary.caption}</span>
        </div>
        <span className={styles.total}>{weeklyActivitySummary.totalLabel}</span>
      </div>

      <BarChart data={weeklyActivity} />

      <span className={styles.trend}>{weeklyActivitySummary.trend}</span>
    </SurfaceCard>
  );
}
