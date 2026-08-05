import type { ReactNode } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import bannerHero from "../../assets/images/welcome-banner-hero.png";
import { hackableGreen } from "../../theme/brandRamp";
import { layoutTokens } from "../../theme/theme";
import { useAppTheme } from "../../theme/theme-context";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  visual: {
    position: "relative",
    width: `calc(100% + (${layoutTokens.contentPaddingInline} * 2))`,
    marginInline: `calc(-1 * ${layoutTokens.contentPaddingInline})`,
    marginTop: `calc(-1 * ${layoutTokens.contentPaddingBlockStart})`,
    height: "260px",
    borderRadius: 0,
    overflow: "hidden",
    boxShadow: tokens.shadow8,
    "@media (max-width: 900px)": {
      height: "190px",
    },
    "@media (max-width: 640px)": {
      width: `calc(100% + (${tokens.spacingHorizontalL} * 2))`,
      marginInline: `calc(-1 * ${tokens.spacingHorizontalL})`,
      marginTop: `calc(-1 * ${tokens.spacingVerticalL})`,
    },
  },
  visualImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  visualWash: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  cardHost: {
    marginTop: `calc(-1 * (${layoutTokens.sectionGap} + 72px))`,
    minWidth: 0,
    position: "relative",
    zIndex: 1,
    "@media (max-width: 900px)": {
      marginTop: `calc(-1 * (${layoutTokens.sectionGap} + 40px))`,
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0,
    padding: "16px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  headRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalXXL,
    flexWrap: "wrap",
    minWidth: 0,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  markRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    minWidth: 0,
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    "@media (max-width: 900px)": {
      fontSize: tokens.fontSizeBase600,
      lineHeight: tokens.lineHeightBase600,
    },
  },
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground2,
    maxWidth: "78ch",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
});

export interface DetailHeroProps {
  breadcrumb?: ReactNode;
  mark?: ReactNode;
  eyebrow?: string;
  status?: ReactNode;
  title: string;
  description?: string;
  chips?: ReactNode;
  facts?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  visualSrc?: string;
}

export function DetailHero({
  breadcrumb,
  mark,
  eyebrow,
  status,
  title,
  description,
  chips,
  facts,
  actions,
  aside,
  visualSrc = bannerHero,
}: DetailHeroProps) {
  const styles = useStyles();
  const { colorScheme } = useAppTheme();

  const [from, to] =
    colorScheme === "dark" ? [hackableGreen[20], hackableGreen[60]] : [hackableGreen[40], hackableGreen[90]];

  return (
    <div className={styles.root}>
      <div className={styles.visual}>
        <img src={visualSrc} alt="" className={styles.visualImage} aria-hidden="true" />
        <div
          className={styles.visualWash}
          style={{
            backgroundImage: `linear-gradient(120deg, ${from} 0%, transparent 55%, ${to} 100%)`,
            opacity: 0.18,
          }}
          aria-hidden="true"
        />
      </div>

      <div className={styles.cardHost}>
        <div className={styles.card}>
          {breadcrumb || aside ? (
            <div className={styles.headRow}>
              {breadcrumb}
              {aside}
            </div>
          ) : null}

          <div className={styles.copy}>
            {mark ? <div className={styles.markRow}>{mark}</div> : null}

            {eyebrow || status ? (
              <div className={styles.eyebrowRow}>
                {status}
                {eyebrow ? (
                  <span
                    style={{
                      fontFamily: tokens.fontFamilyBase,
                      fontSize: tokens.fontSizeBase200,
                      color: tokens.colorNeutralForeground3,
                    }}
                  >
                    {eyebrow}
                  </span>
                ) : null}
              </div>
            ) : null}

            <h1 className={styles.title}>{title}</h1>

            {description ? <p className={styles.description}>{description}</p> : null}
          </div>

          {chips ? <div className={styles.chips}>{chips}</div> : null}
          {facts}

          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}




