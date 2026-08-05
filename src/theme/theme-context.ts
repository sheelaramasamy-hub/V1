import { createContext, useContext } from "react";
import type { Theme } from "@fluentui/react-components";

export type ColorSchemePreference = "light" | "dark" | "system";
export type ResolvedColorScheme = "light" | "dark";

export interface AppThemeValue {
  /** What the user asked for, including "follow the OS". */
  colorSchemePreference: ColorSchemePreference;
  /** What that resolves to right now. */
  colorScheme: ResolvedColorScheme;
  /** The active Fluent theme object, already resolved for `colorScheme`. */
  resolvedTheme: Theme;
  setColorSchemePreference: (preference: ColorSchemePreference) => void;
}

export const AppThemeContext = createContext<AppThemeValue | null>(null);

/**
 * Reads the active color-scheme preference and resolved Fluent theme.
 *
 * @throws If called outside `<ThemeProvider>`, which is always a wiring mistake.
 */
export function useAppTheme(): AppThemeValue {
  const value = useContext(AppThemeContext);

  if (!value) {
    throw new Error("useAppTheme must be used inside <ThemeProvider>.");
  }

  return value;
}
