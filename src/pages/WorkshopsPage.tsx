import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, MessageBar, MessageBarBody, MessageBarTitle, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { CardGrid } from "../components/shared/CardGrid";
import { FilterBar, type FilterDefinition } from "../components/shared/FilterBar";
import { PageBanner, PageBannerButton } from "../components/shared/PageBanner";
import { PageTransition } from "../components/shared/PageTransition";
import { EmptyWorkshopsIllustration } from "../components/shared/illustrations/EmptyWorkshopsIllustration";
import { WorkshopCard } from "../components/workshops/WorkshopCard";
import { WORKSHOP_CATEGORY_FILTERS, workshops } from "../data/workshops";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalXXXL} 0`,
  },
  illustration: {
    marginBottom: tokens.spacingVerticalS,
  },
  emptyTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  emptyBody: {
    margin: 0,
    maxWidth: "360px",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
});

interface WorkshopQuery {
  search: string;
  categories: string[];
}

const EMPTY_QUERY: WorkshopQuery = { search: "", categories: [] };

/**
 * Workshops — live sessions, upcoming clinics, and on-demand recordings. Reuses the same
 * FilterBar / CardGrid / PageTransition shell as All Tracks and Resources, and the same
 * inset-cover card language as ChallengeCard and ResourceCard, so all three catalogues in the
 * product read as one system.
 */
export function WorkshopsPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [query, setQuery] = useState<WorkshopQuery>(EMPTY_QUERY);
  const [calendarSent, setCalendarSent] = useState(false);

  const liveWorkshop = workshops.find((workshop) => workshop.status === "Live now");

  const results = useMemo(() => {
    const term = query.search.trim().toLowerCase();

    return workshops.filter((workshop) => {
      const matchesSearch =
        term.length === 0 ||
        [workshop.title, workshop.presenterName, workshop.category].join(" ").toLowerCase().includes(term);
      const matchesCategory = query.categories.length === 0 || query.categories.includes(workshop.category);
      return matchesSearch && matchesCategory;
    });
  }, [query]);

  const filters: FilterDefinition[] = [
    {
      id: "categories",
      label: "Category",
      options: WORKSHOP_CATEGORY_FILTERS,
      selected: query.categories,
    },
  ];

  const handleFilterChange = (filterId: string, selected: string[]): void => {
    setQuery((current) => ({ ...current, [filterId]: selected }));
  };

  const filtersApplied = query.categories.length > 0 || query.search.trim().length > 0;

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Expert-led learning"
        title="Workshops"
        description="Join live sessions, reserve upcoming clinics, or watch recordings when it suits you."
        actions={
          <PageBannerButton icon={<ArrowDownload20Regular />} onClick={() => setCalendarSent(true)}>
            Download calendar
          </PageBannerButton>
        }
      />

      {calendarSent ? (
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Calendar invite sent.</MessageBarTitle>
            Check your inbox for an .ics file covering every session on this page.
          </MessageBarBody>
        </MessageBar>
      ) : null}

      {liveWorkshop ? (
        <MessageBar intent="info">
          <MessageBarBody>
            <MessageBarTitle>{liveWorkshop.title} is live now</MessageBarTitle>
            {liveWorkshop.presenterName} is presenting — join before the session ends.
          </MessageBarBody>
          <Button appearance="primary" size="small" onClick={() => navigate(`/workshop/${liveWorkshop.id}`)}>
            Join live
          </Button>
        </MessageBar>
      ) : null}

      <FilterBar
        searchValue={query.search}
        onSearchChange={(search) => setQuery((current) => ({ ...current, search }))}
        searchLabel="Search workshops by title or presenter"
        searchPlaceholder="Search workshops"
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={() => setQuery(EMPTY_QUERY)}
        summary={filtersApplied ? `${results.length} of ${workshops.length} workshops` : `${workshops.length} workshops`}
      />

      <PageTransition motionKey={JSON.stringify(query)} variant="swap">
        {results.length > 0 ? (
          <CardGrid>
            {results.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </CardGrid>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.illustration}>
              <EmptyWorkshopsIllustration size={140} />
            </div>
            <p className={styles.emptyTitle}>No workshops match these filters</p>
            <p className={styles.emptyBody}>
              Every filter is combined, so narrow criteria can rule everything out. Try removing one.
            </p>
            <Button appearance="primary" onClick={() => setQuery(EMPTY_QUERY)}>
              Clear all filters
            </Button>
          </div>
        )}
      </PageTransition>
    </div>
  );
}
