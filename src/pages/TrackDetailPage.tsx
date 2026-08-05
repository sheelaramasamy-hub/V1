import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowRight16Regular,
  Apps20Regular,
  BookOpen20Regular,
  Building20Regular,
  CalendarClock20Regular,
  CalendarLtr20Regular,
  Certificate20Regular,
  Checkmark16Regular,
  Clock20Regular,
  Cube20Regular,
  Grid20Regular,
  Lightbulb20Regular,
  Person20Regular,
  PeopleTeam20Regular,
  TaskListSquareLtr20Regular,
  Trophy20Regular,
} from "@fluentui/react-icons";
import type { FluentIcon } from "@fluentui/react-icons";
import symbolMicrosoft from "../assets/images/symbol-microsoft.svg";
import symbolCopilot from "../assets/images/symbol-copilot.svg";
import symbolFabric from "../assets/images/symbol-fabric.png";
import hackableMark from "../assets/images/hackable-mark.svg";
import { catalogChallenges } from "../data/catalog";
import type { Track } from "../types/trackDetail";
import { CardGrid } from "../components/shared/CardGrid";
import { CheckList } from "../components/shared/CheckList";
import { CtaPanel } from "../components/shared/CtaPanel";
import { DetailHero } from "../components/shared/DetailHero";
import { FactCardRow, type Fact } from "../components/shared/FactCardRow";
import { LinkCard } from "../components/shared/LinkCard";
import { NumberedSteps } from "../components/shared/NumberedSteps";
import { ProgressMeter } from "../components/shared/ProgressMeter";
import { SectionCard } from "../components/shared/SectionCard";
import { SectionNav, type SectionNavItem } from "../components/shared/SectionNav";
import { StepList, type Step } from "../components/shared/StepList";
import { Tag } from "../components/shared/Tag";
import { layoutTokens } from "../theme/theme";
import { formatDuration, formatFullDate, formatRelativeDays, formatShortDateRange } from "../utils/formatters";

