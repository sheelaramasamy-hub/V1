import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { hackableGreen } from "../../theme/brandRamp";
import { currentUser } from "../../data/banner";
import bannerHero from "../../assets/images/welcome-banner-hero.png";

const useStyles = makeStyles({
  /**
   * Figma node 1643:54202. The gradient is built from the brand ramp's dark
   * stops rather than literal hexes, so it stays a single source of truth with
   * the rest of the brand and holds its contrast in both themes.
   */
  root: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: tokens.borderRadiusXLarge,
    paddingLeft: tokens.spacingHorizontalXXXL,
    paddingRight: "48px",
    paddingBlock: tokens.spacingVerticalXXXL,
    backgroundImage: `linear-gradient(108.39deg, ${hackableGreen[20]} 0%, ${hackableGreen[50]} 100%)`,
    "@media (max-width: 900px)": {
      flexWrap: "wrap",
      gap: tokens.spacingVerticalXXL,
      paddingRight: tokens.spacingHorizontalXXXL,
    },
  },
  copy: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    maxWidth: "560px",
  },
  /** Figma: Segoe UI Bold 18px in the brand's light tint. */
  greeting: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: hackableGreen[140],
  },
  /** Figma: Segoe UI Semibold ~21px, tight tracking, on-brand foreground. */
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase600,
    letterSpacing: "-0.37px",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  /** Figma: Segoe UI Regular 12px at 68% opacity over the gradient. */
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForegroundOnBrand,
    opacity: 0.68,
  },
  /** Oversized translucent ring echoing the Figma decoration. */
  ring: {
    position: "absolute",
    right: "68px",
    top: "28px",
    width: "344px",
    height: "344px",
    borderRadius: tokens.borderRadiusCircular,
    border: "42px solid rgba(255, 255, 255, 0.06)",
    pointerEvents: "none",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  /**
   * The exact hero illustration from Figma (node 1682:16911), reproduced with
   * its own three-layer glow technique: a larger blurred duplicate behind the
   * sharp artwork, plus a screen-blended sheen on top — same asset, three
   * treatments, exactly as Figma composed it. The PNG carries real alpha
   * transparency, so it sits directly on the banner gradient with no card.
   */
  illustrationStack: {
    position: "relative",
    zIndex: 1,
    flexShrink: 0,
    alignSelf: "flex-end",
    width: "420px",
    // A concrete height, not 100%: `.root` sizes to its content (no definite
    // height), so a percentage here resolved to 0. Taller than the banner on
    // purpose — bottom-anchored via `alignSelf` and `object-position: bottom`
    // on the images, with the excess clipped by `.root`'s overflow: hidden,
    // matching how Figma crops this illustration at the banner's top edge.
    height: "260px",
    "@media (max-width: 900px)": {
      width: "260px",
      height: "170px",
    },
    "@media (max-width: 560px)": {
      display: "none",
    },
  },
  /** Shared by all three layers; deliberately excludes position offsets so each layer sets its own without fighting over class-merge order. */
  illustrationImage: {
    position: "absolute",
    objectFit: "contain",
    objectPosition: "bottom",
    display: "block",
    pointerEvents: "none",
  },
  illustrationBase: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  illustrationGlow: {
    top: "-8%",
    left: "-8%",
    width: "116%",
    height: "116%",
    mixBlendMode: "screen",
    filter: "blur(18px)",
    opacity: 0.85,
  },
  illustrationSheen: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    mixBlendMode: "screen",
    opacity: 0.51,
  },
});

export function WelcomeBanner() {
  const styles = useStyles();

  return (
    <section className={styles.root} aria-labelledby="welcome-title">
      <div className={styles.copy}>
        <p className={styles.greeting}>Hello, {currentUser.firstName}</p>
        <h1 id="welcome-title" className={styles.title}>
          Welcome to HCL hackathon
        </h1>
        <p className={styles.description}>
          Join us at the HCL Hackathon, a dynamic event where innovators collaborate to solve challenges and create
          cutting-edge solutions.
        </p>
      </div>
      <span className={styles.ring} aria-hidden="true" />
      <div className={styles.illustrationStack}>
        <img
          src={bannerHero}
          alt=""
          className={mergeClasses(styles.illustrationImage, styles.illustrationGlow)}
        />
        <img src={bannerHero} alt="" className={mergeClasses(styles.illustrationImage, styles.illustrationBase)} />
        <img src={bannerHero} alt="" className={mergeClasses(styles.illustrationImage, styles.illustrationSheen)} />
      </div>
    </section>
  );
}
