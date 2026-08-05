import type { ReactNode } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { hackableGreen } from "../../theme/brandRamp";
import { FanCards } from "../shared/illustrations/FanCards";
import { GlowHalo } from "../shared/illustrations/GlowHalo";

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
 * Backdrop for the About section's product row: a fan of glass panels (the
 * same motif as the banner and Workshops illustrations) with the product
 * tiles composed as a deliberate cluster on top, rather than scattered at
 * random — each tile sized by how "close" it should read.
 */
export function AboutVisual({ tiles }: { tiles: VisualTile[] }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <svg width="100%" height="100%" viewBox="0 0 430 228" fill="none" aria-hidden="true" focusable="false">
        <GlowHalo cx={330} cy={70} r={140} color={hackableGreen[110]} opacity={0.16} />

        <FanCards
          pivotX={372}
          pivotY={222}
          count={7}
          startAngle={-64}
          endAngle={18}
          minHeight={56}
          maxHeight={128}
          riseOffset={8}
          width={30}
          colors={[hackableGreen[150], hackableGreen[140], hackableGreen[130]]}
          opacities={[0.3, 0.45, 0.6, 0.75, 0.6, 0.45, 0.3]}
          cornerRadius={10}
        />

        <circle cx="52" cy="52" r="3" fill={hackableGreen[100]} opacity="0.4" />
        <circle cx="30" cy="120" r="2" fill={hackableGreen[100]} opacity="0.35" />
        <circle cx="92" cy="30" r="2" fill={hackableGreen[100]} opacity="0.3" />
      </svg>

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
