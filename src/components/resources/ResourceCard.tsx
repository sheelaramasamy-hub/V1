import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, ProgressBar, makeStyles, tokens } from "@fluentui/react-components";
import type { BadgeProps } from "@fluentui/react-components";
import { ArrowClockwise16Regular, ArrowDownload16Regular, ArrowRight16Regular, Clock12Regular } from "@fluentui/react-icons";
import type { Resource } from "../../types/resources";
import { SurfaceCard } from "../shared/SurfaceCard";
import { liftOnHover } from "../../theme/motion";

const useStyles = makeStyles({
  /** Same 8px cover gutter as ChallengeCard and WorkshopCard, so every catalogue card in the
      product sits on one visual language. */
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
  coverWash: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    pointerEvents: "none",
  },
  statusBadge: {
    position: "absolute",
    top: tokens.spacingVerticalMNudge,
    left: tokens.spacingHorizontalMNudge,
  },
  levelBadge: {
    position: "absolute",
    top: tokens.spacingVerticalMNudge,
    right: tokens.spacingHorizontalMNudge,
  },
  /** Horizontal padding is 0 — the card's own 8px gutter already lines this content up with the
      cover's left/right edges, so text, progress bar, and link all span the same width as the
      image instead of sitting inset further than it. */
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalL} 0`,
    flexGrow: 1,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    flexGrow: 1,
  },
  categoryRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  category: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  dot: {
    width: "4px",
    height: "4px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground4,
    flexShrink: 0,
  },
  metaText: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
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
  /** Clamped to two lines so cards in the same row settle at the same internal height regardless
      of copy length. */
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  progressRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  progressValue: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  footer: {
    alignSelf: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const STATUS_LABEL: Record<"in-progress" | "completed", string> = {
  "in-progress": "In progress",
  completed: "Completed",
};

const STATUS_COLOR: Record<"in-progress" | "completed", BadgeProps["color"]> = {
  "in-progress": "brand",
  completed: "success",
};

function statusFor(progress: number): "not-started" | "in-progress" | "completed" {
  if (progress >= 100) return "completed";
  if (progress > 0) return "in-progress";
  return "not-started";
}

function actionIconFor(resource: Resource) {
  if (resource.actionLabel === "Download") return ArrowDownload16Regular;
  if (resource.actionLabel === "Watch again") return ArrowClockwise16Regular;
  return ArrowRight16Regular;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const status = statusFor(resource.progress);
  const ActionIcon = actionIconFor(resource);
  const headingId = `resource-${resource.id}`;

  return (
    <SurfaceCard as="section" className={styles.card} aria-labelledby={headingId}>
      <div className={styles.cover}>
        <img src={resource.cover} alt="" className={styles.coverImage} />
        <span className={styles.coverWash} aria-hidden="true" />
        {status !== "not-started" && (
          <Badge
            className={styles.statusBadge}
            appearance="filled"
            color={STATUS_COLOR[status]}
            size="large"
            shape="rounded"
          >
            {STATUS_LABEL[status]}
          </Badge>
        )}
        <Badge className={styles.levelBadge} appearance="filled" color="subtle" size="large" shape="rounded">
          {resource.level}
        </Badge>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <div className={styles.categoryRow}>
            <span className={styles.category}>{resource.category}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.metaText}>
              <Clock12Regular />
              {resource.meta}
            </span>
          </div>

          <h3 id={headingId} className={styles.title}>
            <Link to={`/resources/${resource.id}`} className={styles.titleLink}>
              {resource.title}
            </Link>
          </h3>

          <p className={styles.description}>{resource.description}</p>
        </div>

        {resource.progress > 0 ? (
          <div className={styles.progressRow}>
            <ProgressBar
              value={resource.progress / 100}
              thickness="medium"
              shape="rounded"
              aria-label={`${resource.title}: ${resource.progress}% complete`}
            />
            <span className={styles.progressValue}>{resource.progress}%</span>
          </div>
        ) : null}

        <Button
          className={styles.footer}
          appearance="transparent"
          icon={<ActionIcon />}
          iconPosition="after"
          onClick={() => navigate(`/resources/${resource.id}`)}
        >
          {resource.actionLabel}
        </Button>
      </div>
    </SurfaceCard>
  );
}
