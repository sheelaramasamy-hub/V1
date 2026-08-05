import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

const QUERY = "(prefers-color-scheme: dark)";

/**
 * Follows the OS/browser color-scheme preference. Because every surface in the
 * app is styled with Fluent design tokens, switching the theme object handed to
 * FluentProvider is all that's needed for the whole dashboard to re-theme.
 */
export function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>(() =>
    typeof window !== "undefined" && window.matchMedia(QUERY).matches ? "dark" : "light",
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setMode(event.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return mode;
}
