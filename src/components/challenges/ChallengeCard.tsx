import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, makeStyles, tokens } from "@fluentui/react-components";
import { ChevronRight16Regular } from "@fluentui/react-icons";
import symbolMicrosoft from "../../assets/images/symbol-microsoft.svg";
import symbolCopilot from "../../assets/images/symbol-copilot.svg";
import symbolFabric from "../../assets/images/symbol-fabric.png";
import type { Challenge } from "../../types/challenges";
import { SurfaceCard } from "../shared/SurfaceCard";
import { liftOnHover } from "../../theme/motion";

const productSymbols = [
  { src: symbolMicrosoft, alt: "Microsoft" },
  { src: symbolCopilot, alt: "Copilot" },
  { src: symbolFabric, alt: "Microsoft Fabric" },
];

const useStyles = makeStyles({
  /** Figma node 1620:1639 — 8px gutter around the cover, body padding sits inside. */
  card: {
    display: "flex",
    flexDirection: "column",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS} 0`,
    ...liftOnHover,
  },
  cover: {
    position: "relative",
    width: "100%",
    aspectRatio: "401 / 246",
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  /** Figma layers a 20% white wash over the artwork to calm the gradient. */
  coverWash: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    pointerEvents: "none",
  },
  enrolledBadge: {
    position: "absolute",
    top: tokens.spacingVerticalMNudge,
    left: tokens.spacingHorizontalMNudge,
  },
  symbolRow: {
    position: "absolute",
    left: tokens.spacingHorizontalSNudge,
    bottom: tokens.spacingVerticalSNudge,
    display: "flex",
    gap: tokens.spacingHorizontalXS,
  },
  /** Figma: 32px white rounded tile holding a 16px product symbol. */
  symbolTile: {
    width: "32px",
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  symbolImage: {
    width: "16px",
    height: "16px",
    objectFit: "contain",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingVerticalL,
    flexGrow: 1,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    flexGrow: 1,
  },
  categoryRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  /** Figma: Segoe UI Regular 12/16, format in brand, category muted. */
  format: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorBrandForeground1,
  },
  category: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  dot: {
    width: "4px",
    height: "4px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground4,
    flexShrink: 0,
  },
  /** Figma: Segoe UI Semibold 18/24 in the brand foreground. */
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  titleLink: {
    color: "inherit",
    textDecorationLine: "none",
    ":hover": {
      textDecorationLine: "underline",
    },
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },
  schedule: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  pillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
  },
  /** Figma: 28px pill on colorNeutralBackground4 with a fully round radius. */
  pill: {
    height: "28px",
    display: "flex",
    alignItems: "center",
    padding: `0 ${tokens.spacingHorizontalMNudge}`,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground4,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },
  learnMoreButton: {
    minWidth: "126px",
    paddingLeft: "12px",
    paddingRight: "12px",
    justifyContent: "center",
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": {
      border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1Hover}`,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  enrollButton: {
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
});

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const goToDetail = (): void => navigate(`/tracks/${challenge.id}`);

  return (
    <SurfaceCard as="section" className={styles.card} aria-labelledby={`challenge-${challenge.id}`}>
      <div className={styles.cover}>
        <img src={challenge.cover} alt="" className={styles.coverImage} />
        <span className={styles.coverWash} aria-hidden="true" />
        {challenge.enrolled && (
          <Badge className={styles.enrolledBadge} appearance="filled" color="subtle" size="large" shape="rounded">
            Enrolled
          </Badge>
        )}
        <span className={styles.symbolRow} aria-hidden="true">
          {productSymbols.map((symbol) => (
            <span className={styles.symbolTile} key={symbol.alt}>
              <img src={symbol.src} alt="" className={styles.symbolImage} />
            </span>
          ))}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <div className={styles.categoryRow}>
            <span className={styles.format}>{challenge.format}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.category}>{challenge.category}</span>
          </div>

          <h3 id={`challenge-${challenge.id}`} className={styles.title}>
            {challenge.detail ? (
              <Link to={`/tracks/${challenge.id}`} className={styles.titleLink}>
                {challenge.title}
              </Link>
            ) : (
              challenge.title
            )}
          </h3>

          <span className={styles.schedule}>{challenge.schedule}</span>

          <div className={styles.pillRow}>
            <span className={styles.pill}>{challenge.level}</span>
            <span className={styles.pill}>
              {challenge.duration} · {challenge.participation}
            </span>
            <span className={styles.pill}>{challenge.industry}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            className={styles.learnMoreButton}
            appearance="subtle"
            icon={<ChevronRight16Regular />}
            iconPosition="before"
            disabled={!challenge.detail}
            onClick={goToDetail}
          >
            Learn More
          </Button>
          <Button className={styles.enrollButton} appearance="primary" disabled={!challenge.detail} onClick={goToDetail}>
            {challenge.ctaLabel}
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}




