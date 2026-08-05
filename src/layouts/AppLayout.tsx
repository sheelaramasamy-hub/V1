import { Outlet } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import { TopBar } from "../components/layout/TopBar";
import { SideNav } from "../components/navigation/SideNav";
import { AIAssistantPanel } from "../components/ai-assistant/AIAssistantPanel";
import { useDisclosure } from "../hooks/useDisclosure";
import { layoutTokens } from "../theme/theme";

const useStyles = makeStyles({
  /** Matches the chrome (top bar + side nav) so there's no seam at the shell's outer edge. */
  shell: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground4,
  },
  body: {
    display: "flex",
    alignItems: "flex-start",
  },
  /**
   * Figma's Content frame (node 1671:16334) is its own elevated surface —
   * colorNeutralBackground2 with Elevation Shadow 08 — not transparent chrome.
   * Individual cards inside still carry their own Shadow 04/08 on top of it.
   */
  content: {
    flexGrow: 1,
    minWidth: 0,
    minHeight: `calc(100vh - ${layoutTokens.topBarHeight})`,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow8,
    paddingInline: layoutTokens.contentPaddingInline,
    paddingTop: layoutTokens.contentPaddingBlockStart,
    paddingBottom: layoutTokens.contentPaddingBlockEnd,
    "@media (max-width: 640px)": {
      paddingInline: tokens.spacingHorizontalL,
      paddingTop: tokens.spacingVerticalL,
    },
  },
  contentInner: {
    display: "flex",
    flexDirection: "column",
    gap: layoutTokens.sectionGap,
  },
});

export function AppLayout() {
  const styles = useStyles();
  const assistant = useDisclosure();

  return (
    <div className={styles.shell}>
      <TopBar onOpenAssistant={assistant.open} />
      <div className={styles.body}>
        <SideNav />
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </main>
      </div>
      <AIAssistantPanel open={assistant.isOpen} onClose={assistant.close} />
    </div>
  );
}
