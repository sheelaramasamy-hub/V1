// Generator for the Fluent UI BrandVariants ramp (16 stops: 10 darkest -> 160 lightest),
// anchored to the exact brand green pulled from Figma's design tokens
// (colorBrandBackground / colorBrandForeground1 / colorCompoundBrandStroke = #117865,
// see node 1620:1469 via get_variable_defs). Shade 80 below equals that exact value;
// every other stop is interpolated in HSL space around it.
// Run with: node scripts/generate-brand-ramp.mjs
// Paste the printed object into src/theme/brandRamp.ts if the anchor color ever changes.

const ANCHOR_HEX = "#117865";

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

const anchor = hexToHsl(ANCHOR_HEX);
const stopNames = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
// Lightness curve with the shade-80 slot pinned to the anchor's exact lightness.
const LIGHTNESS_STEPS = [6, 9, 12, 15, 18, 21, 24, anchor.l, 32, 40, 48, 58, 68, 78, 87, 95];

const ramp = {};
stopNames.forEach((name, i) => {
  ramp[name] = name === 80 ? ANCHOR_HEX.toUpperCase() : hslToHex(anchor.h, anchor.s, LIGHTNESS_STEPS[i]);
});

console.log(JSON.stringify(ramp, null, 2));
