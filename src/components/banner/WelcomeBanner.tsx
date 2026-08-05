import { makeStyles, tokens } from "@fluentui/react-components";
import { hackableGreen } from "../../theme/brandRamp";
import { currentUser } from "../../data/banner";
import fabricHero from "../../assets/images/fabric-hero-01.png";

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
   * Frames the official Microsoft Fabric 3D visual ("Fabric 01" from the
   * Fabric visuals kit) in a light card, the way Fabric's own marketing
   * surfaces present these renders — rather than fighting the asset's white
   * background against the banner's dark gradient with a blend mode.
   */
  illustrationFrame: {
    position: "relative",
    zIndex: 1,
    flexShrink: 0,
    width: "300px",
    height: "210px",
    borderRadius: tokens.borderRadiusLarge,
    overflow: "hidden",
    boxShadow: tokens.shadow16,
    "@media (max-width: 900px)": {
      width: "220px",
      height: "154px",
    },
    "@media (max-width: 560px)": {
      display: "none",
    },
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "82% 55%",
    display: "block",
    transform: "scale(1.3)",
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
      <div className={styles.illustrationFrame}>
        <img src={fabricHero} alt="" className={styles.illustrationImage} />
      </div>
    </section>
  );
}
