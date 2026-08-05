import { Link, makeStyles, tokens } from "@fluentui/react-components";
import { recommendedItems } from "../../data/recommendations";
import { SurfaceCard } from "../shared/SurfaceCard";
import { RecommendationItem } from "./RecommendationItem";

const useStyles = makeStyles({
  /** Figma node 1643:54213 — 14px padding on the Shadow 08 elevation. */
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalMNudge,
    padding: "16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalMNudge,
  },
  /** Figma: Segoe UI Semibold 14px with -0.14px tracking. */
  heading: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: "-0.14px",
    color: tokens.colorNeutralForeground1,
  },
  /** Figma: Segoe UI Regular 10px. */
  headerLink: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      rowGap: tokens.spacingVerticalL,
    },
    "@media (max-width: 560px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export function RecommendedForYouSection() {
  const styles = useStyles();

  return (
    <SurfaceCard as="section" elevation="high" className={styles.card} aria-labelledby="recommended-heading">
      <div className={styles.header}>
        <h2 id="recommended-heading" className={styles.heading}>
          Recommended for you
        </h2>
        <Link href="#" className={styles.headerLink}>
          Learning path
        </Link>
      </div>

      <div className={styles.grid}>
        {recommendedItems.map((item) => (
          <RecommendationItem key={item.id} item={item} />
        ))}
      </div>
    </SurfaceCard>
  );
}

