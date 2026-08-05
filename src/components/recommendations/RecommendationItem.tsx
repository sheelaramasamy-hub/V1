import { makeStyles, tokens } from "@fluentui/react-components";
import { ArrowRight12Regular } from "@fluentui/react-icons";
import learnThumbnail from "../../assets/images/learn-thumbnail.png";
import type { RecommendedItem } from "../../types/recommendations";
import { formatDuration } from "../../utils/formatters";

const useStyles = makeStyles({
  /** Figma node 1643:54221 - 66px thumbnail, 16px gap, three stacked text rows. */
  root: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "flex-start",
    minWidth: 0,
  },
  thumbnail: {
    position: "relative",
    width: "66px",
    height: "66px",
    flexShrink: 0,
    borderRadius: tokens.borderRadiusXLarge,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  thumbnailWash: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
  },
  /** Figma: 9px regular - below Fluent's smallest ramp step, so set explicitly. */
  meta: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: "9px",
    lineHeight: "13px",
    color: tokens.colorNeutralForeground3,
  },
  /** Figma: Segoe UI Semibold 12/16. */
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  /** Figma: Segoe UI Semibold 11px in the brand foreground, with a 14px trailing icon. */
  action: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    padding: 0,
    border: "none",
    background: "none",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontFamily: tokens.fontFamilyBase,
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      textDecoration: "underline",
    },
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },
});

export function RecommendationItem({ item }: { item: RecommendedItem }) {
  const styles = useStyles();
  const thumbnail = item.thumbnail ?? learnThumbnail;

  return (
    <article className={styles.root}>
      <div className={styles.thumbnail}>
        <img src={thumbnail} alt="" className={styles.thumbnailImage} />
        <span className={styles.thumbnailWash} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          {item.provider} {" "}&middot;{" "}{formatDuration(item.durationMinutes)}
        </p>
        <h3 className={styles.title}>{item.title}</h3>
        <button type="button" className={styles.action}>
          {item.actionLabel}
          <ArrowRight12Regular />
        </button>
      </div>
    </article>
  );
}

