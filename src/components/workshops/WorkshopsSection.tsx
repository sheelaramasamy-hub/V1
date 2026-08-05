import { makeStyles, tokens } from "@fluentui/react-components";
import type { Challenge } from "../../types/challenges";
import { SurfaceCard } from "../shared/SurfaceCard";
import { EmptyWorkshopsIllustration } from "../shared/illustrations/EmptyWorkshopsIllustration";
import { ChallengeCard } from "../challenges/ChallengeCard";

const useStyles = makeStyles({
  /** Figma node 1643:54264 — a single tall panel on the larger Shadow 08 elevation. */
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXXL}`,
    minHeight: "320px",
  },
  heading: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  emptyState: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: tokens.spacingVerticalXS,
  },
  illustration: {
    marginBottom: tokens.spacingVerticalS,
  },
  emptyTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  emptyBody: {
    margin: 0,
    maxWidth: "320px",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  /** Horizontal rail, ready for real workshop cards without further layout work. */
  rail: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(320px, 1fr)",
    gap: tokens.spacingHorizontalXL,
    overflowX: "auto",
    paddingBottom: tokens.spacingVerticalS,
    scrollSnapType: "x mandatory",
  },
  railItem: {
    scrollSnapAlign: "start",
  },
});

export function WorkshopsSection({ workshops = [] }: { workshops?: Challenge[] }) {
  const styles = useStyles();

  return (
    <SurfaceCard as="section" elevation="high" className={styles.card} aria-labelledby="workshops-heading">
      <h2 id="workshops-heading" className={styles.heading}>
        Your Workshops
      </h2>

      {workshops.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.illustration}>
            <EmptyWorkshopsIllustration width={240} />
          </div>
          <p className={styles.emptyTitle}>No workshops scheduled yet</p>
          <p className={styles.emptyBody}>
            We&apos;re working on exciting sessions for you. Check back later for upcoming sessions.
          </p>
        </div>
      ) : (
        <div className={styles.rail}>
          {workshops.map((workshop) => (
            <div className={styles.railItem} key={workshop.id}>
              <ChallengeCard challenge={workshop} />
            </div>
          ))}
        </div>
      )}
    </SurfaceCard>
  );
}
