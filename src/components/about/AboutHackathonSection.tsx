import { useState } from "react";
import { Button, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { ArrowRight16Regular, ChevronDown12Regular } from "@fluentui/react-icons";
import { aboutHackathon, prerequisites } from "../../data/about";
import { SurfaceCard } from "../shared/SurfaceCard";
import { motion, transitionFor } from "../../theme/motion";
import { AboutVisual } from "./AboutVisual";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  introCard: {
    position: "relative",
    minHeight: "260px",
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 430px",
    alignItems: "start",
    gap: tokens.spacingHorizontalXXL,
    overflow: "hidden",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      minHeight: "auto",
    },
  },
  introContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
    zIndex: 1,
  },
  introActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalS,
  },
  heading: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    margin: 0,
    maxWidth: "660px",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  prerequisitesButton: {
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightRegular,
  },
  prerequisitesIcon: {
    ...transitionFor("transform", motion.feedback),
  },
  prerequisitesIconOpen: {
    transform: "rotate(180deg)",
  },
  /**
   * `grid-template-rows: 0fr -> 1fr` animates to the content's intrinsic
   * height without measuring it in JS — the standard CSS-only expand/collapse
   * technique. The inner `minHeight: 0` is required for the row to actually
   * collapse rather than clamping at its content's minimum size.
   */
  prerequisitesCollapse: {
    display: "grid",
    gridTemplateRows: "0fr",
    ...transitionFor("grid-template-rows", motion.expand),
  },
  prerequisitesCollapseOpen: {
    gridTemplateRows: "1fr",
  },
  prerequisitesCollapseInner: {
    minHeight: 0,
    overflow: "hidden",
  },
  prerequisitesGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXS,
    "@media (max-width: 700px)": {
      gridTemplateColumns: "1fr",
    },
  },
  prerequisiteCard: {
    padding: "16px",
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  prerequisiteTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  prerequisiteDetail: {
    margin: `${tokens.spacingVerticalXXS} 0 0`,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    color: tokens.colorNeutralForeground3,
  },
  visual: {
    position: "relative",
    width: "430px",
    height: "228px",
    justifySelf: "end",
    flexShrink: 0,
    "@media (max-width: 900px)": {
      justifySelf: "center",
      width: "min(430px, 100%)",
    },
  },
});

export function AboutHackathonSection() {
  const styles = useStyles();
  const [prerequisitesExpanded, setPrerequisitesExpanded] = useState(false);

  return (
    <section className={styles.root} aria-labelledby="about-hackathon-heading">
      <SurfaceCard elevation="high" className={styles.introCard}>
        <div className={styles.introContent}>
          <h2 id="about-hackathon-heading" className={styles.heading}>
            {aboutHackathon.title}
          </h2>
          <p className={styles.description}>{aboutHackathon.description}</p>

          <div className={styles.introActions}>
            <Button appearance="primary" icon={<ArrowRight16Regular />} iconPosition="after">
              {aboutHackathon.primaryAction}
            </Button>
            <Button
              appearance="transparent"
              size="small"
              className={styles.prerequisitesButton}
              icon={
                <ChevronDown12Regular
                  className={mergeClasses(
                    styles.prerequisitesIcon,
                    prerequisitesExpanded && styles.prerequisitesIconOpen,
                  )}
                  aria-hidden="true"
                />
              }
              iconPosition="after"
              aria-expanded={prerequisitesExpanded}
              aria-controls="hackathon-prerequisites"
              onClick={() => setPrerequisitesExpanded((expanded) => !expanded)}
            >
              Prerequisites
            </Button>
          </div>

          <div
            className={mergeClasses(
              styles.prerequisitesCollapse,
              prerequisitesExpanded && styles.prerequisitesCollapseOpen,
            )}
          >
            <div id="hackathon-prerequisites" className={styles.prerequisitesCollapseInner}>
              <div className={styles.prerequisitesGrid}>
                {prerequisites.map((item) => (
                  <article key={item.id} className={styles.prerequisiteCard}>
                    <h3 className={styles.prerequisiteTitle}>{item.title}</h3>
                    <p className={styles.prerequisiteDetail}>{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <AboutVisual />
        </div>
      </SurfaceCard>
    </section>
  );
}
