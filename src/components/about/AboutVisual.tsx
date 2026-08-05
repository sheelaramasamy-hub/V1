import type { ReactNode } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { hackableGreen } from "../../theme/brandRamp";
import { HackableMark } from "../shared/HackableMark";

export interface VisualTile {
  node: ReactNode;
  /** Position as a percentage of the visual's box — traces a pentagon around the hub. */
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
  /** Soft radial glow behind the hub, matching the Figma composition's halo. */
  halo: {
    position: "absolute",
    left: "69.77%",
    top: "52.63%",
    width: "260px",
    height: "260px",
    transform: "translate(-50%, -50%)",
    borderRadius: tokens.borderRadiusCircular,
    background: `radial-gradient(circle, ${hackableGreen[150]} 0%, ${hackableGreen[160]}00 70%)`,
    pointerEvents: "none",
  },
  /** Dotted orbit ring the five product tiles sit on, echoing the Figma illustration's structure. */
  orbit: {
    position: "absolute",
    left: "69.77%",
    top: "52.63%",
    width: "160px",
    height: "160px",
    transform: "translate(-50%, -50%)",
    borderRadius: tokens.borderRadiusCircular,
    border: `1.5px dashed ${hackableGreen[130]}`,
    pointerEvents: "none",
  },
  /** Central hub — the Hackable mark, the hackathon's own "product" at the center of everything it connects. */
  hub: {
    position: "absolute",
    left: "69.77%",
    top: "52.63%",
    width: "84px",
    height: "84px",
    transform: "translate(-50%, -50%)",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    display: "grid",
    placeItems: "center",
    color: tokens.colorBrandForeground1,
  },
  /** Decorative, not interactive — no hover motion, which would wrongly imply these are clickable. */
  tile: {
    position: "absolute",
    display: "grid",
    placeItems: "center",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    transform: "translate(-50%, -50%)",
  },
});

/**
 * Backdrop for the About section's product row — a live, token-built "orbit"
 * composition (hub, halo, dotted ring, five product tiles) that follows the
 * structure of the Figma illustration (node 1682:17463) rather than
 * embedding it as a flat raster, so it stays crisp and re-themes for dark
 * mode instead of carrying a fixed light-mode palette baked into a PNG.
 */
export function AboutVisual({ tiles }: { tiles: VisualTile[] }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.orbit} aria-hidden="true" />
      <span className={styles.hub} aria-hidden="true">
        <HackableMark size={34} />
      </span>

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
