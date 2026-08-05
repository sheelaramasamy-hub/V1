import { makeStyles } from "@fluentui/react-components";
import emptyStateBg from "../../../assets/images/empty-no-items-bg.svg";
import emptyStateMark from "../../../assets/images/empty-no-items-mark.svg";

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "grid",
    placeItems: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
  },
  mark: {
    position: "absolute",
    width: "55%",
  },
});

/**
 * Workshops empty-state artwork — the official "No Items" illustration from
 * the Microsoft Fabric visuals kit's Empty States library (node 661:690),
 * used exactly as designed rather than an approximation.
 */
export function EmptyWorkshopsIllustration({ size = 140 }: { size?: number }) {
  const styles = useStyles();

  return (
    <div className={styles.root} style={{ width: size, height: size }} aria-hidden="true">
      <img src={emptyStateBg} alt="" className={styles.bg} />
      <img src={emptyStateMark} alt="" className={styles.mark} />
    </div>
  );
}
