import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { CheckmarkCircle16Filled } from "@fluentui/react-icons";
import type { FluentIcon } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "grid",
    columnGap: tokens.spacingHorizontalXXL,
    rowGap: tokens.spacingVerticalS,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    minWidth: 0,
  },
  columnsOne: {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  columnsTwo: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalSNudge,
    minWidth: 0,
  },
  icon: {
    marginTop: "2px",
    flexShrink: 0,
    display: "flex",
    color: tokens.colorBrandForeground1,
  },
  text: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    minWidth: 0,
  },
});

export interface CheckListProps {
  items: string[];
  columns?: "one" | "two";
  /** Marker against each item. Defaults to a filled checkmark circle. */
  icon?: FluentIcon;
  ariaLabel?: string;
}

/** A list of outcomes, each with a leading marker. */
export function CheckList({ items, columns = "one", icon: Icon = CheckmarkCircle16Filled, ariaLabel }: CheckListProps) {
  const styles = useStyles();

  return (
    <ul
      className={mergeClasses(styles.root, columns === "two" ? styles.columnsTwo : styles.columnsOne)}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.icon} aria-hidden="true">
            <Icon />
          </span>
          <span className={styles.text}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
