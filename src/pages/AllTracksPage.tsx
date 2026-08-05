import { useMemo, useState } from "react";
import { Body1, Button, Title2, makeStyles, tokens } from "@fluentui/react-components";
import { ChallengeCard } from "../components/challenges/ChallengeCard";
import { CardGrid } from "../components/shared/CardGrid";
import { FilterBar, type FilterDefinition } from "../components/shared/FilterBar";
import { PageTransition } from "../components/shared/PageTransition";
import { EmptyWorkshopsIllustration } from "../components/shared/illustrations/EmptyWorkshopsIllustration";
import {
  CATALOG_FILTER_OPTIONS,
  CATALOG_SORT_OPTIONS,
  EMPTY_CATALOG_QUERY,
  activeFilterCount,
  catalogChallenges,
  queryCatalog,
  type CatalogQuery,
  type CatalogSort,
} from "../data/catalog";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  title: {
    margin: 0,
  },
  description: {
    margin: 0,
    maxWidth: "68ch",
    color: tokens.colorNeutralForeground2,
  },
  catalogStack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
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

export function AllTracksPage() {
  const styles = useStyles();
  const [query, setQuery] = useState<CatalogQuery>(EMPTY_CATALOG_QUERY);

  const results = useMemo(() => queryCatalog(query), [query]);

  const filters: FilterDefinition[] = [
    {
      id: "formats",
      label: "Format",
      options: [...CATALOG_FILTER_OPTIONS.formats],
      selected: query.formats,
    },
    {
      id: "categories",
      label: "Category",
      options: [...CATALOG_FILTER_OPTIONS.categories],
      selected: query.categories,
    },
    {
      id: "levels",
      label: "Level",
      options: [...CATALOG_FILTER_OPTIONS.levels],
      selected: query.levels,
    },
    {
      id: "participation",
      label: "Participation",
      options: [...CATALOG_FILTER_OPTIONS.participation],
      selected: query.participation,
    },
    {
      id: "statuses",
      label: "Status",
      options: [...CATALOG_FILTER_OPTIONS.statuses],
      selected: query.statuses,
    },
  ];

  const handleFilterChange = (filterId: string, selected: string[]): void => {
    setQuery((current) => ({ ...current, [filterId]: selected }));
  };

  const filtersApplied = activeFilterCount(query) > 0;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Title2 as="h1" className={styles.title}>
          Hackathon catalog
        </Title2>
        <Body1 as="p" className={styles.description}>
          Every hackathon open to you, across Hack in a Day, Hack to Skill, and Hack to Build formats.
        </Body1>
      </header>

      <div className={styles.catalogStack}>
        <FilterBar
          searchValue={query.search}
          onSearchChange={(search) => setQuery((current) => ({ ...current, search }))}
          searchLabel="Search hackathons by name, format, or industry"
          searchPlaceholder="Search hackathons"
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={() => setQuery(EMPTY_CATALOG_QUERY)}
          sort={{
            value: query.sort,
            options: [...CATALOG_SORT_OPTIONS],
            onChange: (value) => setQuery((current) => ({ ...current, sort: value as CatalogSort })),
          }}
          summary={
            filtersApplied
              ? `${results.length} of ${catalogChallenges.length} hackathons`
              : `${catalogChallenges.length} hackathons`
          }
        />

        <PageTransition motionKey={JSON.stringify(query)} variant="swap">
          {results.length > 0 ? (
            <CardGrid>
              {results.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </CardGrid>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.illustration}>
                <EmptyWorkshopsIllustration size={140} />
              </div>
              <p className={styles.emptyTitle}>No hackathons match these filters</p>
              <p className={styles.emptyBody}>
                Every filter is combined, so narrow criteria can rule everything out. Try removing one.
              </p>
              <Button appearance="primary" onClick={() => setQuery(EMPTY_CATALOG_QUERY)}>
                Clear all filters
              </Button>
            </div>
          )}
        </PageTransition>
      </div>
    </div>
  );
}
