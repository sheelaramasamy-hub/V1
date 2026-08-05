import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { layoutTokens } from "../../theme/theme";

const useStyles = makeStyles({
  /**
   * A floating bar held off the top bar by its own gap, so it reads as a control resting *over*
   * the page rather than a strip welded to the app chrome.
   */
  root: {
    position: "sticky",
    top: `calc(${layoutTokens.topBarHeight} + ${tokens.spacingVerticalM})`,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    minWidth: 0,
    overflow: "hidden",
  },
  scroller: {
    flexGrow: 1,
    overflowX: "auto",
    overflowY: "hidden",
    maxWidth: "100%",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  },
  action: {
    flexShrink: 0,
    paddingRight: tokens.spacingHorizontalM,
  },
  list: {
    display: "flex",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalXS,
    margin: 0,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    listStyleType: "none",
    minWidth: "max-content",
  },
  link: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    display: "inline-flex",
    alignItems: "center",
    height: layoutTokens.sectionNavHeight,
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
    color: tokens.colorNeutralForeground2,
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  linkActive: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandStroke1,
  },
});

export interface SectionNavItem {
  /** DOM id of the section this jumps to. */
  id: string;
  label: string;
}

export interface SectionNavProps {
  items: SectionNavItem[];
  ariaLabel: string;
  /** Persistent control anchored to the end of the bar, e.g. a "Start Challenge" button. */
  action?: ReactNode;
}

/**
 * Sticky in-page navigation across a long page's sections.
 *
 * Links to fragments, not tabs — every section stays on the page, and the active item just
 * follows scroll position (via `SectionCard`'s `scrollMarginTop`) rather than swapping a panel.
 */
export function SectionNav({ items, ariaLabel, action }: SectionNavProps) {
  const styles = useStyles();
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const ids = items.map((item) => item.id).join(",");

  useEffect(() => {
    const sections = ids
      .split(",")
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
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const current = sections.reduce<HTMLElement | undefined>((found, section) => {
        const landing = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        return section.getBoundingClientRect().top <= landing + 2 ? section : found;
      }, undefined);

      setActiveId((current ?? sections[0]).id);
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
  }, [ids]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !activeId) {
      return;
    }

    const active = scroller.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
    if (!active) {
      return;
    }

    const viewLeft = scroller.scrollLeft;
    const viewRight = viewLeft + scroller.clientWidth;

    if (active.offsetLeft < viewLeft || active.offsetLeft + active.offsetWidth > viewRight) {
      scroller.scrollTo({
        left: Math.max(0, active.offsetLeft - scroller.clientWidth / 3),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  }, [activeId]);

  return (
    <nav className={styles.root} aria-label={ariaLabel}>
      <div className={styles.scroller} ref={scrollerRef}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} data-section-id={item.id}>
              <a
                href={`#${item.id}`}
                className={mergeClasses(styles.link, item.id === activeId && styles.linkActive)}
                {...(item.id === activeId ? { "aria-current": "true" as const } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </nav>
  );
}
