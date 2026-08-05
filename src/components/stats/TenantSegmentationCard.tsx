import { makeStyles, Subtitle2, tokens } from "@fluentui/react-components";
import { tenantSegments } from "../../data/stats";
import { segmentPalette } from "../../theme/chartPalette";
import { SurfaceCard } from "../shared/SurfaceCard";
import { DonutChart } from "./DonutChart";

const useStyles = makeStyles({
  /** Figma node 1620:1518 — 16px padding, header then chart row with 20px gap. */
  card: {
    padding: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  body: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXL,
  },
  legend: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  legendLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  /** Figma: 8x8 swatch with the 2px "Small" corner radius. */
  swatch: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusSmall,
    flexShrink: 0,
  },
  /** Figma: Segoe UI Regular 12/16 in colorNeutralForeground1. */
  legendText: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
});

export function TenantSegmentationCard() {
  const styles = useStyles();
  const total = tenantSegments.reduce((sum, segment) => sum + segment.count, 0);

  return (
    <SurfaceCard className={styles.card}>
      <Subtitle2 as="h2">Tenant Segmentation</Subtitle2>

      <div className={styles.body}>
        <DonutChart
          label="Tenant segmentation by challenge status"
          slices={tenantSegments.map((segment) => ({
            value: segment.count,
            color: segmentPalette[segment.status],
            label: segment.label,
          }))}
        />

        <ul className={styles.legend}>
          {tenantSegments.map((segment) => {
            const percent = total === 0 ? 0 : Math.round((segment.count / total) * 100);

            return (
              <li className={styles.legendRow} key={segment.status}>
                <span className={styles.legendLeft}>
                  <span
                    className={styles.swatch}
                    style={{ backgroundColor: segmentPalette[segment.status] }}
                    aria-hidden="true"
                  />
                  <span className={styles.legendText}>
                    {segment.label} ({segment.count})
                  </span>
                </span>
                <span className={styles.legendText}>{percent}%</span>
              </li>
            );
          })}
        </ul>
      </div>
    </SurfaceCard>
  );
}
