/**
 * The Hackable 2.0 product mark, exported from the Figma side-nav switcher
 * (node 162:18156). Fills use `currentColor` so the mark takes the brand token
 * from whatever surface renders it and stays legible across themes.
 */
export function HackableMark({ size = 20 }: { size?: number }) {
  const height = (23.0769 / 20) * size;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 20 23.0769"
      fill="none"
      role="img"
      aria-label="Hackable 2.0"
      focusable="false"
    >
      <path d="M0.0957031 2.60547H4.5622V20.4715L0.0957031 18.4243V2.60547Z" fill="currentColor" />
      <path d="M7.54102 0H12.0075V10.0496H7.54102V0Z" fill="currentColor" />
      <path d="M7.54102 13.0273H12.0075V23.077H7.54102V13.0273Z" fill="currentColor" />
      <path d="M19.8219 2.60547H15.3555V20.4715L19.8219 18.4243V2.60547Z" fill="currentColor" />
    </svg>
  );
}
