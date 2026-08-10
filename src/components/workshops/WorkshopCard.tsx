import { Badge, Button, makeStyles, tokens } from "@fluentui/react-components";
import type { BadgeProps } from "@fluentui/react-components";
import { CalendarLtr16Regular } from "@fluentui/react-icons";
import type { Workshop } from "../../types/workshops";
import { SurfaceCard } from "../shared/SurfaceCard";
import { liftOnHover } from "../../theme/motion";

const STATUS_COLOR: Record<Workshop["status"], BadgeProps["color"]> = {
  "Live now": "danger",
  Upcoming: "informative",
  "On demand": "subtle",
};

const useStyles = makeStyles({
  /** Same 8px cover gutter as ChallengeCard and ResourceCard — one visual language across every
      catalogue card in the product. */
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
  /** Reserves space for two lines whether the title needs one or two, so a short title on one
      card and a wrapped title on its row neighbour don't leave the presenter row, schedule, and
      button sitting at different heights across the grid. */
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    minHeight: `calc(${tokens.lineHeightBase500} * 2)`,
  },
  presenterRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  presenterAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    flexShrink: 0,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: "#ffffff",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
  },
  presenterCopy: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  presenterName: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  presenterRole: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  scheduleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  footer: {
    width: "100%",
    justifyContent: "center",
  },
});

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const styles = useStyles();

  return (
    <SurfaceCard as="section" className={styles.card} aria-labelledby={`workshop-${workshop.id}`}>
      <div className={styles.cover}>
        <img src={workshop.cover} alt="" className={styles.coverImage} />
        <span className={styles.coverWash} aria-hidden="true" />
        <Badge
          className={styles.statusBadge}
          appearance="filled"
          color={STATUS_COLOR[workshop.status]}
          size="large"
          shape="rounded"
        >
          {workshop.status}
        </Badge>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{workshop.category}</span>

          <h3 id={`workshop-${workshop.id}`} className={styles.title}>
            {workshop.title}
          </h3>

          <div className={styles.presenterRow}>
            <span className={styles.presenterAvatar} aria-hidden="true">
              {workshop.presenterInitials}
            </span>
            <div className={styles.presenterCopy}>
              <span className={styles.presenterName}>{workshop.presenterName}</span>
              <span className={styles.presenterRole}>Microsoft subject matter expert</span>
            </div>
          </div>

          <span className={styles.scheduleRow}>
            <CalendarLtr16Regular />
            {workshop.date}
          </span>
        </div>

        <Button
          className={styles.footer}
          appearance={workshop.status === "Live now" ? "primary" : "secondary"}
          size="large"
        >
          {workshop.actionLabel}
        </Button>
      </div>
    </SurfaceCard>
  );
}
