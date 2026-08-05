import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import type { FluentIcon } from "@fluentui/react-icons";

export interface NumberedStep {
  title: string;
  description: string;
  icon?: FluentIcon;
}

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    minWidth: 0,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  item: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "44px minmax(0, 1fr)",
    gap: tokens.spacingHorizontalM,
    minWidth: 0,
    padding: "8px 0",
    "::after": {
      content: '""',
      position: "absolute",
      left: "22px",
      right: "calc(-1 * (16px + 22px))",
      top: "29px",
      height: tokens.strokeWidthThick,
      backgroundColor: tokens.colorBrandStroke2,
      opacity: 0.35,
      zIndex: 0,
    },
    "@media (max-width: 900px)": {
      "::after": {
        left: "22px",
        right: "auto",
        top: "52px",
        bottom: "-16px",
        width: tokens.strokeWidthThick,
        height: "auto",
      },
    },
  },
  lastItem: {
    "::after": {
      display: "none",
    },
  },
  badge: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    boxShadow: tokens.shadow4,
    fontSize: "20px",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    paddingTop: "2px",
  },
  ordinal: {
    width: "fit-content",
    height: "20px",
    paddingInline: tokens.spacingHorizontalSNudge,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightSemibold,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: 0,
  },
  title: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  description: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
});

export interface NumberedStepsProps {
  steps: NumberedStep[];
  ariaLabel?: string;
}

export function NumberedSteps({ steps, ariaLabel }: NumberedStepsProps) {
  const styles = useStyles();

  return (
    <ol className={styles.root} {...(ariaLabel ? { "aria-label": ariaLabel } : {})}>
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.title} className={mergeClasses(styles.item, isLast && styles.lastItem)}>
            <span className={styles.badge} aria-hidden="true">
              {StepIcon ? <StepIcon /> : String(index + 1)}
            </span>
            <div className={styles.copy}>
              <span className={styles.ordinal}>Checkpoint {String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
