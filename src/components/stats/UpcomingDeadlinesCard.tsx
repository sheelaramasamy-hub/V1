import { Link, makeStyles, mergeClasses, Subtitle2, tokens } from "@fluentui/react-components";
import { upcomingDeadlines } from "../../data/stats";
import { SurfaceCard } from "../shared/SurfaceCard";

const useStyles = makeStyles({
  card: {
    padding: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  /** Figma: 36x40 date chip on the neutral surface. */
  dateChip: {
    flexShrink: 0,
    width: "36px",
    height: "40px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  dateMonth: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: "8px",
    lineHeight: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
    color: tokens.colorNeutralForeground3,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  countdown: {
    flexShrink: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap",
  },
  countdownUrgent: {
    color: tokens.colorStatusDangerForeground1,
  },
});

export function UpcomingDeadlinesCard() {
  const styles = useStyles();

  return (
    <SurfaceCard className={styles.card}>
      <div className={styles.header}>
        <Subtitle2 as="h2">Upcoming deadlines</Subtitle2>
        <Link href="#">View all</Link>
      </div>

      <ul className={styles.list}>
        {upcomingDeadlines.map((deadline) => (
          <li className={styles.row} key={deadline.id}>
            <span className={styles.dateChip} aria-hidden="true">
              <span className={styles.dateDay}>{deadline.day}</span>
              <span className={styles.dateMonth}>{deadline.month}</span>
            </span>
            <span className={styles.body}>
              <span className={styles.title}>{deadline.title}</span>
              <span className={styles.subtitle}>{deadline.subtitle}</span>
            </span>
            <span className={mergeClasses(styles.countdown, deadline.urgent && styles.countdownUrgent)}>
              {deadline.daysRemaining} days
            </span>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}
