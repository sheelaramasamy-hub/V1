import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { ChevronDown12Regular, Globe20Regular, GridDots20Regular } from "@fluentui/react-icons";
import { ChatIcon } from "./ChatIcon";
import { PartnerLogo } from "./PartnerLogo";
import { MicrosoftMark } from "./MicrosoftMark";
import { layoutTokens } from "../../theme/theme";

const useStyles = makeStyles({
  /**
   * Figma's suite header has no fill of its own (colorSubtleBackground
   * resolves to transparent on this node) and no drop shadow — it just sits
   * on the page canvas alongside the side nav. Only the content cards below
   * carry a background + elevation.
   */
  root: {
    height: layoutTokens.topBarHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: tokens.spacingHorizontalXXL,
    backgroundColor: "transparent",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  lockup: {
    display: "flex",
    alignItems: "center",
  },
  waffle: {
    minWidth: layoutTokens.sideNavWidth,
    width: layoutTokens.sideNavWidth,
    height: layoutTokens.topBarHeight,
    borderRadius: 0,
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  divider: {
    width: "1px",
    height: "15px",
    backgroundColor: tokens.colorNeutralForeground1,
    flexShrink: 0,
  },
  msLockup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  /** Figma: Segoe UI Semibold 12/20 in colorNeutralForeground1 (Caption 1 Strong scale). */
  suiteText: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
  collapsible: {
    "@media (max-width: 640px)": {
      display: "none",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXL,
  },
  utilityGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalXXL,
  },
  resetButton: {
    display: "flex",
    alignItems: "center",
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },
  languageTrigger: {
    gap: tokens.spacingHorizontalSNudge,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground1,
  },
  /** Figma: Segoe UI Semibold 14/20 (Body 1 Strong). */
  languageLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  profileTrigger: {
    gap: tokens.spacingHorizontalS,
    height: "32px",
    borderRadius: tokens.borderRadiusCircular,
    color: tokens.colorNeutralForeground1,
  },
  /**
   * Copilot entry point. The pastel gradient + inner highlight is a deliberate
   * brand-moment lifted from Figma (node 1620:1494); it is the one surface in
   * the shell that is intentionally not a neutral token.
   */
  chatPill: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusCircular,
    border: "none",
    cursor: "pointer",
    backgroundImage:
      "linear-gradient(162.32deg, rgb(163, 189, 255) 6.7888%, rgb(192, 225, 255) 39.014%, rgb(185, 237, 227) 83.944%)",
    boxShadow: "inset 0 0 4px 0 rgba(255, 255, 255, 0.56)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      transform: "translateY(-1px)",
    },
    ":active": {
      transform: "translateY(0)",
    },
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
    "@media (forced-colors: active)": {
      border: `${tokens.strokeWidthThin} solid ButtonText`,
    },
  },
  chatLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorBrandForeground1,
    padding: `0 ${tokens.spacingHorizontalXS}`,
  },
});

export function TopBar({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <div className={styles.lockup}>
        <Button
          appearance="subtle"
          className={styles.waffle}
          icon={<GridDots20Regular />}
          aria-label="App launcher"
        />
        <div className={styles.logoGroup}>
          <PartnerLogo height={10} />
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.msLockup}>
            <MicrosoftMark size={17} />
            <span className={styles.suiteText}>Microsoft</span>
          </div>
          <span className={mergeClasses(styles.divider, styles.collapsible)} aria-hidden="true" />
          <span className={mergeClasses(styles.suiteText, styles.collapsible)}>Global Partner Hackathons</span>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.utilityGroup}>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <button
                type="button"
                className={mergeClasses(styles.resetButton, styles.languageTrigger)}
                aria-label="Change language, currently English"
              >
                <Globe20Regular fontSize={18} />
                <span className={styles.languageLabel}>EN</span>
              </button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>English</MenuItem>
                <MenuItem>Español</MenuItem>
                <MenuItem>Français</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>

          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <button
                type="button"
                className={mergeClasses(styles.resetButton, styles.profileTrigger)}
                aria-label="Account manager for Priya Hariharan"
              >
                <Avatar name="Priya Hariharan" initials="PH" size={32} color="neutral" />
                <ChevronDown12Regular />
              </button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>My profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>

        <button
          type="button"
          className={styles.chatPill}
          onClick={onOpenAssistant}
          aria-haspopup="dialog"
          aria-label="Open AI Assistant"
        >
          <ChatIcon size={16} />
          <span className={styles.chatLabel}>Chat</span>
          <ChevronDown12Regular style={{ color: tokens.colorBrandForeground1 }} />
        </button>
      </div>
    </header>
  );
}

