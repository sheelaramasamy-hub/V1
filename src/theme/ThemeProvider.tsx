import { FluentProvider } from "@fluentui/react-components";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AppThemeContext } from "./theme-context";
import type { AppThemeValue, ColorSchemePreference, ResolvedColorScheme } from "./theme-context";
import { appDarkTheme, appLightTheme } from "./theme";

const STORAGE_KEY = "hackable.colorScheme";

/** localStorage throws in private-mode Safari and when storage is full. Never crash the app for a preference. */
function readStored(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStored(value: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Preference is not worth an error boundary. */
  }
}

const isColorSchemePreference = (value: string | null): value is ColorSchemePreference =>
  value === "light" || value === "dark" || value === "system";

export interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Owns the app's color scheme: resolves "system" against the OS preference, persists the
 * user's choice, and hands the resolved Fluent theme to `FluentProvider`.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorSchemePreference, setPreference] = useState<ColorSchemePreference>(() => {
    const stored = readStored();
    return isColorSchemePreference(stored) ? stored : "system";
  });

  const [systemScheme, setSystemScheme] = useState<ResolvedColorScheme>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent): void => {
      setSystemScheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const colorScheme: ResolvedColorScheme = colorSchemePreference === "system" ? systemScheme : colorSchemePreference;
  const resolvedTheme = colorScheme === "dark" ? appDarkTheme : appLightTheme;

  /*
   * Keeps the document surface in step with the theme.
   *
   * `useLayoutEffect`, not `useEffect`: an effect runs *after* paint, so for one frame the
   * document background was still the previous theme's color while the app surface had already
   * switched — a visible flash on every toggle.
   *
   * The `data-theme-switching` attribute disables transitions for that frame (see index.css),
   * so the swap is instant instead of every shadow, color, and transform easing independently.
   *
   * Cleared by a `setTimeout`, not `requestAnimationFrame`: browsers pause rAF callbacks in
   * backgrounded/non-visible tabs, so a theme switch that happens (or finishes rendering) while
   * the tab isn't in the foreground would leave the attribute — and every transition in the
   * app — stuck off indefinitely. A short timeout still clears well within one frame in the
   * common case but keeps firing regardless of tab visibility.
   */
  useLayoutEffect(() => {
    const root = document.documentElement;

    root.dataset.themeSwitching = "true";
    root.style.colorScheme = colorScheme;
    root.style.backgroundColor = resolvedTheme.colorNeutralBackground4;

    const timer = setTimeout(() => {
      delete root.dataset.themeSwitching;
    }, 32);

    return () => clearTimeout(timer);
  }, [resolvedTheme, colorScheme]);

  const handleSetPreference = useCallback((preference: ColorSchemePreference) => {
    setPreference(preference);
    writeStored(preference);
  }, []);

  const value = useMemo<AppThemeValue>(
    () => ({
      colorSchemePreference,
      colorScheme,
      resolvedTheme,
      setColorSchemePreference: handleSetPreference,
    }),
    [colorSchemePreference, colorScheme, resolvedTheme, handleSetPreference],
  );

  return (
    <AppThemeContext.Provider value={value}>
      <FluentProvider theme={resolvedTheme} style={{ minHeight: "100%" }}>
        {children}
      </FluentProvider>
    </AppThemeContext.Provider>
  );
}
