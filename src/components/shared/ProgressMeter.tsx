import { ProgressBar, makeStyles, tokens } from "@fluentui/react-components";
import { motion, transitionFor } from "../../theme/motion";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
  },
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  label: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  value: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  caption: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  // The bar grows into its new value instead of jumping to it — confirms a completed milestone
  // actually registered. Applied to Fluent's inner bar element, since the width lives there.
  bar: {
    "& > div": transitionFor("width", motion.enter),
  },
});

export interface ProgressMeterProps {
  /** Percentage complete, 0-100. */
  percent: number;
  label?: string;
  caption?: string;
  showValue?: boolean;
}

/** Labelled progress bar — never shipped without an accessible name for what's progressing. */
export function ProgressMeter({ percent, label, caption, showValue = true }: ProgressMeterProps) {
  const styles = useStyles();
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    <div className={styles.root}>
      {label || showValue ? (
        <div className={styles.header}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {showValue ? <span className={styles.value}>{clamped}%</span> : null}
        </div>
      ) : null}

      <ProgressBar
        value={clamped / 100}
        thickness="medium"
        shape="rounded"
        className={styles.bar}
        {...(label ? { "aria-label": `${label}: ${clamped}% complete` } : {})}
      />

      {caption ? <span className={styles.caption}>{caption}</span> : null}
    </div>
  );
}
