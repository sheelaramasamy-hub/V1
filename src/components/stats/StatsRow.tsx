import { makeStyles, tokens } from "@fluentui/react-components";
import { TenantSegmentationCard } from "./TenantSegmentationCard";
import { WeeklyActivityCard } from "./WeeklyActivityCard";
import { UpcomingDeadlinesCard } from "./UpcomingDeadlinesCard";

const useStyles = makeStyles({
  /**
   * Figma node 1620:1517 lays these out at roughly 453 / 354 / 453 across the
   * content frame, so the outer cards get slightly more room than the chart.
   */
  root: {
    display: "grid",
    gridTemplateColumns: "1.28fr 1fr 1.28fr",
    gap: tokens.spacingHorizontalM,
    alignItems: "stretch",
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "@media (max-width: 700px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export function StatsRow() {
  const styles = useStyles();

  return (
    <section className={styles.root} aria-label="Programme overview">
      <TenantSegmentationCard />
      <WeeklyActivityCard />
      <UpcomingDeadlinesCard />
    </section>
  );
}
