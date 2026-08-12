import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { MessageBar, MessageBarBody, MessageBarTitle, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import type { FluentIcon } from "@fluentui/react-icons";
import {
  ArrowClockwise20Regular,
  ArrowDown12Filled,
  ArrowUp12Filled,
  ChevronRight12Filled,
  Crown16Filled,
  Medal16Filled,
} from "@fluentui/react-icons";
import { PageBanner, PageBannerButton } from "../components/shared/PageBanner";
import { SurfaceCard } from "../components/shared/SurfaceCard";
import { leaderboardEntries, yourTeamRank, type LeaderboardEntry } from "../data/leaderboard";
import { useAppTheme } from "../theme/theme-context";

type PodiumPlace = "first" | "second" | "third";

/**
 * Medal tiers for the podium only — Fluent's fixed palette colours (not the app's teal brand
 * ramp), because gold/silver/bronze are a recognisable convention on their own and shouldn't be
 * reinterpreted through a brand hue. Nothing outside the podium reads these tokens.
 */
const PODIUM_TIERS: Record<
  PodiumPlace,
  { wash: string; border: string; accent: string; label: string; icon: FluentIcon }
> = {
  first: {
    wash: tokens.colorPaletteGoldBackground2,
    border: tokens.colorPaletteGoldBorderActive,
    accent: tokens.colorPaletteGoldForeground2,
    label: "Champion",
    icon: Crown16Filled,
  },
  second: {
    wash: tokens.colorPalettePlatinumBackground2,
    border: tokens.colorPalettePlatinumBorderActive,
    accent: tokens.colorPalettePlatinumForeground2,
    label: "Runner-up",
    icon: Medal16Filled,
  },
  third: {
    // Brass sits too close to Gold to tell apart at a glance — DarkOrange reads as a genuine
    // copper/bronze against Gold's yellow.
    wash: tokens.colorPaletteDarkOrangeBackground2,
    border: tokens.colorPaletteDarkOrangeBorderActive,
    accent: tokens.colorPaletteDarkOrangeForeground2,
    label: "Third place",
    icon: Medal16Filled,
  },
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  podium: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "end",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXL,
    "@media (max-width: 700px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      alignItems: "stretch",
    },
  },
  /**
   * One continuous soft surface, not a hard-edged colour block sitting on white — two blurred
   * colour pools near the top corners that dissolve into the card's own surface colour by the
   * lower third. The surface is `colorNeutralBackground1`, not a literal white, specifically so
   * this fades into a dark card in dark theme instead of always resolving to a white slab sitting
   * on a dark page. The tier wash/accent are set inline per card (see PODIUM_TIERS).
   */
  podiumCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXXS,
    overflow: "hidden",
    borderRadius: "20px",
    border: `${tokens.strokeWidthThin} solid var(--tier-border)`,
    boxShadow: tokens.shadow8,
    backgroundColor: tokens.colorNeutralBackground1,
    backgroundImage:
      "radial-gradient(120% 65% at 15% -10%, var(--tier-wash) 0%, transparent 60%), " +
      "radial-gradient(100% 60% at 100% 0%, color-mix(in srgb, var(--tier-wash) 55%, var(--tier-accent)) 0%, transparent 55%)",
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalM} ${tokens.spacingVerticalL}`,
    textAlign: "center",
    minHeight: "228px",
  },
  podiumCardFirst: {
    boxShadow: tokens.shadow28,
    paddingTop: tokens.spacingVerticalXXL,
    minHeight: "256px",
  },
  rankBadge: {
    position: "absolute",
    top: tokens.spacingVerticalM,
    left: tokens.spacingHorizontalM,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground1,
    color: "var(--tier-text)",
    boxShadow: tokens.shadow4,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
  },
  // The reference's white "app icon" tile the illustration sits in — the team avatar sits inside
  // it instead. Uses the same card-surface token as the card itself (not a literal white), so it
  // reads as a raised chip on the surface in both themes rather than a fixed white patch.
  iconTile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "72px",
    height: "72px",
    marginBottom: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  podiumAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "52px",
    height: "52px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: "#ffffff",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightBold,
  },
  podiumName: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  podiumOrg: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  podiumPoints: {
    marginTop: tokens.spacingVerticalXS,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
    color: "var(--tier-text)",
    fontVariantNumeric: "tabular-nums",
  },
  // The reference's solid, pill-shaped "Continue >" button, repurposed as the medal call-out —
  // same shape and weight, carrying the tier label and a trailing chevron instead of an action.
  tierTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    marginTop: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "var(--tier-accent)",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  tableCard: {
    padding: 0,
    overflow: "hidden",
  },
  tableHeading: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  tableEyebrow: {
    display: "block",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  tableTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  yourRank: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  yourRankValue: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  tableScroll: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    minWidth: "640px",
    borderCollapse: "collapse",
  },
  th: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    textAlign: "left",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    whiteSpace: "nowrap",
  },
  td: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXL}`,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    whiteSpace: "nowrap",
  },
  teamCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  tableAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    flexShrink: 0,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: "#ffffff",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightBold,
  },
  trendCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontWeight: tokens.fontWeightSemibold,
  },
  trendUp: {
    color: tokens.colorStatusSuccessForeground1,
  },
  trendDown: {
    color: tokens.colorStatusDangerForeground1,
  },
  trendFlat: {
    color: tokens.colorNeutralForeground4,
  },
});

