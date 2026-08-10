import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Option,
  Textarea,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ArrowRight16Regular, CheckmarkCircle20Regular } from "@fluentui/react-icons";
import { PageBanner } from "../components/shared/PageBanner";
import { RatingScale } from "../components/shared/RatingScale";
import { SurfaceCard } from "../components/shared/SurfaceCard";

const RATING_OPTIONS = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Fair" },
  { value: 3, label: "Good" },
  { value: 4, label: "Very good" },
  { value: 5, label: "Excellent" },
];

const EXPERIENCE_AREAS = ["Hackathon tracks", "Workshops", "Learning resources", "Platform usability"];
const RELATED_HACKATHONS = ["Cloud Resilience Challenge", "AI for Accessibility", "Data for Impact Sprint"];

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 320px",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  formCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingVerticalXXL,
  },
  formHeading: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  formEyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  formTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  formCaption: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  fieldLabel: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalM,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  aside: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  asideCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalL,
  },
  asideIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: "18px",
  },
  asideEyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  asideTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  asideBody: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  asideRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  asideLink: {
    justifyContent: "flex-start",
    paddingLeft: 0,
  },
});

export function FeedbackPage() {
  const styles = useStyles();
  const navigate = useNavigate();

  const [rating, setRating] = useState<number | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) {
      return;
    }
    setSubmitted(true);
    event.currentTarget.reset();
    setRating(undefined);
  };

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Shape the program"
        title="Share feedback"
        description="Tell the Hackable team what is working and where the participant experience needs attention."
      />

      {submitted ? (
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Thanks — your feedback was submitted.</MessageBarTitle>
            The product and program teams review responses every week.
          </MessageBarBody>
        </MessageBar>
      ) : null}

      <div className={styles.layout}>
        <SurfaceCard elevation="high" className={styles.formCard}>
          <div className={styles.formHeading}>
            <span className={styles.formEyebrow}>New response</span>
            <h2 className={styles.formTitle}>How was your experience?</h2>
            <p className={styles.formCaption}>Required fields are marked with an asterisk.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <RatingScale
              legend="Overall experience *"
              name="rating"
              options={RATING_OPTIONS}
              value={rating}
              onChange={setRating}
              required
            />

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} id="feedback-area-label">
                  Area of the experience *
                </label>
                <Dropdown aria-labelledby="feedback-area-label" placeholder="Choose an area">
                  {EXPERIENCE_AREAS.map((area) => (
                    <Option key={area}>{area}</Option>
                  ))}
                </Dropdown>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} id="related-hackathon-label">
                  Related hackathon
                </label>
                <Dropdown aria-labelledby="related-hackathon-label" placeholder="Select a hackathon">
                  {RELATED_HACKATHONS.map((hackathon) => (
                    <Option key={hackathon}>{hackathon}</Option>
                  ))}
                </Dropdown>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="worked-well">
                What worked well?
              </label>
              <Textarea id="worked-well" name="worked-well" rows={4} placeholder="Tell us what helped you make progress..." />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="improvements">
                What should we improve? *
              </label>
              <Textarea
                id="improvements"
                name="improvements"
                rows={5}
                required
                placeholder="Be specific so the team can act on it..."
              />
            </div>

            <Checkbox label="You may contact me for a follow-up conversation." />

            <div className={styles.formActions}>
              <Button appearance="secondary" type="reset" onClick={() => setRating(undefined)}>
                Clear
              </Button>
              <Button appearance="primary" type="submit">
                Submit feedback
              </Button>
            </div>
          </form>
        </SurfaceCard>

        <aside className={styles.aside}>
          <SurfaceCard elevation="high" className={styles.asideCard}>
            <span className={styles.asideIcon} aria-hidden="true">
              <CheckmarkCircle20Regular />
            </span>
            <h2 className={styles.asideTitle}>Feedback drives releases</h2>
            <p className={styles.asideBody}>
              Responses are reviewed weekly by the Hackable product and program teams.
            </p>
          </SurfaceCard>

          <SurfaceCard elevation="high" className={styles.asideCard}>
            <span className={styles.asideEyebrow}>Your recent feedback</span>
            <div className={styles.asideRow}>
              <h2 className={styles.asideTitle}>Workshop registration flow</h2>
              <Badge appearance="tint" color="success" size="medium">
                Reviewed
              </Badge>
            </div>
            <p className={styles.asideBody}>Submitted July 18</p>
          </SurfaceCard>

          <SurfaceCard elevation="high" className={styles.asideCard}>
            <span className={styles.asideEyebrow}>Need direct help?</span>
            <h2 className={styles.asideTitle}>Open a support request</h2>
            <p className={styles.asideBody}>For blockers or account issues, use the support workflow instead.</p>
            <Button
              className={styles.asideLink}
              appearance="transparent"
              icon={<ArrowRight16Regular />}
              iconPosition="after"
              onClick={() => navigate("/support")}
            >
              Go to support
            </Button>
          </SurfaceCard>
        </aside>
      </div>
    </div>
  );
}
