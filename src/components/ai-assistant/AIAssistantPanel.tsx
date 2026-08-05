import {
  Body1,
  Button,
  Caption1,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Input,
  makeStyles,
  OverlayDrawer,
  Subtitle2,
  tokens,
} from "@fluentui/react-components";
import type { FluentIcon } from "@fluentui/react-icons";
import { Board20Regular, BookOpen20Regular, Dismiss24Regular, Headset20Regular, History20Regular, Send20Regular, Sparkle20Regular, Trophy20Regular } from "@fluentui/react-icons";
import { assistantGreeting, quickActions, recentConversations, suggestedPrompts } from "../../data/aiAssistant";
import type { QuickAction } from "../../types/aiAssistant";
import { motion, transitionFor } from "../../theme/motion";

const quickActionIcons: Record<QuickAction["icon"], FluentIcon> = {
  workshops: Board20Regular,
  achievements: Trophy20Regular,
  support: Headset20Regular,
  learning: BookOpen20Regular,
};

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
  },
  greeting: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-start",
  },
  greetingIcon: {
    flexShrink: 0,
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusCircular,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  greetingText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  sectionTitle: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  promptList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  promptButton: {
    justifyContent: "flex-start",
    textAlign: "left",
    height: "auto",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  conversationList: {
    display: "flex",
    flexDirection: "column",
  },
  conversationRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} 0`,
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    ...transitionFor("background-color", motion.feedback),
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  conversationText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalS,
  },
  quickActionButton: {
    justifyContent: "flex-start",
  },
  composer: {
    marginTop: "auto",
    display: "flex",
    gap: tokens.spacingHorizontalS,
    position: "sticky",
    bottom: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: tokens.spacingVerticalS,
  },
  composerInput: {
    flexGrow: 1,
  },
});

export function AIAssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const styles = useStyles();

  return (
    <OverlayDrawer
      position="end"
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
      size="medium"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close AI Assistant" icon={<Dismiss24Regular />} onClick={onClose} />
          }
        >
          AI Assistant
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.body}>
        <div className={styles.greeting}>
          <span className={styles.greetingIcon}>
            <Sparkle20Regular />
          </span>
          <div className={styles.greetingText}>
            <Subtitle2>{assistantGreeting.title}</Subtitle2>
            <Body1>{assistantGreeting.subtitle}</Body1>
          </div>
        </div>

        <Divider />

        <div>
          <Caption1 className={styles.sectionTitle}>Suggested prompts</Caption1>
          <div className={styles.promptList} style={{ marginTop: tokens.spacingVerticalS }}>
            {suggestedPrompts.map((prompt) => (
              <Button key={prompt.id} appearance="outline" className={styles.promptButton}>
                {prompt.label}
              </Button>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <Caption1 className={styles.sectionTitle}>Recent conversations</Caption1>
          <div className={styles.conversationList} style={{ marginTop: tokens.spacingVerticalS }}>
            {recentConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={styles.conversationRow}
                style={{ border: "none", background: "none", width: "100%" }}
              >
                <History20Regular />
                <span className={styles.conversationText}>
                  <Body1>{conversation.title}</Body1>
                  <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>{conversation.timestamp}</Caption1>
                </span>
              </button>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <Caption1 className={styles.sectionTitle}>Quick actions</Caption1>
          <div className={styles.quickActionsGrid} style={{ marginTop: tokens.spacingVerticalS }}>
            {quickActions.map((action) => {
              const Icon = quickActionIcons[action.icon];
              return (
                <Button key={action.id} appearance="secondary" icon={<Icon />} className={styles.quickActionButton}>
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className={styles.composer}>
          <Input
            className={styles.composerInput}
            placeholder="Ask the Hackable Assistant…"
            aria-label="Message the AI Assistant"
          />
          <Button appearance="primary" icon={<Send20Regular />} aria-label="Send message" />
        </div>
      </DrawerBody>
    </OverlayDrawer>
  );
}