const productSymbols = [
  { src: symbolMicrosoft, alt: "Microsoft" },
  { src: symbolCopilot, alt: "Copilot" },
  { src: symbolFabric, alt: "Microsoft Fabric" },
];

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: layoutTokens.sectionGap,
  },
  markTile: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  markImage: {
    width: "18px",
    height: "18px",
    objectFit: "contain",
  },
  markRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  asideLine: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground3,
  },
  asideIcon: {
    display: "flex",
    fontSize: "16px",
  },
  asideText: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  quote: {
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  quoteText: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    fontStyle: "italic",
    color: tokens.colorNeutralForeground2,
  },
  bodyText: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },
  smallText: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  trackCard: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  trackHeadRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
  },
  trackCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  trackEyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  trackTitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  trackSubtitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
  },
  xpBadgeWrap: {
    display: "flex",
  },
  milestoneRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  processLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 360px) minmax(0, 1fr)",
    gap: "16px",
    alignItems: "stretch",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  processVisual: {
    position: "relative",
    minHeight: "220px",
    borderRadius: tokens.borderRadiusLarge,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden",
    boxShadow: tokens.shadow8,
  },
  visualGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(circle, ${tokens.colorNeutralStroke2} 1px, transparent 1px)`,
    backgroundSize: "18px 18px",
    opacity: 0.42,
  },
  processRing: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "180px",
    height: "180px",
    borderRadius: tokens.borderRadiusCircular,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke2}`,
    transform: "translate(-50%, -50%) rotate(-16deg)",
    opacity: 0.42,
  },
  processCore: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "72px",
    height: "72px",
    borderRadius: tokens.borderRadiusCircular,
    transform: "translate(-50%, -50%)",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  processCoreImage: {
    width: "34px",
    height: "34px",
  },
  processNode: {
    position: "absolute",
    width: "52px",
    height: "52px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow8,
    color: tokens.colorBrandForeground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },
  processNodeOne: {
    left: "32px",
    top: "32px",
  },
  processNodeTwo: {
    right: "36px",
    top: "48px",
  },
  processNodeThree: {
    left: "58px",
    bottom: "34px",
  },
  productOrbit: {
    position: "absolute",
    right: "24px",
    bottom: "24px",
    display: "flex",
    gap: tokens.spacingHorizontalXS,
  },
  productTile: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "16px",
    height: "16px",
    objectFit: "contain",
  },
  trackSectionGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 340px)",
    gap: "16px",
    alignItems: "stretch",
    "@media (max-width: 980px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  trackColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0,
  },
  trackVisual: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minHeight: "300px",
    borderRadius: tokens.borderRadiusLarge,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    overflow: "hidden",
  },
  trackCover: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.16,
  },
  trackVisualWash: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(145deg, ${tokens.colorNeutralBackground1} 8%, ${tokens.colorBrandBackground2} 100%)`,
  },
  trackCore: {
    position: "absolute",
    left: "50%",
    top: "38%",
    transform: "translate(-50%, -50%)",
    width: "80px",
    height: "80px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  trackCoreImage: {
    width: "38px",
    height: "38px",
  },
  trackMetric: {
    position: "relative",
    zIndex: 1,
    margin: "auto 16px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    padding: "12px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  trackMetricValue: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  trackMetricLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  trackIconStrip: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  trackNode: {
    position: "absolute",
    width: "44px",
    height: "44px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
    fontSize: "18px",
  },
  trackNodeOne: {
    left: "30px",
    top: "36px",
  },
  trackNodeTwo: {
    right: "32px",
    top: "46px",
  },
  trackNodeThree: {
    right: "88px",
    bottom: "116px",
  },
});

/** Milestone status maps to step status; only "complete" and "upcoming" occur without a live server. */
function stepStatusFor(isCompleted: boolean, isNext: boolean): Step["status"] {
  if (isCompleted) return "complete";
  if (isNext) return "current";
  return "upcoming";
}

function processIconFor(title: string): FluentIcon {
  const normalized = title.toLowerCase();

  if (normalized.includes("register") || normalized.includes("profile")) {
    return Person20Regular;
  }

  if (normalized.includes("certify")) {
    return Certificate20Regular;
  }

  if (normalized.includes("win") || normalized.includes("present")) {
    return Trophy20Regular;
  }

  if (normalized.includes("progress")) {
    return TaskListSquareLtr20Regular;
  }

  if (normalized.includes("team")) {
    return PeopleTeam20Regular;
  }

  return Cube20Regular;
}

interface VisualProcessStep {
  title: string;
  description: string;
  icon: FluentIcon;
}

function ProductIconStrip({ className }: { className?: string }) {
  const styles = useStyles();

  return (
    <div className={className ?? styles.trackIconStrip} aria-hidden="true">
      {productSymbols.map((symbol) => (
        <span className={styles.productTile} key={symbol.alt}>
          <img src={symbol.src} alt="" className={styles.productImage} />
        </span>
      ))}
    </div>
  );
}

function ProcessIllustration({ steps }: { steps: VisualProcessStep[] }) {
  const styles = useStyles();
  const [first, second, third] = steps;
  const FirstIcon = first?.icon ?? Person20Regular;
  const SecondIcon = second?.icon ?? Cube20Regular;
  const ThirdIcon = third?.icon ?? Trophy20Regular;

  return (
    <div className={styles.processVisual} aria-hidden="true">
      <div className={styles.visualGrid} />
      <div className={styles.processRing} />
      <span className={`${styles.processNode} ${styles.processNodeOne}`}>
        <FirstIcon />
      </span>
      <span className={`${styles.processNode} ${styles.processNodeTwo}`}>
        <SecondIcon />
      </span>
      <span className={`${styles.processNode} ${styles.processNodeThree}`}>
        <ThirdIcon />
      </span>
      <span className={styles.processCore}>
        <img src={hackableMark} alt="" className={styles.processCoreImage} />
      </span>
      <ProductIconStrip className={styles.productOrbit} />
    </div>
  );
}

function TrackIllustration({
  cover,
  completedCount,
  totalCount,
}: {
  cover: string;
  completedCount: number;
  totalCount: number;
}) {
  const styles = useStyles();

  return (
    <div className={styles.trackVisual} aria-hidden="true">
      <img src={cover} alt="" className={styles.trackCover} />
      <div className={styles.trackVisualWash} />
      <div className={styles.visualGrid} />
      <span className={`${styles.trackNode} ${styles.trackNodeOne}`}>
        <TaskListSquareLtr20Regular />
      </span>
      <span className={`${styles.trackNode} ${styles.trackNodeTwo}`}>
        <CalendarClock20Regular />
      </span>
      <span className={`${styles.trackNode} ${styles.trackNodeThree}`}>
        <Trophy20Regular />
      </span>
      <span className={styles.trackCore}>
        <img src={hackableMark} alt="" className={styles.trackCoreImage} />
      </span>
      <div className={styles.trackMetric}>
        <div>
          <div className={styles.trackMetricValue}>{completedCount}/{totalCount}</div>
          <div className={styles.trackMetricLabel}>Milestones</div>
        </div>
        <ProductIconStrip />
      </div>
    </div>
  );
}

export function TrackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const styles = useStyles();

  const challenge = id ? catalogChallenges.find((candidate) => candidate.id === id) : undefined;

  const [enrolledTrackId, setEnrolledTrackId] = useState<string | undefined>(() =>
    challenge?.enrolled ? challenge.detail?.tracks[0]?.id : undefined,
  );
  const [completedByTrack, setCompletedByTrack] = useState<Record<string, string[]>>(() => {
    const firstTrack = challenge?.enrolled ? challenge.detail?.tracks[0] : undefined;
    const firstMilestone = firstTrack?.milestones[0];
    return firstTrack && firstMilestone ? { [firstTrack.id]: [firstMilestone.id] } : {};
  });

  if (!challenge || !challenge.detail) {
    return <Navigate to="/tracks" replace />;
  }

  const detail = challenge.detail;
  const enrolledTrack = detail.tracks.find((track) => track.id === enrolledTrackId);
  const completed = new Set(completedByTrack[enrolledTrackId ?? ""] ?? []);
  const nextMilestone = enrolledTrack?.milestones.find((milestone) => !completed.has(milestone.id));
  const progress = enrolledTrack
    ? {
        completed: completed.size,
        total: enrolledTrack.milestones.length,
        percent: enrolledTrack.milestones.length === 0 ? 0 : (completed.size / enrolledTrack.milestones.length) * 100,
        next: nextMilestone,
      }
    : undefined;

  const registrationOpen = challenge.registrationClosesAt ? new Date() < challenge.registrationClosesAt : true;

  const toggleMilestone = (trackId: string, milestoneId: string): void => {
    setCompletedByTrack((current) => {
      const set = new Set(current[trackId] ?? []);
      if (set.has(milestoneId)) {
        set.delete(milestoneId);
      } else {
        set.add(milestoneId);
      }
      return { ...current, [trackId]: [...set] };
    });
  };

  const enrol = (trackId: string): void => {
    setEnrolledTrackId(trackId);
    setCompletedByTrack((current) => (current[trackId] ? current : { ...current, [trackId]: [] }));
  };

  const withdraw = (): void => {
    setEnrolledTrackId(undefined);
  };

  const advanceNext = (): void => {
    if (enrolledTrackId && progress?.next) {
      toggleMilestone(enrolledTrackId, progress.next.id);
    } else if (!enrolledTrackId && detail.tracks[0]) {
      enrol(detail.tracks[0].id);
    }
  };

  const facts: Fact[] = [
    {
      id: "duration",
      label: "Duration",
      value: `${challenge.duration} · ${challenge.participation}`,
      icon: Clock20Regular,
    },
    {
      id: "audience",
      label: "Audience",
      value: `${challenge.level} · ${challenge.industry}`,
      icon: challenge.participation === "Team" ? PeopleTeam20Regular : Person20Regular,
    },
    {
      id: "format",
      label: "Format",
      value: `${challenge.format} · Online`,
      icon: Apps20Regular,
    },
    {
      id: "technologies",
      label: "Technologies",
      value: `${detail.techTags.length} services`,
      icon: Cube20Regular,
    },
  ];

  const hasOutcomes = detail.deliverables.length > 0 || detail.prizes.length > 0;
  const hasAudience = Boolean(detail.intendedAudience) || detail.prerequisites.length > 0;
  const related = detail.relatedIds
    .map((relatedId) => catalogChallenges.find((candidate) => candidate.id === relatedId))
    .filter((item): item is NonNullable<typeof item> => Boolean(item && item.detail));

  const navItems: SectionNavItem[] = [
    { id: "scenario", label: "Challenge Scenario" },
    { id: "learn", label: "What You'll Learn" },
    ...(hasOutcomes ? [{ id: "outcomes", label: "Expected Outcomes" }] : []),
    { id: "technology", label: "Technology Stack" },
    ...(hasAudience ? [{ id: "audience", label: "Prerequisites" }] : []),
    { id: "tracks", label: "Tracks" },
    { id: "process", label: "Event Process" },
    ...(related.length > 0 ? [{ id: "related", label: "Related" }] : []),
  ];

  const learningPoints = [
    ...new Set(detail.tracks.flatMap((track) => track.milestones.map((milestone) => milestone.title))),
  ];
  const totalMilestones = detail.tracks.reduce((sum, track) => sum + track.milestones.length, 0);
  const processSteps = detail.processSteps.map((step) => ({ ...step, icon: processIconFor(step.title) }));
  const visualTrack = enrolledTrack ?? detail.tracks[0];
  const visualTrackCompleted = enrolledTrack && progress ? progress.completed : 0;
  const visualTrackTotal = visualTrack?.milestones.length ?? 0;

  return (
    <div className={styles.root}>
      <DetailHero
        visualSrc={challenge.cover}
        breadcrumb={
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbItem>
              <BreadcrumbButton onClick={() => navigate("/")}>Dashboard</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton onClick={() => navigate("/tracks")}>Digital Catalog</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton current>{challenge.title}</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        mark={
          <div className={styles.markRow} aria-hidden="true">
            {productSymbols.map((symbol) => (
              <span className={styles.markTile} key={symbol.alt}>
                <img src={symbol.src} alt="" className={styles.markImage} />
              </span>
            ))}
          </div>
        }
        status={
          <>
            {enrolledTrackId ? (
              <Badge appearance="filled" color="subtle" size="large" shape="rounded">
                Enrolled
              </Badge>
            ) : null}
            <Tag>{challenge.format}</Tag>
            <Tag>{challenge.category}</Tag>
          </>
        }
        title={challenge.title}
        description={detail.scenarioBody[0]}
        chips={
          <>
            <Tag>{detail.code}</Tag>
            <Tag>{challenge.level}</Tag>
            <Tag>{`${challenge.duration} · ${challenge.participation}`}</Tag>
            <Tag icon={<Building20Regular />}>{challenge.industry}</Tag>
            <Tag>{challenge.format}</Tag>
          </>
        }
        facts={<FactCardRow facts={facts} columns="four" ariaLabel="Key facts" />}
        actions={
          enrolledTrackId ? (
            <Button appearance="secondary" size="large" onClick={withdraw}>
              Unenroll
            </Button>
          ) : registrationOpen ? (
            <Button appearance="primary" size="large" onClick={() => enrol(detail.tracks[0].id)}>
              Enroll
            </Button>
          ) : (
            <Badge appearance="outline" color="informative" size="large" shape="rounded">
              Registration closed
            </Badge>
          )
        }
        aside={
          challenge.startsAt && challenge.endsAt && challenge.registrationClosesAt ? (
            <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS, alignItems: "flex-end" }}>
              <span className={styles.asideLine}>
                <span className={styles.asideIcon} aria-hidden="true">
                  <CalendarLtr20Regular />
                </span>
                <span
                  className={styles.asideText}
                  title={`${formatFullDate(challenge.startsAt)} — ${formatFullDate(challenge.endsAt)}`}
                >
                  {formatShortDateRange(challenge.startsAt, challenge.endsAt)} · starts{" "}
                  {formatRelativeDays(challenge.startsAt)}
                </span>
              </span>
              <span className={styles.asideLine}>
                <span className={styles.asideIcon} aria-hidden="true">
                  <Certificate20Regular />
                </span>
                <span className={styles.asideText}>
                  {registrationOpen
                    ? `Registration closes ${formatRelativeDays(challenge.registrationClosesAt)}`
                    : "Registration closed"}
                </span>
              </span>
            </div>
          ) : null
        }
      />

      <SectionNav
        items={navItems}
        ariaLabel="On this page"
        action={
          <Button appearance="primary" icon={<ArrowRight16Regular />} iconPosition="after" onClick={advanceNext}>
            Start Challenge
          </Button>
        }
      />

      <SectionCard id="scenario" title="Challenge Scenario" icon={Lightbulb20Regular}>
        <div className={styles.quote}>
          <p className={styles.quoteText}>{detail.scenarioQuote}</p>
        </div>
        {detail.scenarioBody.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={styles.bodyText}>
            {paragraph}
          </p>
        ))}
      </SectionCard>

      <SectionCard
        id="learn"
        title="What You'll Learn"
        description={`Drawn from ${totalMilestones} milestones across ${detail.tracks.length} ${
          detail.tracks.length === 1 ? "track" : "tracks"
        }.`}
        icon={BookOpen20Regular}
      >
        <CheckList items={learningPoints} columns="two" ariaLabel="What you'll learn" />
      </SectionCard>

      {hasOutcomes ? (
        <SectionCard
          id="outcomes"
          title="Expected Outcomes"
          description="What exists at the end of the event."
          icon={Trophy20Regular}
        >
          <FactCardRow
            appearance="plain"
            columns="two"
            ariaLabel="Expected outcomes"
            facts={[
              ...(detail.deliverables.length > 0
                ? [
                    {
                      id: "deliverables",
                      label: "You will have built",
                      icon: TaskListSquareLtr20Regular,
                      value: <CheckList items={detail.deliverables} ariaLabel="Deliverables" />,
                    },
                  ]
                : []),
              ...(detail.prizes.length > 0
                ? [
                    {
                      id: "recognition",
                      label: "Recognition",
                      icon: Trophy20Regular,
                      value: <CheckList items={detail.prizes} icon={Trophy20Regular} ariaLabel="Recognition" />,
                    },
                  ]
                : []),
            ]}
          />
        </SectionCard>
      ) : null}

      <SectionCard
        id="technology"
        title="Technology Stack"
        description="Pre-provisioned services and tools available inside the skilling sandbox. Participants explore each technology hands-on with scoped credentials and guided checkpoints."
        icon={Cube20Regular}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalXS }}>
          <Tag tone="brand">{challenge.industry}</Tag>
          {detail.techTags.map((tag) => (
            <Tag key={tag} tone="brand">
              {tag}
            </Tag>
          ))}
        </div>
      </SectionCard>

      {hasAudience ? (
        <SectionCard id="audience" title="Who Should Attend & Prerequisites" icon={Person20Regular}>
          <FactCardRow
            appearance="plain"
            columns="two"
            ariaLabel="Audience and prerequisites"
            facts={[
              ...(detail.intendedAudience
                ? [
                    {
                      id: "audience",
                      label: "Intended audience",
                      icon: Person20Regular,
                      value: (
                        <>
                          {detail.intendedAudience}
                          <br />
                          <br />
                          Ideal for partner skilling programmes, customer enablement sessions, and internal
                          Microsoft technical readiness tracks.
                        </>
                      ),
                    },
                  ]
                : []),
              ...(detail.prerequisites.length > 0
                ? [
                    {
                      id: "prerequisites",
                      label: "Entry requirements",
                      icon: Checkmark16Regular,
                      value: (
                        <CheckList
                          items={detail.prerequisites}
                          icon={Checkmark16Regular}
                          ariaLabel="Entry requirements"
                        />
                      ),
                    },
                  ]
                : []),
            ]}
          />
        </SectionCard>
      ) : null}

      <SectionCard
        id="tracks"
        title={enrolledTrack ? "Your Track" : "Choose a Track"}
        description="Enrolling means picking one track. Progress is tracked per track."
        icon={Cube20Regular}
      >
        <div className={styles.trackSectionGrid}>
          <div className={styles.trackColumn}>
            {enrolledTrack && progress ? (
              <div className={styles.trackCard}>
                <div className={styles.trackHeadRow}>
                  <div className={styles.trackCopy}>
                    <span className={styles.trackEyebrow}>
                      Track {enrolledTrack.index} · {enrolledTrack.subtitle}
                    </span>
                    <h3 className={styles.trackTitle}>{enrolledTrack.title}</h3>
                  </div>
                  <Button appearance="subtle" onClick={withdraw}>
                    Withdraw
                  </Button>
                </div>

                <ProgressMeter
                  percent={progress.percent}
                  label="Milestones complete"
                  caption={`${progress.completed} of ${progress.total}`}
                />

                <StepList
                  ariaLabel={`Track ${enrolledTrack.index} milestones`}
                  steps={enrolledTrack.milestones.map((milestone, index) => {
                    const isCompleted = completed.has(milestone.id);
                    const isNext = progress.next?.id === milestone.id;
                    return {
                      id: milestone.id,
                      title: milestone.title,
                      status: stepStatusFor(isCompleted, isNext),
                      meta: (
                        <div className={styles.milestoneRow}>
                          <span className={styles.metaItem}>≈{formatDuration(milestone.estimateMinutes)}</span>
                          {index === 0 && milestone.xp ? (
                            <span className={styles.xpBadgeWrap}>
                              <Badge appearance="tint" color="warning" size="small">
                                {milestone.xp} XP
                              </Badge>
                            </span>
                          ) : null}
                          <Button
                            appearance="subtle"
                            size="small"
                            onClick={() => toggleMilestone(enrolledTrack.id, milestone.id)}
                          >
                            {isCompleted ? "Reset" : "Advance"}
                          </Button>
                        </div>
                      ),
                    };
                  })}
                />
              </div>
            ) : null}

            {detail.tracks
              .filter((track) => track.id !== enrolledTrack?.id)
              .map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  canEnrol={registrationOpen}
                  isEnrolledElsewhere={Boolean(enrolledTrack)}
                  onEnrol={() => enrol(track.id)}
                />
              ))}
          </div>

          <TrackIllustration cover={challenge.cover} completedCount={visualTrackCompleted} totalCount={visualTrackTotal} />
        </div>
      </SectionCard>

      <SectionCard id="process" title={detail.processTitle} description={detail.processDescription} icon={CalendarClock20Regular}>
        <div className={styles.processLayout}>
          <ProcessIllustration steps={processSteps} />
          <NumberedSteps steps={processSteps} ariaLabel={`How ${challenge.format} events run`} />
        </div>
      </SectionCard>

      {related.length > 0 ? (
        <SectionCard id="related" title="Related Catalog Items" description="Same program or the same theme." icon={Grid20Regular}>
          <CardGrid>
            {related.map((item) => (
              <LinkCard key={item.id} eyebrow={item.detail?.code} title={item.title} to={`/tracks/${item.id}`} />
            ))}
          </CardGrid>
        </SectionCard>
      ) : null}

      <CtaPanel
        title="Ready to run this event?"
        description="Launch a skilling sandbox to preview the participant experience, or request a partner hackathon with your Microsoft skilling team."
        actions={
          <>
            <Button
              appearance="primary"
              size="large"
              onClick={advanceNext}
              disabled={Boolean(enrolledTrackId) && !progress?.next}
            >
              Launch Skilling Sandbox
            </Button>
            <Button appearance="secondary" size="large" onClick={() => navigate("/support")}>
              Request access
            </Button>
          </>
        }
      />
    </div>
  );
}

interface TrackCardProps {
  track: Track;
  canEnrol: boolean;
  isEnrolledElsewhere: boolean;
  onEnrol: () => void;
}

function TrackCard({ track, canEnrol, isEnrolledElsewhere, onEnrol }: TrackCardProps) {
  const styles = useStyles();
  const totalMinutes = track.milestones.reduce((sum, milestone) => sum + milestone.estimateMinutes, 0);

  return (
    <div className={styles.trackCard}>
      <div className={styles.trackHeadRow}>
        <div className={styles.trackCopy}>
          <span className={styles.trackEyebrow}>Track {track.index}</span>
          <h3 className={styles.trackTitle}>{track.title}</h3>
          <p className={styles.trackSubtitle}>{track.subtitle}</p>
        </div>

        {canEnrol ? (
          <Button appearance="secondary" onClick={onEnrol}>
            {isEnrolledElsewhere ? "Switch to this track" : "Enrol on this track"}
          </Button>
        ) : null}
      </div>

      <p className={styles.smallText}>{track.description}</p>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          <TaskListSquareLtr20Regular />
          {track.milestones.length} milestones
        </span>
        <span className={styles.metaItem}>
          <Clock20Regular />≈{formatDuration(totalMinutes)} total
        </span>
      </div>

      <Accordion collapsible>
        <AccordionItem value="milestones">
          <AccordionHeader>
            <span style={{ fontWeight: tokens.fontWeightSemibold, fontSize: tokens.fontSizeBase300 }}>
              Preview {track.milestones.length} milestones
            </span>
          </AccordionHeader>
          <AccordionPanel>
            <ol style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS, margin: 0, paddingLeft: "20px" }}>
              {track.milestones.map((milestone) => (
                <li key={milestone.id} className={styles.smallText}>
                  {milestone.title} — {formatDuration(milestone.estimateMinutes)}
                </li>
              ))}
            </ol>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}









