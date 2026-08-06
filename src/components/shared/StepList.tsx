import type { ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { CheckmarkCircle16Filled, Circle12Regular } from "@fluentui/react-icons";

export type StepStatus = "complete" | "current" | "upcoming";

const STATUS_LABEL: Record<StepStatus, string> = {
  complete: "Completed",
  current: "In progress",
  upcoming: "Not started",
};

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  item: {
    position: "relative",
    display: "flex",
    gap: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalL,
    minWidth: 0,
    "::before": {
      content: '""',
      position: "absolute",
      left: "11px",
      top: "24px",
      bottom: 0,
      width: "2px",
      backgroundColor: tokens.colorNeutralStroke2,
    },
  },
  lastItem: {
    paddingBottom: 0,
    "::before": { display: "none" },
  },
  connectorComplete: {
    "::before": { backgroundColor: tokens.colorBrandStroke2 },
  },
  marker: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "24px",
    height: "24px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground3,
    zIndex: 1,
  },
  markerComplete: {
    color: tokens.colorBrandForeground1,
  },
  markerIncomplete: {
    color: tokens.colorNeutralForeground4,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    paddingTop: "2px",
  },
  titleRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  title: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  titleComplete: {
    color: tokens.colorNeutralForeground3,
  },
  description: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    margin: 0,
  },
});

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
  /** Right-of-title slot — duration, XP badge, or an action button. */
  meta?: ReactNode;
}

export interface StepListProps {
  steps: Step[];
  ariaLabel?: string;
}

/** An ordered sequence of work with per-step status — the milestone list. */
export function StepList({ steps, ariaLabel }: StepListProps) {
  const styles = useStyles();

  return (
    <ol className={styles.list} {...(ariaLabel ? { "aria-label": ariaLabel } : {})}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isComplete = step.status === "complete";
        const MarkerIcon = isComplete ? CheckmarkCircle16Filled : Circle12Regular;

        return (
          <li
            key={step.id}
            className={mergeClasses(
              styles.item,
              isLast && styles.lastItem,
              step.status === "complete" && styles.connectorComplete,
            )}
          >
            <span className={mergeClasses(styles.marker, isComplete ? styles.markerComplete : styles.markerIncomplete)}>
              <MarkerIcon />
            </span>

            <div className={styles.copy}>
              <div className={styles.titleRow}>
                <span className={mergeClasses(styles.title, step.status === "complete" && styles.titleComplete)}>
                  {step.title}
                </span>
                <span
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clip: "rect(0 0 0 0)",
                  }}
                >
                  {STATUS_LABEL[step.status]}
                </span>
                {step.meta}
              </div>
              {step.description ? <p className={styles.description}>{step.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
