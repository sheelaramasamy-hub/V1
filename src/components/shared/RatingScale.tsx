import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { motion, transitionFor } from "../../theme/motion";

const useStyles = makeStyles({
  fieldset: {
    border: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  legend: {
    padding: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(96px, 1fr))",
    gap: tokens.spacingHorizontalS,
  },
  option: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `${tokens.strokeWidthThick} solid transparent`,
    cursor: "pointer",
    textAlign: "center",
    ...transitionFor("background-color, border-color, transform", motion.feedback),
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Hover,
    },
    "@media (prefers-reduced-motion: reduce)": {
      ":hover": { transform: "none" },
    },
  },
  optionSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `${tokens.strokeWidthThick} solid ${tokens.colorBrandStroke1}`,
  },
  // The native input carries the real semantics (name, value, keyboard, screen reader state); it
  // is only visually hidden, never removed, so the card stays a real radio button under the hood.
  input: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
    ":focus-visible ~ *": {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: "2px",
    },
  },
  badge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    boxShadow: tokens.shadow4,
    ...transitionFor("transform", motion.feedback),
  },
  badgeSelected: {
    transform: "scale(1.08)",
  },
  optionLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  optionLabelSelected: {
    color: tokens.colorBrandForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export interface RatingOption {
  value: number;
  label: string;
}

export interface RatingScaleProps {
  legend: string;
  name: string;
  options: RatingOption[];
  value?: number;
  onChange: (value: number) => void;
  required?: boolean;
}

/**
 * A rating picker styled as a row of gamified badge cards rather than a plain radio group —
 * the same circular numbered-badge language as the track detail page's milestone markers, so
 * "give feedback" and "track progress" read as the same product rather than two different ones.
 *
 * Still a real fieldset of native radio inputs under the hood: the card is a label, so keyboard,
 * screen reader, and form-submission behaviour all come for free.
 */
export function RatingScale({ legend, name, options, value, onChange, required }: RatingScaleProps) {
  const styles = useStyles();

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.row}>
        {options.map((option, index) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={mergeClasses(styles.option, selected && styles.optionSelected)}
            >
              <input
                className={styles.input}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                required={required && index === 0}
              />
              <span className={mergeClasses(styles.badge, selected && styles.badgeSelected)}>{option.value}</span>
              <span className={mergeClasses(styles.optionLabel, selected && styles.optionLabelSelected)}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
