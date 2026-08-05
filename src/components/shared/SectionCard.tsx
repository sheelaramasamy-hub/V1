import type { ReactNode } from "react";
import { makeStyles, tokens, useId } from "@fluentui/react-components";
import type { FluentIcon } from "@fluentui/react-icons";
import { SurfaceCard } from "./SurfaceCard";
import { layoutTokens } from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    scrollMarginTop: layoutTokens.sectionScrollMargin,
    minWidth: 0,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingBottom: "16px",
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: "18px",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    minWidth: 0,
  },
  description: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    maxWidth: "78ch",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingTop: "16px",
  },
});

export interface SectionCardProps {
  id: string;
  title: string;
  description?: string;
  icon?: FluentIcon;
  children: ReactNode;
}

export function SectionCard({ id, title, description, icon: Icon, children }: SectionCardProps) {
  const styles = useStyles();
  const headingId = `${useId("section-heading-")}-${id}`;

  return (
    <section id={id} aria-labelledby={headingId} className={styles.root}>
      <SurfaceCard elevation="high" className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            {Icon ? (
              <span className={styles.icon} aria-hidden="true">
                <Icon />
              </span>
            ) : null}
            <h2 className={styles.title} id={headingId}>
              {title}
            </h2>
          </div>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>

        <div className={styles.body}>{children}</div>
      </SurfaceCard>
    </section>
  );
}
