import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowClockwise20Regular,
  ArrowDownload20Regular,
  ArrowRight16Regular,
  BookOpen20Regular,
  Clock20Regular,
  DocumentText20Regular,
  Beaker20Regular,
  Video20Regular,
  Gauge20Regular,
} from "@fluentui/react-icons";
import type { FluentIcon } from "@fluentui/react-icons";
import type { Resource, ResourceCategory } from "../types/resources";
import { getResourceById, resources } from "../data/resources";
import { CheckList } from "../components/shared/CheckList";
import { DetailHero } from "../components/shared/DetailHero";
import { LinkCard } from "../components/shared/LinkCard";
import { ProgressMeter } from "../components/shared/ProgressMeter";
import { SectionCard } from "../components/shared/SectionCard";
import { Tag } from "../components/shared/Tag";
import { layoutTokens } from "../theme/theme";

const CATEGORY_ICON: Record<ResourceCategory, FluentIcon> = {
  "Learning path": BookOpen20Regular,
  Video: Video20Regular,
  Lab: Beaker20Regular,
  Template: DocumentText20Regular,
};

const CATEGORY_ACTION_ICON: Record<ResourceCategory, FluentIcon> = {
  "Learning path": ArrowRight16Regular,
  Video: ArrowRight16Regular,
  Lab: ArrowRight16Regular,
  Template: ArrowDownload20Regular,
};

function actionIconFor(resource: Resource): FluentIcon {
  if (resource.actionLabel === "Watch again") return ArrowClockwise20Regular;
  return CATEGORY_ACTION_ICON[resource.category];
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: layoutTokens.sectionGap,
  },
  progressCard: {
    minWidth: "220px",
  },
});

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const styles = useStyles();

  const resource = getResourceById(id);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  const CategoryIcon = CATEGORY_ICON[resource.category];
  const ActionIcon = actionIconFor(resource);
  const related = resources.filter((candidate) => candidate.id !== resource.id).slice(0, 3);

  return (
    <div className={styles.root}>
      <DetailHero
        visualSrc={resource.cover}
        breadcrumb={
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbItem>
              <BreadcrumbButton onClick={() => navigate("/resources")}>Resources</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton current>{resource.title}</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        mark={
          <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: tokens.borderRadiusMedium,
                backgroundColor: tokens.colorBrandBackground2,
                color: tokens.colorBrandForeground2,
              }}
              aria-hidden="true"
            >
              <CategoryIcon />
            </span>
          </div>
        }
        eyebrow={resource.category}
        title={resource.title}
        description={resource.description}
        chips={
          <>
            <Tag icon={<Gauge20Regular />}>{resource.level}</Tag>
            <Tag icon={<Clock20Regular />}>{resource.meta}</Tag>
          </>
        }
        facts={
          resource.progress > 0 ? (
            <div className={styles.progressCard}>
              <ProgressMeter percent={resource.progress} label="Your progress" />
            </div>
          ) : undefined
        }
        actions={
          <>
            <Button appearance="primary" icon={<ActionIcon />} iconPosition="after">
              {resource.actionLabel}
            </Button>
            <Button appearance="secondary" onClick={() => navigate("/resources")}>
              Back to library
            </Button>
          </>
        }
      />

      <SectionCard id="what-youll-learn" title="What you'll learn" icon={BookOpen20Regular}>
        <CheckList items={resource.points} columns="two" />
      </SectionCard>

      {related.length > 0 ? (
        <SectionCard id="related-resources" title="Related resources" icon={DocumentText20Regular}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: tokens.spacingHorizontalM,
            }}
          >
            {related.map((item) => (
              <LinkCard
                key={item.id}
                eyebrow={item.category}
                title={item.title}
                to={`/resources/${item.id}`}
                linkLabel={item.actionLabel}
              />
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
