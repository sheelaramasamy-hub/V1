import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Radio,
  RadioGroup,
  Switch,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { RadioGroupOnChangeData } from "@fluentui/react-components";
import {
  Alert20Regular,
  ArrowDownload20Regular,
  Delete20Regular,
  PaintBrush20Regular,
  Person20Regular,
  ShieldKeyhole20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { PageBanner } from "../components/shared/PageBanner";
import { SectionCard } from "../components/shared/SectionCard";
import { SectionNav, type SectionNavItem } from "../components/shared/SectionNav";
import { currentUser } from "../data/profile";
import { layoutTokens } from "../theme/theme";
import type { ColorSchemePreference } from "../theme/theme-context";
import { useAppTheme } from "../theme/theme-context";

const NAV_ITEMS: SectionNavItem[] = [
  { id: "account", label: "Account" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "privacy", label: "Privacy & data" },
];

interface NotificationPrefs {
  email: boolean;
  push: boolean;
  digest: boolean;
  reminders: boolean;
}

interface PrivacyPrefs {
  leaderboardVisible: boolean;
  profileVisible: boolean;
  shareActivity: boolean;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: layoutTokens.sectionGap,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: tokens.spacingVerticalM,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  toggleList: {
    display: "flex",
    flexDirection: "column",
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalM} 0`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    "&:last-child": {
      borderBottom: "none",
      paddingBottom: 0,
    },
  },
  toggleCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  toggleLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  toggleDescription: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  themeGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalL,
  },
  themeOptionLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  dangerZone: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorPaletteRedBorder2}`,
    backgroundColor: tokens.colorPaletteRedBackground1,
  },
  dangerCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  dangerTitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteRedForeground1,
  },
  dangerDescription: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  dangerButton: {
    color: tokens.colorPaletteRedForeground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorPaletteRedBorder2}`,
    ":hover": {
      color: tokens.colorPaletteRedForeground1,
      backgroundColor: tokens.colorPaletteRedBackground2,
    },
  },
  exportActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const THEME_OPTIONS: { value: ColorSchemePreference; label: string; icon: typeof WeatherSunny20Regular }[] = [
  { value: "system", label: "Match system", icon: PaintBrush20Regular },
  { value: "light", label: "Light", icon: WeatherSunny20Regular },
  { value: "dark", label: "Dark", icon: WeatherMoon20Regular },
];

/**
 * Account settings — grouped into Account, Notifications, Appearance, and Privacy sections with
 * a sticky SectionNav, matching the track detail page's long-form layout. Appearance reads and
 * writes the same theme context the TopBar's quick toggle uses, so both stay in sync.
 */
export function SettingsPage() {
  const styles = useStyles();
  const location = useLocation();
  const { colorSchemePreference, setColorSchemePreference } = useAppTheme();

  const [savedMessage, setSavedMessage] = useState<string | undefined>();
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    email: true,
    push: true,
    digest: true,
    reminders: false,
  });
  const [privacy, setPrivacy] = useState<PrivacyPrefs>({
    leaderboardVisible: true,
    profileVisible: true,
    shareActivity: false,
  });

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [location.hash]);

  const handleAccountSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSavedMessage("Account details saved.");
  };

  const handleThemeChange = (_event: unknown, data: RadioGroupOnChangeData): void => {
    setColorSchemePreference(data.value as ColorSchemePreference);
    setSavedMessage("Appearance updated.");
  };

  const toggleNotification = (key: keyof NotificationPrefs) => (): void => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }));
    setSavedMessage("Notification preferences saved.");
  };

  const togglePrivacy = (key: keyof PrivacyPrefs) => (): void => {
    setPrivacy((current) => ({ ...current, [key]: !current[key] }));
    setSavedMessage("Privacy preferences saved.");
  };

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Your account"
        title="Settings"
        description="Manage your profile details, notifications, appearance, and privacy."
      />

      <SectionNav items={NAV_ITEMS} ariaLabel="Settings sections" />

      {savedMessage ? (
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>{savedMessage}</MessageBarTitle>
          </MessageBarBody>
        </MessageBar>
      ) : null}

      <SectionCard
        id="account"
        title="Account"
        description="Update the personal details other participants and organizers see."
        icon={Person20Regular}
      >
        <form className={styles.form} onSubmit={handleAccountSubmit}>
          <div className={styles.fieldRow}>
            <Field label="Full name">
              <Input defaultValue={currentUser.name} autoComplete="name" />
            </Field>
            <Field label="Organization">
              <Input defaultValue={currentUser.organization} autoComplete="organization" />
            </Field>
          </div>
          <div className={styles.fieldRow}>
            <Field label="Email address" hint="Contact support to change your sign-in email.">
              <Input type="email" defaultValue={currentUser.email} disabled />
            </Field>
            <Field label="Location">
              <Input defaultValue={currentUser.location} autoComplete="address-level2" />
            </Field>
          </div>

          <div className={styles.formActions}>
            <Button appearance="primary" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        id="notifications"
        title="Notifications"
        description="Choose what Hackable sends you and how."
        icon={Alert20Regular}
      >
        <div className={styles.toggleList}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Email notifications</span>
              <span className={styles.toggleDescription}>Updates on your tracks, workshops, and results.</span>
            </div>
            <Switch checked={notifications.email} onChange={toggleNotification("email")} aria-label="Email notifications" />
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Push notifications</span>
              <span className={styles.toggleDescription}>Real-time alerts in your browser.</span>
            </div>
            <Switch checked={notifications.push} onChange={toggleNotification("push")} aria-label="Push notifications" />
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Weekly digest</span>
              <span className={styles.toggleDescription}>A Monday summary of leaderboard movement and new resources.</span>
            </div>
            <Switch checked={notifications.digest} onChange={toggleNotification("digest")} aria-label="Weekly digest" />
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Workshop reminders</span>
              <span className={styles.toggleDescription}>A reminder 30 minutes before a workshop you registered for.</span>
            </div>
            <Switch checked={notifications.reminders} onChange={toggleNotification("reminders")} aria-label="Workshop reminders" />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        id="appearance"
        title="Appearance"
        description="Match the workspace to your environment."
        icon={PaintBrush20Regular}
      >
        <RadioGroup
          className={styles.themeGroup}
          layout="horizontal"
          value={colorSchemePreference}
          onChange={handleThemeChange}
        >
          {THEME_OPTIONS.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={
                <span className={styles.themeOptionLabel}>
                  <option.icon />
                  {option.label}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </SectionCard>

      <SectionCard
        id="privacy"
        title="Privacy & data"
        description="Control what other participants can see and how your data is used."
        icon={ShieldKeyhole20Regular}
      >
        <div className={styles.toggleList}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Show me on the leaderboard</span>
              <span className={styles.toggleDescription}>Your name and points appear in leaderboard rankings.</span>
            </div>
            <Switch
              checked={privacy.leaderboardVisible}
              onChange={togglePrivacy("leaderboardVisible")}
              aria-label="Show me on the leaderboard"
            />
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Profile visible to other participants</span>
              <span className={styles.toggleDescription}>Team members and organizers can view your profile page.</span>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onChange={togglePrivacy("profileVisible")}
              aria-label="Profile visible to other participants"
            />
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleCopy}>
              <span className={styles.toggleLabel}>Share activity with mentors</span>
              <span className={styles.toggleDescription}>Lets assigned mentors see your learning progress.</span>
            </div>
            <Switch
              checked={privacy.shareActivity}
              onChange={togglePrivacy("shareActivity")}
              aria-label="Share activity with mentors"
            />
          </div>
        </div>

        <div className={styles.exportActions}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export my data
          </Button>
        </div>

        <div className={styles.dangerZone}>
          <div className={styles.dangerCopy}>
            <span className={styles.dangerTitle}>Delete account</span>
            <span className={styles.dangerDescription}>
              Permanently removes your profile, progress, and submissions. This cannot be undone.
            </span>
          </div>
          <Button appearance="outline" className={styles.dangerButton} icon={<Delete20Regular />}>
            Delete account
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
