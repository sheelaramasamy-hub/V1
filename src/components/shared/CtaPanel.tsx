import type { ReactNode } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXXL,
    padding: tokens.spacingVerticalXXXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow4,
    "@media (max-width: 900px)": {
      padding: tokens.spacingVerticalXXL,
    },
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
    flex: "1 1 320px",
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
    maxWidth: "60ch",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: tokens.spacingVerticalS,
    width: "100%",
    maxWidth: "260px",
  },
});

export interface CtaPanelProps {
  title: string;
  description?: string;
  actions: ReactNode;
}

/** The closing call to action at the foot of the track detail page. */
export function CtaPanel({ title, description, actions }: CtaPanelProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
