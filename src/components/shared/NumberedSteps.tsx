import { makeStyles, tokens } from "@fluentui/react-components";

export interface NumberedStep {
  title: string;
  description: string;
  /** Illustration artwork shown above the label. */
  illustration: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    minWidth: 0,
    width: "100%",
  },
  item: {
    flex: "1 1 200px",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXS} ${tokens.spacingVerticalS}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  illustration: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    width: "100%",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorBrandForeground2,
  },
});

export interface NumberedStepsProps {
  steps: NumberedStep[];
  ariaLabel?: string;
}

/** How an event runs, as a row of illustrated step cards. */
export function NumberedSteps({ steps, ariaLabel }: NumberedStepsProps) {
  const styles = useStyles();

  return (
    <ol className={styles.root} {...(ariaLabel ? { "aria-label": ariaLabel } : {})}>
      {steps.map((step) => (
        <li key={step.title} className={styles.item}>
          <img src={step.illustration} alt="" className={styles.illustration} aria-hidden="true" />
          <div className={styles.label}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
