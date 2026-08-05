import type { ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import type { FluentIcon } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: tokens.spacingHorizontalM,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    minWidth: 0,
  },
  columnsTwo: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  columnsFour: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground4,
  },
  plain: {
    padding: 0,
    backgroundColor: "transparent",
    gap: tokens.spacingVerticalS,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
  },
  label: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    minWidth: 0,
  },
  value: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    minWidth: 0,
    overflowWrap: "anywhere",
  },
  valueProse: {
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    overflowWrap: "normal",
  },
});

export interface Fact {
  id: string;
  label: string;
  value: ReactNode;
  icon?: FluentIcon;
}

export interface FactCardRowProps {
  facts: Fact[];
  ariaLabel?: string;
  /** `card` (default) puts each fact on its own tinted surface. `plain` drops the surface. */
  appearance?: "card" | "plain";
  columns?: "two" | "four";
}

/** The headline facts about a track, as a row of small cards. */
export function FactCardRow({ facts, ariaLabel = "Key facts", appearance = "card", columns }: FactCardRowProps) {
  const styles = useStyles();

  return (
    <ul
      className={mergeClasses(styles.root, columns === "two" ? styles.columnsTwo : styles.columnsFour)}
      aria-label={ariaLabel}
    >
      {facts.map((fact) => (
        <li key={fact.id} className={mergeClasses(styles.card, appearance === "plain" && styles.plain)}>
          <span className={styles.labelRow}>
            {fact.icon ? (
              <span className={styles.icon} aria-hidden="true">
                <fact.icon />
              </span>
            ) : null}
            <span className={styles.label}>{fact.label}</span>
          </span>
          <span className={mergeClasses(styles.value, appearance === "plain" && styles.valueProse)}>
            {fact.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
