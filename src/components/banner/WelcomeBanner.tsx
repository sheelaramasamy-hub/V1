import { makeStyles, tokens } from "@fluentui/react-components";
import { currentUser } from "../../data/banner";
import bannerHero from "../../assets/images/welcome-banner-hero.png";

const useStyles = makeStyles({
  root: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 654px)",
    alignItems: "stretch",
    height: "240px",
    borderRadius: "12px",
    backgroundImage: "linear-gradient(107.6765deg, rgb(2, 49, 45) 1.2466%, rgb(44, 96, 91) 98.587%)",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "10px",
    minWidth: 0,
    padding: "24px 50px",
    zIndex: 1,
    "@media (max-width: 640px)": {
      padding: "24px",
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
    maxWidth: "538px",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(255, 255, 255, 0.68)",
  },
  imageBox: {
    position: "relative",
    minWidth: 0,
    height: "240px",
    overflow: "hidden",
    "@media (max-width: 900px)": {
      minHeight: "180px",
    },
    "@media (max-width: 640px)": {
      display: "none",
    },
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: 0,
    display: "block",
    width: "min(654px, 100%)",
    height: "auto",
    maxHeight: "100%",
    objectFit: "contain",
    objectPosition: "right bottom",
    pointerEvents: "none",
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
      <div className={styles.imageBox}>
        <img src={bannerHero} alt="" className={styles.image} />
      </div>
    </section>
  );
}


