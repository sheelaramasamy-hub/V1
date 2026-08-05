import { Outlet } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import { TopBar } from "../components/layout/TopBar";
import { SideNav } from "../components/navigation/SideNav";
import { AIAssistantPanel } from "../components/ai-assistant/AIAssistantPanel";
import { useDisclosure } from "../hooks/useDisclosure";
import { layoutTokens } from "../theme/theme";

const useStyles = makeStyles({
  shell: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  body: {
    display: "flex",
    alignItems: "flex-start",
  },
  /** Figma content frame: 40px side gutters, 40px top, generous bottom padding. */
  content: {
    flexGrow: 1,
    minWidth: 0,
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

