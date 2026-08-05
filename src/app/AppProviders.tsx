import type { ReactNode } from "react";
import { FluentProvider } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";
import { appDarkTheme, appLightTheme } from "../theme/theme";
import { useThemeMode } from "../hooks/useThemeMode";

export function AppProviders({ children }: { children: ReactNode }) {
  const mode = useThemeMode();

  return (
    <FluentProvider
      theme={mode === "dark" ? appDarkTheme : appLightTheme}
      style={{ minHeight: "100%" }}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </FluentProvider>
  );
}
