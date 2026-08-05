import {
  Avatar,
  Button,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import {
  ChevronDown12Regular,
  Globe20Regular,
  GridDots20Regular,
  Settings20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { ChatIcon } from "./ChatIcon";
import { PartnerLogo } from "./PartnerLogo";
import { MicrosoftMark } from "./MicrosoftMark";
import { layoutTokens } from "../../theme/theme";
import { motion, transitionFor } from "../../theme/motion";
import { useAppTheme } from "../../theme/theme-context";
import type { ColorSchemePreference } from "../../theme/theme-context";

/** In the order people expect to find them: follow the OS, then the two explicit choices. */
const THEME_OPTIONS: { value: ColorSchemePreference; label: string; icon: typeof Settings20Regular }[] = [
  { value: "system", label: "System", icon: Settings20Regular },
  { value: "light", label: "Light", icon: WeatherSunny20Regular },
  { value: "dark", label: "Dark", icon: WeatherMoon20Regular },
];

const THEME_RADIO_NAME = "colorScheme";

const useStyles = makeStyles({
  /**
   * Figma's suite header fill is colorNeutralBackground4 (node 1671:16303),
   * matching the side nav below it — no drop shadow of its own; the content
   * frame carries the elevation as one panel.
   */
  root: {
    height: layoutTokens.topBarHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground4,
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
    ...transitionFor("transform", motion.feedback),
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
  const { colorSchemePreference, setColorSchemePreference } = useAppTheme();

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

          <Menu
            checkedValues={{ [THEME_RADIO_NAME]: [colorSchemePreference] }}
            onCheckedValueChange={(_event, data) => {
              const [next] = data.checkedItems;
              if (data.name === THEME_RADIO_NAME && next) {
                setColorSchemePreference(next as ColorSchemePreference);
              }
            }}
          >
            <MenuTrigger disableButtonEnhancement>
              <button
                type="button"
                className={mergeClasses(styles.resetButton, styles.profileTrigger)}
                aria-label="Account menu for Priya Hariharan"
              >
                <Avatar name="Priya Hariharan" initials="PH" size={32} color="neutral" />
                <ChevronDown12Regular />
              </button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>My profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuGroup>
                  <MenuGroupHeader>Appearance</MenuGroupHeader>
                  {THEME_OPTIONS.map((option) => (
                    <MenuItemRadio
                      key={option.value}
                      name={THEME_RADIO_NAME}
                      value={option.value}
                      icon={<option.icon />}
                    >
                      {option.label}
                    </MenuItemRadio>
                  ))}
                </MenuGroup>
                <MenuDivider />
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
