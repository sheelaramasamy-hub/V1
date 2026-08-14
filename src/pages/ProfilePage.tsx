import { useNavigate } from "react-router-dom";
import { Avatar, Button, makeStyles, tokens } from "@fluentui/react-components";
import { Building20Regular, Edit20Regular, Location20Regular, Mail20Regular } from "@fluentui/react-icons";
import { CardGrid } from "../components/shared/CardGrid";
import { FactCardRow } from "../components/shared/FactCardRow";
import { SectionCard } from "../components/shared/SectionCard";
import { SurfaceCard } from "../components/shared/SurfaceCard";
import { Tag } from "../components/shared/Tag";
import { currentUser } from "../data/profile";
import { layoutTokens } from "../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: layoutTokens.sectionGap,
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXL,
    padding: tokens.spacingVerticalXXL,
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    minWidth: 0,
  },
  identityCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  name: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  roleLine: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalXXS,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  statsWrap: {
    padding: `0 ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXXL}`,
  },
  bio: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    maxWidth: "78ch",
  },
  skillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
  },
  achievementCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusLarge,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  achievementIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    flexShrink: 0,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: "20px",
  },
  achievementCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  achievementTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  achievementDescription: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  achievementDate: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  activityRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  activityIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    flexShrink: 0,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
  },
  activityCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    flexGrow: 1,
  },
  activityTitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  activityDescription: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  activityTimestamp: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
});

/**
 * The signed-in participant's profile — identity, stats, skills, achievements, and recent
 * activity. Reuses the same SectionCard / SurfaceCard / FactCardRow / Tag primitives as the
 * track detail page so it reads as one product, not a bolted-on account screen.
 */
export function ProfilePage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const user = currentUser;

  return (
    <div className={styles.root}>
      <SurfaceCard elevation="high">
        <div className={styles.header}>
          <div className={styles.identity}>
            <Avatar name={user.name} initials={user.initials} size={72} color="colorful" />
            <div className={styles.identityCopy}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.roleLine}>
                {user.role} · {user.organization}
              </p>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <Mail20Regular fontSize={16} />
                  {user.email}
                </span>
                <span className={styles.metaItem}>
                  <Location20Regular fontSize={16} />
                  {user.location}
                </span>
                <span className={styles.metaItem}>
                  <Building20Regular fontSize={16} />
                  {user.organization}
                </span>
              </div>
            </div>
          </div>

          <Button appearance="secondary" icon={<Edit20Regular />} onClick={() => navigate("/settings#account")}>
            Edit profile
          </Button>
        </div>

        <div className={styles.statsWrap}>
          <FactCardRow
            ariaLabel="Participation stats"
            columns="four"
            facts={user.stats.map((stat) => ({ id: stat.id, label: stat.label, value: stat.value, icon: stat.icon }))}
          />
        </div>
      </SurfaceCard>

      <SectionCard id="about" title="About">
        <p className={styles.bio}>{user.bio}</p>
        <div className={styles.skillRow}>
          {user.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        id="achievements"
        title="Achievements"
        description="Badges earned across hackathons and the learning library."
      >
        <CardGrid>
          {user.achievements.map((achievement) => (
            <div className={styles.achievementCard} key={achievement.id}>
              <span className={styles.achievementIcon} aria-hidden="true">
                <achievement.icon />
              </span>
              <div className={styles.achievementCopy}>
                <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                <p className={styles.achievementDescription}>{achievement.description}</p>
                <span className={styles.achievementDate}>{achievement.earnedOn}</span>
              </div>
            </div>
          ))}
        </CardGrid>
      </SectionCard>

      <SectionCard id="activity" title="Recent activity">
        <div className={styles.activityList}>
          {user.activity.map((item) => (
            <div className={styles.activityRow} key={item.id}>
              <span className={styles.activityIcon} aria-hidden="true">
                <item.icon />
              </span>
              <div className={styles.activityCopy}>
                <span className={styles.activityTitle}>{item.title}</span>
                <span className={styles.activityDescription}>{item.description}</span>
              </div>
              <span className={styles.activityTimestamp}>{item.timestamp}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
