import type { ReactNode } from "react";
import { Button, Dropdown, Option, SearchBox, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowSortDownLines20Regular, Dismiss12Regular } from "@fluentui/react-icons";
import { motion, transitionFor } from "../../theme/motion";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDefinition {
  id: string;
  /** Shown as the dropdown's placeholder and as the prefix on active chips. */
  label: string;
  options: FilterOption[];
  /** Currently selected option values. */
  selected: string[];
  /** Allow more than one selection. Defaults to true. */
  multiple?: boolean;
}

export interface SortDefinition {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  search: {
    minWidth: "240px",
    flexGrow: 1,
    maxWidth: "420px",
    "@media (max-width: 599px)": {
      minWidth: "100%",
    },
  },
  dropdown: {
    minWidth: "150px",
  },
  sortSlot: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexShrink: 0,
    "@media (max-width: 699px)": {
      marginLeft: 0,
    },
  },
  sortButton: {
    minWidth: "32px",
    width: "32px",
    height: "32px",
    color: tokens.colorNeutralForeground2,
  },
  summaryRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  summaryGroup: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  summary: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
  },
  chip: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    paddingTop: "3px",
    paddingBottom: "3px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalSNudge,
    borderRadius: tokens.borderRadiusCircular,
    border: "none",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    cursor: "pointer",
    ...transitionFor("background-color", motion.feedback),
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
    ":focus-visible": {
      outlineStyle: "solid",
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: tokens.colorStrokeFocus2,
      outlineOffset: "1px",
    },
  },
});

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Accessible label for the search field. */
  searchLabel: string;
  filters: FilterDefinition[];
  onFilterChange: (filterId: string, selected: string[]) => void;
  onClearAll: () => void;
  sort?: SortDefinition;
  /** Result count line, e.g. "12 of 24 hackathons". Always show it - see below. */
  summary?: ReactNode;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  searchLabel,
  filters,
  onFilterChange,
  onClearAll,
  sort,
  summary,
}: FilterBarProps) {
  const styles = useStyles();

  const activeChips = filters.flatMap((filter) =>
    filter.selected.map((value) => ({
      filterId: filter.id,
      filterLabel: filter.label,
      value,
      label: filter.options.find((option) => option.value === value)?.label ?? value,
    })),
  );

  const removeChip = (filterId: string, value: string): void => {
    const filter = filters.find((candidate) => candidate.id === filterId);
    if (!filter) {
      return;
    }
    onFilterChange(
      filterId,
      filter.selected.filter((selected) => selected !== value),
    );
  };

  const sortControl = sort ? (
    <div className={styles.sortSlot}>
      <Button
        appearance="subtle"
        className={styles.sortButton}
        icon={<ArrowSortDownLines20Regular />}
        aria-label={`Sort catalog, currently ${sort.options.find((option) => option.value === sort.value)?.label ?? sort.value}`}
        title={sort.options.find((option) => option.value === sort.value)?.label ?? "Sort"}
        onClick={() => {
          const currentIndex = sort.options.findIndex((option) => option.value === sort.value);
          const next = sort.options[(currentIndex + 1) % sort.options.length];
          if (next) {
            sort.onChange(next.value);
          }
        }}
      />
    </div>
  ) : null;

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <SearchBox
          className={styles.search}
          value={searchValue}
          placeholder={searchPlaceholder}
          aria-label={searchLabel}
          onChange={(_event, data) => onSearchChange(data.value)}
        />

        {filters.map((filter) => (
          <Dropdown
            key={filter.id}
            className={styles.dropdown}
            placeholder={filter.label}
            aria-label={filter.label}
            multiselect={filter.multiple !== false}
            selectedOptions={filter.selected}
            value={
              filter.selected.length === 0
                ? ""
                : filter.selected
                    .map((value) => filter.options.find((option) => option.value === value)?.label ?? value)
                    .join(", ")
            }
            onOptionSelect={(_event, data) => onFilterChange(filter.id, data.selectedOptions)}
          >
            {filter.options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Dropdown>
        ))}
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.summaryGroup}>
          {summary ? <span className={styles.summary}>{summary}</span> : null}

          {activeChips.length > 0 ? (
            <>
              <div className={styles.chips}>
                {activeChips.map((chip) => (
                  <button
                    key={`${chip.filterId}-${chip.value}`}
                    type="button"
                    className={styles.chip}
                    onClick={() => removeChip(chip.filterId, chip.value)}
                    aria-label={`Remove filter ${chip.filterLabel}: ${chip.label}`}
                  >
                    {chip.label}
                    <Dismiss12Regular />
                  </button>
                ))}
              </div>

              <Button appearance="subtle" size="small" onClick={onClearAll}>
                Clear all
              </Button>
            </>
          ) : null}
        </div>

        {sortControl}
      </div>
    </div>
  );
}
