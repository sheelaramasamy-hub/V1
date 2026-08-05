import { Caption2, makeStyles, tokens } from "@fluentui/react-components";
import { HackableMark } from "../shared/HackableMark";
import { motion, transitionFor } from "../../theme/motion";

const useStyles = makeStyles({
  wrap: {
    width: "100%",
    padding: tokens.spacingHorizontalXS,
  },
  /** Figma ".switcher affordance": 70px tall white tile carrying Elevation/Shadow 02. */
  tile: {
    width: "100%",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    border: "none",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    ...transitionFor("box-shadow", motion.feedback),
    ":hover": {
      boxShadow: tokens.shadow8,
    },
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: `calc(-1 * ${tokens.strokeWidthThick})`,
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXXS,
  },
  label: {
    color: "inherit",
    textAlign: "center",
    lineHeight: tokens.lineHeightBase100,
    fontSize: tokens.fontSizeBase100,
  },
});

export function AppSwitcherTile() {
  const styles = useStyles();

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.tile} aria-label="Switch product — currently Hackable 2.0">
        <span className={styles.content}>
          <span style={{ color: tokens.colorBrandForeground1, display: "flex" }}>
            <HackableMark size={20} />
          </span>
          <Caption2 className={styles.label}>
            Hackable
            <br />
            2.0
          </Caption2>
        </span>
      </button>
    </div>
  );
}
