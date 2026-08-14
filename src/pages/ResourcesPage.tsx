import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ProgressBar, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowRight16Regular, Bookmark20Regular } from "@fluentui/react-icons";
import { ResourceCard } from "../components/resources/ResourceCard";
import { CardGrid } from "../components/shared/CardGrid";
import { FilterBar, type FilterDefinition } from "../components/shared/FilterBar";
import { PageBanner, PageBannerButton } from "../components/shared/PageBanner";
import { PageTransition } from "../components/shared/PageTransition";
import { EmptyWorkshopsIllustration } from "../components/shared/illustrations/EmptyWorkshopsIllustration";
import { RESOURCE_CATEGORY_FILTERS, featuredResource, resources } from "../data/resources";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  callout: {
    display: "grid",
    gridTemplateColumns: "64px minmax(0, 1fr) auto",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: tokens.shadow4,
    "@media (max-width: 760px)": {
      gridTemplateColumns: "48px minmax(0, 1fr)",
      "& > :last-child": {
        gridColumn: "1 / -1",
      },
    },
  },
  calloutMark: {
    width: "64px",
    height: "64px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    "@media (max-width: 760px)": {
      width: "48px",
      height: "48px",
    },
  },
  calloutMarkImage: {
    width: "36px",
    height: "36px",
    objectFit: "contain",
    "@media (max-width: 760px)": {
      width: "28px",
      height: "28px",
    },
  },
  calloutCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  calloutEyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground2,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  calloutTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  calloutDescription: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  calloutProgress: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: "140px",
  },
  calloutProgressLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  calloutActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 760px)": {
      justifyContent: "space-between",
    },
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

interface ResourceQuery {
  search: string;
  categories: string[];
}

const EMPTY_QUERY: ResourceQuery = { search: "", categories: [] };

/**
 * Learning Resources — Microsoft Learn paths, labs, templates, and recordings tied to the
 * participant's active tracks. Reuses the same catalogue shell (FilterBar, CardGrid,
 * PageTransition) as the All Tracks page so browsing feels like one product, not two.
 */
export function ResourcesPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [query, setQuery] = useState<ResourceQuery>(EMPTY_QUERY);

  const results = useMemo(() => {
    const term = query.search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesSearch =
        term.length === 0 ||
        [resource.title, resource.description, resource.category].join(" ").toLowerCase().includes(term);
      const matchesCategory = query.categories.length === 0 || query.categories.includes(resource.category);
      return matchesSearch && matchesCategory;
    });
  }, [query]);

  const filters: FilterDefinition[] = [
    {
      id: "categories",
      label: "Category",
      options: RESOURCE_CATEGORY_FILTERS,
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
        eyebrow="Learning library"
        title="Build skills at your pace"
        description="Curated Microsoft Learn paths, labs, templates, and expert recordings for your active challenges."
        actions={
          <PageBannerButton icon={<Bookmark20Regular />} onClick={() => navigate("/resources/saved")}>
            Saved resources
          </PageBannerButton>
        }
      />

      <div className={styles.callout}>
        <span className={styles.calloutMark}>
          <img src={featuredResource.cover} alt="" className={styles.calloutMarkImage} />
        </span>

        <div className={styles.calloutCopy}>
          <span className={styles.calloutEyebrow}>{featuredResource.eyebrow}</span>
          <h2 className={styles.calloutTitle}>{featuredResource.title}</h2>
          <p className={styles.calloutDescription}>{featuredResource.description}</p>
        </div>

        <div className={styles.calloutActions}>
          <div className={styles.calloutProgress}>
            <span className={styles.calloutProgressLabel}>{featuredResource.moduleLabel}</span>
            <ProgressBar value={featuredResource.progress / 100} thickness="medium" shape="rounded" />
          </div>
          <Button
            appearance="primary"
            icon={<ArrowRight16Regular />}
            iconPosition="after"
            onClick={() => navigate(`/resources/${featuredResource.id}`)}
          >
            {featuredResource.actionLabel}
          </Button>
        </div>
      </div>

      <FilterBar
        searchValue={query.search}
        onSearchChange={(search) => setQuery((current) => ({ ...current, search }))}
        searchLabel="Search the learning library"
        searchPlaceholder="Search resources"
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={() => setQuery(EMPTY_QUERY)}
        summary={filtersApplied ? `${results.length} of ${resources.length} resources` : `${resources.length} resources`}
      />

      <PageTransition motionKey={JSON.stringify(query)} variant="swap">
        {results.length > 0 ? (
          <CardGrid>
            {results.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </CardGrid>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.illustration}>
              <EmptyWorkshopsIllustration size={140} />
            </div>
            <p className={styles.emptyTitle}>No resources match these filters</p>
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
