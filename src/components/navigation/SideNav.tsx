import { NavLink } from "react-router-dom";
import { Caption2, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { primaryNavItems } from "../../data/navigation";
import type { NavItem } from "../../types/navigation";
import { layoutTokens } from "../../theme/theme";
import { motion, transitionFor } from "../../theme/motion";
import { navIcons } from "./navIcons";
import { AppSwitcherTile } from "./AppSwitcherTile";

const useStyles = makeStyles({
  /** Figma's side nav fill is colorNeutralBackground4 (node 1671:16333), matching the top bar. */
  root: {
    width: layoutTokens.sideNavWidth,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground4,
    height: `calc(100vh - ${layoutTokens.topBarHeight})`,
    position: "sticky",
    top: layoutTokens.topBarHeight,
  },
  hubs: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  /** Figma "Nav tile (with label)": 68px wide, 8px/4px padding, 4px radius. */
  item: {
    boxSizing: "border-box",
    width: layoutTokens.sideNavWidth,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusMedium,
    position: "relative",
    textDecoration: "none",
    color: tokens.colorNeutralForeground2,
    ...transitionFor("background-color, color", motion.feedback),
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground5,
      color: tokens.colorNeutralForeground2Hover,
    },
    ":active": {
      backgroundColor: tokens.colorNeutralBackground6,
    },
    ":focus-visible": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: `calc(-1 * ${tokens.strokeWidthThick})`,
    },
  },
  /** Figma marks the active tile with the left indicator bar + darker text/icon only — no fill. */
  itemSelected: {
    color: tokens.colorNeutralForeground2Selected,
  },
  iconLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXXS,
    width: "100%",
  },
  icon: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  /** Figma "Caption 2": 10px / 14px line-height, centered. */
  label: {
    textAlign: "center",
    lineHeight: tokens.lineHeightBase100,
    fontSize: tokens.fontSizeBase100,
    color: "inherit",
  },
  labelSelected: {
    fontWeight: tokens.fontWeightSemibold,
  },
  /** 2px pill flush to the left edge of the tile, per Figma's "Active indicator". */
  activeIndicator: {
    position: "absolute",
    left: tokens.spacingHorizontalXXS,
    top: tokens.spacingVerticalXS,
    bottom: tokens.spacingVerticalXS,
    width: "2px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    "@media (forced-colors: active)": {
      backgroundColor: "Highlight",
    },
  },
});

function NavRailItem({ item }: { item: NavItem }) {
  const styles = useStyles();
  const icons = navIcons[item.icon];

  return (
    <NavLink
      to={item.href}
      end={item.href === "/"}
      className={({ isActive }) => mergeClasses(styles.item, isActive && styles.itemSelected)}
    >
      {({ isActive }) => {
        const Icon = isActive ? icons.filled : icons.regular;
        return (
          <>
            {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}
            <span className={styles.iconLabel}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <Caption2 className={mergeClasses(styles.label, isActive && styles.labelSelected)}>
                {item.label}
              </Caption2>
            </span>
          </>
        );
      }}
    </NavLink>
  );
}

export function SideNav() {
  const styles = useStyles();

  return (
    <nav className={styles.root} aria-label="Primary">
      <div className={styles.hubs}>
        {primaryNavItems.map((item) => (
          <NavRailItem key={item.key} item={item} />
        ))}
      </div>
      <AppSwitcherTile />
    </nav>
  );
}

