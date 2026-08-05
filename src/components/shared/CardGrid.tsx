import type { ReactNode } from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "grid",
    // auto-fill + minmax: columns are computed from available width, so cards wrap onto the
    // next row instead of being clipped at the viewport edge.
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
    gap: tokens.spacingHorizontalL,
    alignItems: "stretch",
    minWidth: 0,
  },
});

/**
 * Responsive card grid for the catalogue. Cards stretch to equal height so a shorter title
 * doesn't leave one card's footer sitting higher than its row neighbours.
 */
export function CardGrid({ children, className }: { children: ReactNode; className?: string }) {
  const styles = useStyles();

  return <div className={mergeClasses(styles.root, className)}>{children}</div>;
}
