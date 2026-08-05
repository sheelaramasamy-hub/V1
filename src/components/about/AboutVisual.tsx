import { makeStyles } from "@fluentui/react-components";
import aboutIllustration from "../../assets/images/about-hackathon-illustration.png";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
});

/**
 * The exact "About Your Hackathon" illustration from Figma (node 1682:17463)
 * — the hackathon's five core products orbiting the Hackable mark.
 */
export function AboutVisual() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img src={aboutIllustration} alt="" className={styles.image} aria-hidden="true" />
    </div>
  );
}
