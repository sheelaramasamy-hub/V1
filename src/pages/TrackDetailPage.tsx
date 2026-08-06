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
  mergeClasses,
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
  Grid20Regular,
  Lightbulb20Regular,
  Person20Regular,
  PeopleTeam20Regular,
  PuzzlePiece20Regular,
  TaskListSquareLtr20Regular,
  Trophy16Filled,
  Trophy20Regular,
} from "@fluentui/react-icons";
import symbolMicrosoft from "../assets/images/symbol-microsoft.svg";
import symbolCopilot from "../assets/images/symbol-copilot.svg";
import symbolFabric from "../assets/images/symbol-fabric.png";
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
    borderRadius: tokens.borderRadiusXLarge,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  trackCardBrowsable: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
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
  metaDot: {
    color: tokens.colorNeutralForeground4,
  },
});

/** Milestone status maps to step status; only "complete" and "upcoming" occur without a live server. */
function stepStatusFor(isCompleted: boolean, isNext: boolean): Step["status"] {
  if (isCompleted) return "complete";
  if (isNext) return "current";
  return "upcoming";
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
      icon: PuzzlePiece20Regular,
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
        icon={PuzzlePiece20Regular}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalXS }}>
          <Tag tone="brand" size="sm">
            {challenge.industry}
          </Tag>
          {detail.techTags.map((tag) => (
            <Tag key={tag} tone="brand" size="sm">
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
        icon={PuzzlePiece20Regular}
      >
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
                  description: milestone.description,
                  status: stepStatusFor(isCompleted, isNext),
                  meta: (
                    <div className={styles.milestoneRow}>
                      <span className={styles.metaItem}>≈{formatDuration(milestone.estimateMinutes)}</span>
                      <Button
                        appearance="subtle"
                        size="small"
                        onClick={() => toggleMilestone(enrolledTrack.id, milestone.id)}
                      >
                        {isCompleted ? "Reset" : "Advance"}
                      </Button>
                      {index === 0 && milestone.xp ? (
                        <Badge appearance="tint" color="warning" size="medium" icon={<Trophy16Filled />}>
                          {milestone.xp} XP
                        </Badge>
                      ) : null}
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
      </SectionCard>

      <SectionCard
        id="process"
        title={detail.processTitle}
        description={detail.processDescription}
        icon={CalendarClock20Regular}
      >
        <NumberedSteps steps={detail.processSteps} ariaLabel={`How ${challenge.format} events run`} />
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
    <div className={mergeClasses(styles.trackCard, styles.trackCardBrowsable)}>
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
        <span className={styles.metaDot} aria-hidden="true">
          ·
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









