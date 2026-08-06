import type { ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `0 ${tokens.spacingHorizontalSNudge}`,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: tokens.fontFamilyBase,
    whiteSpace: "nowrap",
  },
  md: {
    height: "24px",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  /** Compact chip — the tech stack row, where Figma uses a tighter 20px pill. */
  sm: {
    height: "20px",
    padding: `0 ${tokens.spacingHorizontalSNudge}`,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightSemibold,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorBrandStroke2}`,
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
  size?: "md" | "sm";
}

/** A small labelled chip — catalogue codes, levels, tech stack entries. */
export function Tag({ children, tone = "neutral", icon, size = "md" }: TagProps) {
  const styles = useStyles();

  return (
    <span
      className={mergeClasses(
        styles.root,
        size === "sm" ? styles.sm : styles.md,
        tone === "brand" ? styles.brand : styles.neutral,
      )}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children}
    </span>
  );
}
