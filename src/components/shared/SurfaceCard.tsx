import type { ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

/**
 * The dashboard's card surface, matching the Figma card chrome exactly:
 * colorNeutralBackground1 fill, a transparent 1px stroke (so the box model
 * matches bordered variants), 4px "Medium" corner radius and Fluent's
 * `shadow4`, which is byte-identical to the file's "Elevation/Light/Shadow 04".
 *
 * `elevation="high"` switches to `shadow8` for the wider content panels
 * (Workshops / Recommended) that sit on a softer, larger shadow in Figma.
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
  },
  high: {
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
  },
});

export function SurfaceCard({
  children,
  className,
  elevation = "default",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  elevation?: "default" | "high";
  as?: "div" | "section" | "button";
} & React.HTMLAttributes<HTMLElement> & { type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] }) {
  const styles = useStyles();

  return (
    <Tag
      {...(Tag === "button" ? { type: "button" } : {})}
      className={mergeClasses(styles.root, elevation === "high" && styles.high, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

