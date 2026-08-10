import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  SearchBox,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { EmptyWorkshopsIllustration } from "../components/shared/illustrations/EmptyWorkshopsIllustration";
import { PageBanner } from "../components/shared/PageBanner";
import { PageTransition } from "../components/shared/PageTransition";
import { SurfaceCard } from "../components/shared/SurfaceCard";
import { faqCategories, totalFaqCount } from "../data/faq";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
  },
  search: {
    minWidth: "280px",
    maxWidth: "480px",
    flexGrow: 1,
  },
  searchCaption: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "220px minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXL,
    alignItems: "start",
    "@media (max-width: 760px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  categoryNav: {
    position: "sticky",
    top: `calc(${tokens.spacingVerticalXXL} + 48px)`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    "@media (max-width: 760px)": {
      position: "static",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
  /** Left-edge indicator bar, same convention as the side nav's own active state. */
  categoryLink: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    textDecorationLine: "none",
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalM}`,
    borderRadius: `0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0`,
    borderLeft: `2px solid transparent`,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
  },
  categoryLinkActive: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeftColor: tokens.colorBrandStroke1,
    fontWeight: tokens.fontWeightSemibold,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    minWidth: 0,
  },
  categorySection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    scrollMarginTop: "80px",
  },
  categoryHeading: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  answer: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
    paddingBottom: tokens.spacingVerticalM,
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

export function FaqPage() {
  const styles = useStyles();
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (term.length === 0) {
      return faqCategories;
    }

    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          `${item.question} ${item.answer}`.toLowerCase().includes(term),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [term]);

  const resultCount = filteredCategories.reduce((sum, category) => sum + category.items.length, 0);

  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(filteredCategories[0]?.id);
  const categoryIds = filteredCategories.map((category) => category.id).join(",");

  // Scroll-spy: the active category link follows scroll position, same technique as the track
  // detail page's section nav — the last section whose landing point has been reached wins.
  useEffect(() => {
    const sections = categoryIds
      .split(",")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const resolveActive = (): void => {
      frame = 0;

      const root = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 2;

      if (atBottom) {
        setActiveCategoryId(sections[sections.length - 1].id);
        return;
      }

      const current = sections.reduce<HTMLElement | undefined>((found, section) => {
        const landing = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        return section.getBoundingClientRect().top <= landing + 2 ? section : found;
      }, undefined);

      setActiveCategoryId((current ?? sections[0]).id);
    };

    const onScroll = (): void => {
      if (frame === 0) {
        frame = requestAnimationFrame(resolveActive);
      }
    };

    resolveActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [categoryIds]);

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Self-service help"
        title="Frequently asked questions"
        description="Fast answers to the most common questions about enrollment, submissions, workshops, and your account."
      />

      <div className={styles.searchRow}>
        <SearchBox
          className={styles.search}
          value={search}
          onChange={(_event, data) => setSearch(data.value)}
          placeholder="Search frequently asked questions..."
          aria-label="Search frequently asked questions"
        />
        <span className={styles.searchCaption}>
          {term.length > 0 ? `${resultCount} of ${totalFaqCount} answers` : `Search across ${totalFaqCount} answers`}
        </span>
      </div>

      <div className={styles.layout}>
        <nav className={styles.categoryNav} aria-label="FAQ categories">
          {faqCategories.map((category) => (
            <a
              key={category.id}
              className={mergeClasses(styles.categoryLink, category.id === activeCategoryId && styles.categoryLinkActive)}
              href={`#${category.id}`}
              {...(category.id === activeCategoryId ? { "aria-current": "true" as const } : {})}
            >
              {category.label}
            </a>
          ))}
        </nav>

        <PageTransition motionKey={term} variant="swap">
          {filteredCategories.length > 0 ? (
            <div className={styles.list}>
              {filteredCategories.map((category) => (
                <section id={category.id} key={category.id} className={styles.categorySection}>
                  <h2 className={styles.categoryHeading}>{category.label}</h2>

                  <SurfaceCard elevation="high">
                    <Accordion multiple collapsible>
                      {category.items.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionHeader>{item.question}</AccordionHeader>
                          <AccordionPanel>
                            <p className={styles.answer}>{item.answer}</p>
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </SurfaceCard>
                </section>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.illustration}>
                <EmptyWorkshopsIllustration size={140} />
              </div>
              <p className={styles.emptyTitle}>No answers match "{search}"</p>
              <p className={styles.emptyBody}>
                Try a different search term, or open a support request if you can't find what you need.
              </p>
            </div>
          )}
        </PageTransition>
      </div>
    </div>
  );
}