function PodiumCard({ entry, place }: { entry: LeaderboardEntry; place: PodiumPlace }) {
  const styles = useStyles();
  const { colorScheme } = useAppTheme();
  const isFirst = place === "first";
  const tier = PODIUM_TIERS[place];
  const TierIcon = tier.icon;

  const tierVars = {
    "--tier-wash": tier.wash,
    "--tier-border": tier.border,
    "--tier-accent": tier.accent,
    // Fluent's fixed palette Foreground2 tokens are tuned for text on a light neutral surface;
    // on the card's own dark surface in dark theme, that mid-tone gold/silver/bronze reads too
    // muddy. Blending toward white only in dark theme keeps the same hue but restores contrast.
    "--tier-text":
      colorScheme === "dark" ? `color-mix(in srgb, ${tier.accent} 55%, white)` : tier.accent,
  } as CSSProperties;

  return (
    <div className={mergeClasses(styles.podiumCard, isFirst && styles.podiumCardFirst)} style={tierVars}>
      <span className={styles.rankBadge}>{entry.rank}</span>
      <span className={styles.iconTile}>
        <span className={styles.podiumAvatar} aria-hidden="true">
          {entry.initials}
        </span>
      </span>
      <h2 className={styles.podiumName}>{entry.name}</h2>
      <p className={styles.podiumOrg}>{entry.org}</p>
      <strong className={styles.podiumPoints}>{entry.points.toLocaleString()} pts</strong>
      <span className={styles.tierTag}>
        <TierIcon /> {tier.label}
        <ChevronRight12Filled />
      </span>
    </div>
  );
}

function TrendCell({ entry }: { entry: LeaderboardEntry }) {
  const styles = useStyles();

  if (entry.trend === "up") {
    return (
      <span className={mergeClasses(styles.trendCell, styles.trendUp)}>
        <ArrowUp12Filled /> {entry.trendValue}
      </span>
    );
  }

  if (entry.trend === "down") {
    return (
      <span className={mergeClasses(styles.trendCell, styles.trendDown)}>
        <ArrowDown12Filled /> {entry.trendValue}
      </span>
    );
  }

  return <span className={styles.trendFlat}>—</span>;
}

/**
 * Community leaderboard — the podium is deliberately built from the same visual language as the
 * track detail page's milestone badges and the feedback page's rating scale (solid brand-colour
 * circles carrying a number or initials), so "ranking" reads as the same kind of gamified
 * feedback the rest of the product already gives, not a one-off table.
 */
export function LeaderboardPage() {
  const styles = useStyles();
  const [justRefreshed, setJustRefreshed] = useState(false);

  useEffect(() => {
    if (!justRefreshed) {
      return;
    }
    const timeout = window.setTimeout(() => setJustRefreshed(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [justRefreshed]);

  const first = leaderboardEntries.find((entry) => entry.rank === 1)!;
  const second = leaderboardEntries.find((entry) => entry.rank === 2)!;
  const third = leaderboardEntries.find((entry) => entry.rank === 3)!;

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Community performance"
        title="Leaderboard"
        description="See how teams are progressing across active partner hackathons. Scores refresh every four hours."
        actions={
          <PageBannerButton icon={<ArrowClockwise20Regular />} onClick={() => setJustRefreshed(true)}>
            Refresh scores
          </PageBannerButton>
        }
      />

      {justRefreshed ? (
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Leaderboard data refreshed.</MessageBarTitle>
            Scores are current as of this moment.
          </MessageBarBody>
        </MessageBar>
      ) : null}

      <div className={styles.podium}>
        <PodiumCard entry={second} place="second" />
        <PodiumCard entry={first} place="first" />
        <PodiumCard entry={third} place="third" />
      </div>

      <SurfaceCard elevation="high" className={styles.tableCard}>
        <div className={styles.tableHeading}>
          <div>
            <span className={styles.tableEyebrow}>Overall ranking</span>
            <h2 className={styles.tableTitle}>Top teams</h2>
          </div>
          <span className={styles.yourRank}>
            Your team is ranked <span className={styles.yourRankValue}>#{yourTeamRank}</span>
          </span>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} scope="col">
                  Rank
                </th>
                <th className={styles.th} scope="col">
                  Team
                </th>
                <th className={styles.th} scope="col">
                  Hackathon
                </th>
                <th className={styles.th} scope="col">
                  Milestones
                </th>
                <th className={styles.th} scope="col">
                  Score
                </th>
                <th className={styles.th} scope="col">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardEntries.map((entry) => (
                <tr key={entry.rank}>
                  <td className={styles.td}>
                    <strong>#{entry.rank}</strong>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.teamCell}>
                      <span className={styles.tableAvatar} aria-hidden="true">
                        {entry.initials}
                      </span>
                      {entry.name}
                    </span>
                  </td>
                  <td className={styles.td}>{entry.hackathon}</td>
                  <td className={styles.td}>{entry.milestones}</td>
                  <td className={styles.td}>
                    <strong>{entry.points.toLocaleString()}</strong>
                  </td>
                  <td className={styles.td}>
                    <TrendCell entry={entry} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}
