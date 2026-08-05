import { tokens } from "@fluentui/react-components";
import { hackableGreen } from "../../../theme/brandRamp";
import { FanCards } from "./FanCards";
import { GlowHalo } from "./GlowHalo";

/**
 * Workshops empty-state artwork — the same fanned-glass-panel motif as the
 * banner and About illustrations, scaled down, with the foremost panel drawn
 * as a calendar face (sparse dots = "nothing scheduled yet") so the meaning
 * stays legible without a literal desk-scene illustration.
 */
export function EmptyWorkshopsIllustration({ width = 220 }: { width?: number }) {
  const height = (140 / 220) * width;

  return (
    <svg width={width} height={height} viewBox="0 0 220 140" fill="none" aria-hidden="true" focusable="false">
      <GlowHalo cx={130} cy={62} r={90} color={hackableGreen[100]} opacity={0.16} />

      <FanCards
        pivotX={150}
        pivotY={132}
        count={5}
        startAngle={-56}
        endAngle={18}
        minHeight={40}
        maxHeight={92}
        riseOffset={6}
        width={24}
        colors={[hackableGreen[150], hackableGreen[140], hackableGreen[130]]}
        opacities={[0.35, 0.55, 0.75, 0.55, 0.35]}
        cornerRadius={8}
      />

      {/* Foreground calendar face — front-and-center, reading as the "hero" card of the fan */}
      <g transform="translate(72 34)">
        <rect
          width="76"
          height="80"
          rx="10"
          fill={tokens.colorNeutralBackground1}
          stroke={tokens.colorNeutralStroke2}
          strokeWidth="1.5"
        />
        <path d="M0 18a10 10 0 0 1 10-10h56a10 10 0 0 1 10 10v6H0v-6Z" fill={hackableGreen[130]} />
        <rect x="16" y="-4" width="5" height="14" rx="2.5" fill={hackableGreen[70]} />
        <rect x="55" y="-4" width="5" height="14" rx="2.5" fill={hackableGreen[70]} />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={14 + col * 16}
              cy={40 + row * 14}
              r="2.6"
              fill={row === 1 && col === 2 ? hackableGreen[90] : tokens.colorNeutralBackground4}
            />
          )),
        )}
      </g>

      <circle cx="38" cy="30" r="3" fill={hackableGreen[100]} opacity="0.4" />
      <circle cx="26" cy="80" r="2" fill={hackableGreen[100]} opacity="0.35" />
      <circle cx="188" cy="46" r="2.4" fill={hackableGreen[100]} opacity="0.3" />
    </svg>
  );
}
