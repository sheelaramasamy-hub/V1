import { buildFanCards } from "./cardFan";

/**
 * Renders a hand of fanned, rounded glass panels around a pivot point — the
 * shared visual motif for every illustration in the app. `colors` is read
 * cyclically across the cards so callers can pass a token-derived sweep
 * (e.g. brand ramp light-to-dark) without this component knowing about theme.
 */
export function FanCards({
  pivotX,
  pivotY,
  count,
  startAngle,
  endAngle,
  minHeight,
  maxHeight,
  riseOffset,
  width,
  colors,
  opacities,
  cornerRadius = 10,
}: {
  pivotX: number;
  pivotY: number;
  count: number;
  startAngle: number;
  endAngle: number;
  minHeight: number;
  maxHeight: number;
  riseOffset: number;
  width: number;
  colors: string[];
  opacities?: number[];
  cornerRadius?: number;
}) {
  const cards = buildFanCards({ count, startAngle, endAngle, minHeight, maxHeight, riseOffset });

  return (
    <g>
      {cards.map((card, i) => (
        <rect
          key={i}
          x={-width / 2}
          y={-(card.riseOffset + card.height)}
          width={width}
          height={card.height}
          rx={cornerRadius}
          fill={colors[i % colors.length]}
          opacity={opacities ? opacities[i % opacities.length] : 1}
          transform={`translate(${pivotX} ${pivotY}) rotate(${card.rotation})`}
        />
      ))}
    </g>
  );
}
