import { tokens } from "@fluentui/react-components";

/**
 * High-density workshop artwork in the Fabric visual language: layered product
 * surfaces, soft dimensional color, rounded geometry, and no baked-in text.
 */
export function EmptyWorkshopsIllustration({ width = 260 }: { width?: number }) {
  const height = (170 / 260) * width;

  return (
    <svg width={width} height={height} viewBox="0 0 260 170" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="workshopSurface" x1="42" y1="24" x2="214" y2="144" gradientUnits="userSpaceOnUse">
          <stop stopColor={tokens.colorNeutralBackground1} />
          <stop offset="1" stopColor={tokens.colorNeutralBackground3} />
        </linearGradient>
        <linearGradient id="fabricTeal" x1="52" y1="31" x2="191" y2="139" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7cf2d4" />
          <stop offset="1" stopColor="#117865" />
        </linearGradient>
        <linearGradient id="fabricBlue" x1="152" y1="34" x2="209" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8fd7ff" />
          <stop offset="1" stopColor="#3e42b8" />
        </linearGradient>
        <linearGradient id="fabricViolet" x1="83" y1="95" x2="129" y2="141" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c6b8ff" />
          <stop offset="1" stopColor="#5b5fc7" />
        </linearGradient>
        <filter id="softShadow" x="0" y="0" width="260" height="170" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0b1f24" floodOpacity="0.14" />
        </filter>
      </defs>

      <ellipse cx="130" cy="148" rx="91" ry="7" fill={tokens.colorNeutralBackground4} />

      <g filter="url(#softShadow)">
        <rect x="48" y="28" width="164" height="112" rx="14" fill="url(#workshopSurface)" />
        <rect x="49" y="29" width="162" height="110" rx="13" stroke={tokens.colorNeutralStroke2} strokeWidth="1.5" />
      </g>

      <path d="M64 48c0-5.5 4.5-10 10-10h72c5.5 0 10 4.5 10 10v42H64V48Z" fill={tokens.colorNeutralBackground1} />
      <path d="M64 56h92" stroke={tokens.colorNeutralStroke2} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="77" y="69" width="22" height="10" rx="5" fill="#8fb7ba" />
      <rect x="106" y="69" width="35" height="10" rx="5" fill={tokens.colorNeutralBackground5} />
      <rect x="77" y="86" width="64" height="7" rx="3.5" fill={tokens.colorNeutralBackground5} />

      <g>
        <path d="M169 46h28c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8h-28c-4.4 0-8-3.6-8-8V54c0-4.4 3.6-8 8-8Z" fill="url(#fabricBlue)" />
        <path d="M174 60h16l8 8-8 8h-16l8-8-8-8Z" fill="white" opacity="0.86" />
      </g>

      <g>
        <rect x="80" y="104" width="58" height="32" rx="8" fill="url(#fabricViolet)" />
        <path d="M93 118h32" stroke="white" strokeOpacity="0.78" strokeWidth="3" strokeLinecap="round" />
        <path d="M93 127h19" stroke="white" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g>
        <path d="M150 107h45a7 7 0 0 1 7 7v18h-59v-18a7 7 0 0 1 7-7Z" fill={tokens.colorNeutralBackground1} />
        <path d="M140 132h65" stroke={tokens.colorNeutralStroke1} strokeWidth="3" strokeLinecap="round" />
        <circle cx="163" cy="119" r="5" fill="url(#fabricTeal)" />
      </g>

      <g>
        <circle cx="43" cy="115" r="16" fill="#e8f8f4" />
        <path d="M37 117c4-19 17-30 17-30s2 19-5 32c-3 6-12 5-12-2Z" fill="url(#fabricTeal)" />
        <path d="M48 120c-2-16-13-24-13-24s-4 15 1 26c2 6 13 5 12-2Z" fill="#8fd7ff" opacity="0.9" />
      </g>

      <g>
        <circle cx="222" cy="118" r="15" fill="#eef3ff" />
        <rect x="212" y="110" width="20" height="22" rx="6" fill={tokens.colorNeutralBackground1} stroke={tokens.colorNeutralStroke2} />
        <path d="M232 116h5a5 5 0 0 1 0 10h-5" stroke="#8fb7ba" strokeWidth="2" strokeLinecap="round" />
        <path d="M216 108c0-5 4-8 4-8M224 108c0-5 4-8 4-8" stroke="#245f68" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g opacity="0.95">
        <rect x="113" y="24" width="9" height="18" rx="4.5" fill="#245f68" opacity="0.32" />
        <rect x="129" y="20" width="9" height="22" rx="4.5" fill="#245f68" opacity="0.45" />
        <rect x="145" y="24" width="9" height="18" rx="4.5" fill="#245f68" opacity="0.32" />
      </g>
    </svg>
  );
}
