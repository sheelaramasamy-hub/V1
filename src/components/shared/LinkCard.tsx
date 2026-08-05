import { Link as RouterLink } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import { ArrowRight12Regular } from "@fluentui/react-icons";
import { liftOnHover, motion, transitionFor } from "../../theme/motion";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
    height: "100%",
    position: "relative",
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow2,
    ...liftOnHover,
    "& svg": transitionFor("transform", motion.feedback),
    "&:hover svg": {
      transform: "translateX(2px)",
    },
  },
  eyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    fontVariantNumeric: "tabular-nums",
  },
  title: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    minWidth: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  link: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    marginTop: "auto",
    color: tokens.colorBrandForeground1,
    textDecorationLine: "none",
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
    },
    ":hover": {
      textDecorationLine: "underline",
    },
  },
});

export interface LinkCardProps {
  eyebrow?: string;
  title: string;
  to: string;
  linkLabel?: string;
}

/** A compact card that names something and links to it — related catalogue items. */
export function LinkCard({ eyebrow, title, to, linkLabel = "View details" }: LinkCardProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h3 className={styles.title}>{title}</h3>
      <RouterLink to={to} className={styles.link} aria-label={`${linkLabel}: ${title}`}>
        {linkLabel}
        <ArrowRight12Regular />
      </RouterLink>
    </div>
  );
}
