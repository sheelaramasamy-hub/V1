import { useNavigate } from "react-router-dom";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { Bookmark20Regular, BookOpen20Regular } from "@fluentui/react-icons";
import { ResourceCard } from "../components/resources/ResourceCard";
import { CardGrid } from "../components/shared/CardGrid";
import { PageBanner, PageBannerButton } from "../components/shared/PageBanner";
import { useSavedResources } from "../hooks/useSavedResources";
import { resources } from "../data/resources";

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
  emptyIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    marginBottom: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: "26px",
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

/**
 * The bookmarked subset of the learning library — same ResourceCard/CardGrid as the main
 * Resources page, filtered to whatever `useSavedResources` has in localStorage.
 */
export function SavedResourcesPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { savedIds } = useSavedResources();

  const saved = resources.filter((resource) => savedIds.includes(resource.id));

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Learning library"
        title="Saved resources"
        description="Everything you've bookmarked from the learning library, in one place."
        actions={<PageBannerButton onClick={() => navigate("/resources")}>Browse library</PageBannerButton>}
      />

      {saved.length > 0 ? (
        <CardGrid>
          {saved.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </CardGrid>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            <Bookmark20Regular />
          </span>
          <p className={styles.emptyTitle}>Nothing saved yet</p>
          <p className={styles.emptyBody}>
            Tap the bookmark icon on any resource card to save it here for later.
          </p>
          <Button appearance="primary" icon={<BookOpen20Regular />} onClick={() => navigate("/resources")}>
            Browse the learning library
          </Button>
        </div>
      )}
    </div>
  );
}
