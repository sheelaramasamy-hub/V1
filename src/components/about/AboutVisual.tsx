import type { ReactNode } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import peopleGroup from "../../assets/images/people-group-illustration.svg";

export interface VisualTile {
  node: ReactNode;
  /** Position as a percentage of the visual's box, hand-tuned for a designed cluster rather than a strict grid. */
  x: number;
  y: number;
  /** Tile size in px — larger for the tiles meant to read as "closer". */
  size: number;
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  /** The official "People Group" illustration from the Fabric visuals kit — the hackathon's community, front and center. */
  people: {
    position: "absolute",
    left: "18%",
    top: "50%",
    width: "148px",
    height: "148px",
    transform: "translate(-50%, -50%)",
  },
  tile: {
    position: "absolute",
    display: "grid",
    placeItems: "center",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    transform: "translate(-50%, -50%)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      transform: "translate(-50%, -50%) translateY(-3px)",
      boxShadow: tokens.shadow8,
    },
  },
});

/**
 * Backdrop for the About section's product row: the Fabric kit's "People
 * Group" illustration anchoring the hackathon's community theme, with the
 * five product tiles composed as a deliberate cluster around it.
 */
export function AboutVisual({ tiles }: { tiles: VisualTile[] }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img src={peopleGroup} alt="" className={styles.people} aria-hidden="true" />

      {tiles.map((tile, i) => (
        <div
          key={i}
          className={styles.tile}
          style={{ left: `${tile.x}%`, top: `${tile.y}%`, width: tile.size, height: tile.size }}
        >
          {tile.node}
        </div>
      ))}
    </div>
  );
}
