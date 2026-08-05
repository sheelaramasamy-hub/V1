import { hackableGreen } from "../../../theme/brandRamp";
import { FanCards } from "./FanCards";
import { GlowHalo } from "./GlowHalo";
import { PersonSilhouette } from "./PersonSilhouette";

/**
 * Welcome banner artwork — a fan of glass panels catching light against the
 * brand gradient, in the same family as the About/Workshops illustrations.
 * Built as pure SVG on Fluent tokens (rather than the original raster export)
 * so it stays crisp at any size and re-themes correctly in dark mode instead
 * of carrying a fixed light-mode palette baked into a PNG.
 */
export function HeroIllustration({ width = 460 }: { width?: number }) {
  const height = (240 / 460) * width;

  return (
    <svg width={width} height={height} viewBox="0 0 460 240" fill="none" aria-hidden="true" focusable="false">
      <GlowHalo cx={330} cy={120} r={150} color="#ffffff" opacity={0.16} />

      {/* Back layer: cool, low-opacity glass panels */}
      <FanCards
        pivotX={300}
        pivotY={214}
        count={7}
        startAngle={-58}
        endAngle={30}
        minHeight={70}
        maxHeight={168}
        riseOffset={10}
        width={40}
        colors={["#ffffff"]}
        opacities={[0.14, 0.2, 0.28, 0.36, 0.28, 0.2, 0.14]}
        cornerRadius={12}
      />

      {/* Front accent: two saturated brand panels for depth and a focal point */}
      <FanCards
        pivotX={300}
        pivotY={214}
        count={2}
        startAngle={-18}
        endAngle={4}
        minHeight={132}
        maxHeight={150}
        riseOffset={10}
        width={38}
        colors={[hackableGreen[110], hackableGreen[130]]}
        opacities={[0.92, 0.85]}
        cornerRadius={12}
      />

      <circle cx="204" cy="88" r="7" fill="#ffffff" opacity="0.5" />
      <circle cx="418" cy="150" r="4" fill="#ffffff" opacity="0.4" />

      <PersonSilhouette x={252} y={158} scale={0.9} color="#ffffff" opacity={0.75} />
      <PersonSilhouette x={276} y={172} scale={0.75} color="#ffffff" opacity={0.55} />
    </svg>
  );
}
