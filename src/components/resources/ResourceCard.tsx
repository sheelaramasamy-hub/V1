import { Badge, Button, ProgressBar, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowRight16Regular, Clock12Regular } from "@fluentui/react-icons";
import type { Resource } from "../../types/resources";
import { SurfaceCard } from "../shared/SurfaceCard";
import { liftOnHover } from "../../theme/motion";

const useStyles = makeStyles({
  /** Same 8px cover gutter as ChallengeCard, so the two catalogues sit on one visual language. */
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
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalL,
    flexGrow: 1,
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    flexGrow: 1,
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
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
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
  metaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
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
  progressValue: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  footer: {
    alignSelf: "flex-start",
    paddingLeft: 0,
  },
});

const STATUS_LABEL: Record<"not-started" | "in-progress" | "completed", string> = {
  "not-started": "",
  "in-progress": "In progress",
  completed: "Completed",
};

function statusFor(progress: number): "not-started" | "in-progress" | "completed" {
  if (progress >= 100) return "completed";
  if (progress > 0) return "in-progress";
  return "not-started";
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const styles = useStyles();
  const status = statusFor(resource.progress);

  return (
    <SurfaceCard as="section" className={styles.card} aria-labelledby={`resource-${resource.id}`}>
      <div className={styles.cover}>
        <img src={resource.cover} alt="" className={styles.coverImage} />
        <span className={styles.coverWash} aria-hidden="true" />
        {status !== "not-started" && (
          <Badge className={styles.statusBadge} appearance="filled" color="subtle" size="large" shape="rounded">
            {STATUS_LABEL[status]}
          </Badge>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{resource.category}</span>

          <h3 id={`resource-${resource.id}`} className={styles.title}>
            {resource.title}
          </h3>

          <p className={styles.description}>{resource.description}</p>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaText}>
            <Clock12Regular />
            {resource.meta}
          </span>
          {resource.progress > 0 ? <span className={styles.progressValue}>{resource.progress}%</span> : null}
        </div>

        <ProgressBar value={resource.progress / 100} thickness="medium" shape="rounded" />

        <Button
          className={styles.footer}
          appearance="transparent"
          icon={<ArrowRight16Regular />}
          iconPosition="after"
        >
          {resource.actionLabel}
        </Button>
      </div>
    </SurfaceCard>
  );
}
