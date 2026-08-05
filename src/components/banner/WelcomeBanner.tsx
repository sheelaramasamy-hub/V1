import { makeStyles, tokens } from "@fluentui/react-components";
import { currentUser } from "../../data/banner";
import bannerHero from "../../assets/images/welcome-banner-hero.png";

/**
 * Every value in this file is taken literally from Figma node 1697:18311 —
 * exact gradient stops, exact padding, exact type scale, exact image layer
 * positions/blend modes — rather than approximated against design tokens, per
 * an explicit "100% exactly as in Figma" request for this one component.
 */
const useStyles = makeStyles({
  root: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    backgroundImage: "linear-gradient(107.6765deg, rgb(2, 49, 45) 1.2466%, rgb(44, 96, 91) 98.587%)",
    "@media (max-width: 900px)": {
      flexWrap: "wrap",
    },
  },
  /** "contennt" in Figma — the only element carrying padding; the root itself has none. */
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    flex: "1 1 0",
    minWidth: 0,
    height: "100%",
    padding: "50px",
    zIndex: 1,
    "@media (max-width: 640px)": {
      padding: "32px",
    },
  },
  greeting: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "20px",
    lineHeight: "26px",
    color: "#9bcfcb",
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "32px",
    lineHeight: "40px",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(255, 255, 255, 0.68)",
    maxWidth: "538px",
  },
  /**
   * Halftone texture over the illustration. Not an extractable Figma layer —
   * it's a native texture/noise effect applied inside Figma's own renderer,
   * invisible to node/asset export — so it's reproduced here as a CSS dot
   * grid, positioned and faded to match where it reads in the design.
   */
  dotTexture: {
    position: "absolute",
    left: "40%",
    top: 0,
    width: "45%",
    height: "75%",
    zIndex: 1,
    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1.5px)",
    backgroundSize: "13px 13px",
    maskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
    WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
    pointerEvents: "none",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  /** "image" in Figma — a fixed 654x241 box, no padding, flush to the banner's right/bottom edges. */
  imageBox: {
    position: "relative",
    zIndex: 2,
    flexShrink: 0,
    width: "654px",
    height: "241px",
    "@media (max-width: 900px)": {
      width: "380px",
      height: "auto",
      aspectRatio: "654 / 241",
    },
    "@media (max-width: 640px)": {
      display: "none",
    },
  },
  imageLayer: {
    position: "absolute",
    display: "block",
    pointerEvents: "none",
  },
  /** Bottom-most: the widest, softest glow pass. */
  layerGlowWide: {
    left: "0%",
    top: "-18.67%",
    width: "100%",
    height: "202.49%",
    mixBlendMode: "screen",
  },
  /** Middle: a tighter glow pass at reduced opacity. */
  layerGlowTight: {
    left: "5.96%",
    top: "-9.54%",
    width: "93.88%",
    height: "190.46%",
    mixBlendMode: "screen",
    opacity: 0.51,
  },
  /** Top-most: the sharp, normally-blended artwork — what actually reads as the illustration. */
  layerSharp: {
    left: "5.96%",
    top: "-9.54%",
    width: "93.88%",
    height: "190.05%",
  },
  layerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "bottom",
    display: "block",
  },
});

export function WelcomeBanner() {
  const styles = useStyles();

  return (
    <section className={styles.root} aria-labelledby="welcome-title">
      <div className={styles.content}>
        <p className={styles.greeting}>Hello, {currentUser.firstName}</p>
        <h1 id="welcome-title" className={styles.title}>
          Welcome to HCL hackathon
        </h1>
        <p className={styles.description}>
          Join us at the HCL Hackathon, a dynamic event where innovators collaborate to solve challenges and create
          cutting-edge solutions.
        </p>
      </div>

      <span className={styles.dotTexture} aria-hidden="true" />

      <div className={styles.imageBox}>
        <div className={`${styles.imageLayer} ${styles.layerGlowWide}`}>
          <img src={bannerHero} alt="" className={styles.layerImg} />
        </div>
        <div className={`${styles.imageLayer} ${styles.layerGlowTight}`}>
          <img src={bannerHero} alt="" className={styles.layerImg} />
        </div>
        <div className={`${styles.imageLayer} ${styles.layerSharp}`}>
          <img src={bannerHero} alt="" className={styles.layerImg} />
        </div>
      </div>
    </section>
  );
}
