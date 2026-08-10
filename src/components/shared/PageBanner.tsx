import type { ReactNode } from "react";
import { Button, mergeClasses, makeStyles, tokens } from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  /** Same gradient formula as the home page's WelcomeBanner, so every page opens on the same
      brand moment rather than a plain text header on some pages and a banner on others. */
  root: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXL,
    minHeight: "120px",
    borderRadius: "12px",
    padding: "28px 40px",
    backgroundImage: "linear-gradient(107.6765deg, rgb(2, 49, 45) 1.2466%, rgb(44, 96, 91) 98.587%)",
    "@media (max-width: 640px)": {
      padding: "24px",
    },
  },
  dotTexture: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "40%",
    height: "100%",
    zIndex: 0,
    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.32) 1px, transparent 1.5px)",
    backgroundSize: "13px 13px",
    maskImage: "radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)",
    WebkitMaskImage: "radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
    maxWidth: "68ch",
  },
  eyebrow: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#9bcfcb",
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "28px",
    lineHeight: "36px",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: "rgba(255, 255, 255, 0.76)",
  },
  actions: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexShrink: 0,
  },
  onBrandButton: {
    color: tokens.colorNeutralForegroundOnBrand,
    border: "1px solid rgba(255, 255, 255, 0.42)",
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ":hover:active": {
      backgroundColor: "rgba(255, 255, 255, 0.14)",
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
});

export interface PageBannerProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * The brand-gradient page opener, shared by every catalogue-style screen (All Tracks, Resources,
 * Leaderboard, Workshops, Feedback, Support, FAQ) so the product reads as one shell with many
 * screens rather than a home page that got a banner and everything else that didn't.
 */
export function PageBanner({ eyebrow, title, description, actions }: PageBannerProps) {
  const styles = useStyles();

  return (
    <section className={styles.root} aria-labelledby="page-banner-title">
      <span className={styles.dotTexture} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="page-banner-title" className={styles.title}>
          {title}
        </h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </section>
  );
}

/**
 * A secondary action button styled for the banner's dark gradient — Fluent's own "secondary"
 * appearance assumes a light surface, so a plain white-outline treatment is layered on top.
 */
export function PageBannerButton({ className, ...rest }: ButtonProps) {
  const styles = useStyles();
  return <Button appearance="secondary" className={mergeClasses(styles.onBrandButton, className)} {...rest} />;
}
