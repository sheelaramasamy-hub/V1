import { Body1, makeStyles, Subtitle1, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalXXXL,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export function PlaceholderPage({ title }: { title: string }) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Subtitle1>{title}</Subtitle1>
      <Body1 style={{ color: tokens.colorNeutralForeground3 }}>This section is coming soon.</Body1>
    </div>
  );
}
