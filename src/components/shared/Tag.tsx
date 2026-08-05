import type { ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    height: "24px",
    padding: `0 ${tokens.spacingHorizontalSNudge}`,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: "nowrap",
  },
  neutral: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground2,
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
  },
});

export interface TagProps {
  children: ReactNode;
  tone?: "neutral" | "brand";
  icon?: ReactNode;
}

/** A small labelled chip — catalogue codes, levels, tech stack entries. */
export function Tag({ children, tone = "neutral", icon }: TagProps) {
  const styles = useStyles();

  return (
    <span className={mergeClasses(styles.root, tone === "brand" ? styles.brand : styles.neutral)}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children}
    </span>
  );
}
