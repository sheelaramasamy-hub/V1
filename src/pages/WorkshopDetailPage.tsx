import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Badge, Breadcrumb, BreadcrumbButton, BreadcrumbDivider, BreadcrumbItem, Button, tokens } from "@fluentui/react-components";
import type { BadgeProps } from "@fluentui/react-components";
import {
  ArrowClockwise20Regular,
  CalendarLtr20Regular,
  TaskListSquareLtr20Regular,
  Person20Regular,
} from "@fluentui/react-icons";
import type { FluentIcon } from "@fluentui/react-icons";
import type { Workshop } from "../types/workshops";
import { getWorkshopById, workshops } from "../data/workshops";
import { CheckList } from "../components/shared/CheckList";
import { DetailHero } from "../components/shared/DetailHero";
import { LinkCard } from "../components/shared/LinkCard";
import { SectionCard } from "../components/shared/SectionCard";
import { Tag } from "../components/shared/Tag";

const STATUS_COLOR: Record<Workshop["status"], BadgeProps["color"]> = {
  "Live now": "danger",
  Upcoming: "informative",
  "On demand": "subtle",
};

function actionIconFor(workshop: Workshop): FluentIcon {
  if (workshop.actionLabel === "Watch now") return ArrowClockwise20Regular;
  return CalendarLtr20Regular;
}

export function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const workshop = getWorkshopById(id);

  if (!workshop) {
    return <Navigate to="/workshop" replace />;
  }

  const ActionIcon = actionIconFor(workshop);
  const related = workshops.filter((candidate) => candidate.id !== workshop.id).slice(0, 3);

  return (
    <>
      <DetailHero
        visualSrc={workshop.cover}
        breadcrumb={
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbItem>
              <BreadcrumbButton onClick={() => navigate("/workshop")}>Workshop</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton current>{workshop.title}</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        }
        eyebrow={workshop.category}
        status={
          <Badge appearance="filled" color={STATUS_COLOR[workshop.status]} size="large" shape="rounded">
            {workshop.status}
          </Badge>
        }
        title={workshop.title}
        description={workshop.description}
        chips={
          <>
            <Tag icon={<CalendarLtr20Regular />}>{workshop.date}</Tag>
            <Tag icon={<Person20Regular />}>{workshop.presenterName}</Tag>
          </>
        }
        actions={
          <>
            <Button appearance="primary" size="large" icon={<ActionIcon />} iconPosition="after">
              {workshop.actionLabel}
            </Button>
            <Button appearance="secondary" size="large" onClick={() => navigate("/workshop")}>
              Back to workshops
            </Button>
          </>
        }
      />

      <SectionCard id="presenter" title="Presenter" icon={Person20Regular}>
        <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalM }}>
          <span
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              flexShrink: 0,
              borderRadius: tokens.borderRadiusCircular,
              backgroundColor: tokens.colorBrandBackground,
              color: "#ffffff",
              fontFamily: tokens.fontFamilyBase,
              fontSize: tokens.fontSizeBase400,
              fontWeight: tokens.fontWeightBold,
            }}
          >
            {workshop.presenterInitials}
          </span>
          <div>
            <div
              style={{
                fontFamily: tokens.fontFamilyBase,
                fontSize: tokens.fontSizeBase400,
                fontWeight: tokens.fontWeightSemibold,
                color: tokens.colorNeutralForeground1,
              }}
            >
              {workshop.presenterName}
            </div>
            <div
              style={{
                fontFamily: tokens.fontFamilyBase,
                fontSize: tokens.fontSizeBase200,
                color: tokens.colorNeutralForeground3,
              }}
            >
              Microsoft subject matter expert
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard id="agenda" title="What to expect" icon={TaskListSquareLtr20Regular}>
        <CheckList items={workshop.agenda} columns="two" />
      </SectionCard>

      {related.length > 0 ? (
        <SectionCard id="more-workshops" title="More workshops">
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
                to={`/workshop/${item.id}`}
                linkLabel={item.actionLabel}
              />
            ))}
          </div>
        </SectionCard>
      ) : null}
    </>
  );
}
