import type { ReactNode } from "react";
import { createMotionComponent, makeStyles, motionTokens } from "@fluentui/react-components";
import { layoutTokens } from "../../theme/theme";

const PageEnter = createMotionComponent({
  keyframes: [
    { opacity: 0, transform: "translateY(8px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  duration: motionTokens.durationNormal,
  easing: motionTokens.curveDecelerateMid,
});

const SwapEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationFast,
  easing: motionTokens.curveEasyEase,
});

const useStyles = makeStyles({
  root: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: layoutTokens.sectionGap,
  },
});

export interface PageTransitionProps {
  children: ReactNode;
  motionKey: string;
  variant?: "page" | "swap";
}

export function PageTransition({ children, motionKey, variant = "page" }: PageTransitionProps) {
  const styles = useStyles();
  const Enter = variant === "swap" ? SwapEnter : PageEnter;

  return (
    <Enter key={motionKey}>
      <div className={styles.root}>{children}</div>
    </Enter>
  );
}
