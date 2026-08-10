import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Dropdown,
  Input,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Option,
  Textarea,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { BadgeProps } from "@fluentui/react-components";
import { ArrowRight16Regular, DocumentBulletList20Regular } from "@fluentui/react-icons";
import { PageBanner, PageBannerButton } from "../components/shared/PageBanner";
import { SurfaceCard } from "../components/shared/SurfaceCard";
import { ISSUE_TYPES, PRIORITIES, recentTickets, supportCategories } from "../data/support";
import { liftOnHover } from "../theme/motion";

const TICKET_STATUS_COLOR: Record<string, BadgeProps["color"]> = {
  Resolved: "success",
  Closed: "informative",
  Open: "warning",
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@media (max-width: 520px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  categoryCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalL,
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    width: "100%",
    minWidth: 0,
    ...liftOnHover,
  },
  categoryIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: "20px",
  },
  categoryTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  categoryDescription: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    flexGrow: 1,
  },
  categoryLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
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
    scrollMarginTop: "80px",
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
    paddingTop: tokens.spacingVerticalM,
    borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  ticketCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalL,
  },
  ticketHeading: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  ticketEyebrow: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  ticketTitle: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  ticketList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  ticketRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  ticketIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  ticketCopy: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flexGrow: 1,
    minWidth: 0,
  },
  ticketId: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  ticketSubject: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  ticketMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXS,
  },
  ticketUpdated: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
  },
});

export function SupportPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = (): void => {
    document.getElementById("support-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) {
      return;
    }
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className={styles.root}>
      <PageBanner
        eyebrow="Participant help center"
        title="Help & Support"
        description="Find a quick answer or open a request with the Hackable support team."
        actions={<PageBannerButton onClick={() => navigate("/faq")}>Browse FAQs</PageBannerButton>}
      />

      <div className={styles.categoryGrid}>
        {supportCategories.map((category) => (
          <SurfaceCard
            key={category.id}
            as="button"
            elevation="high"
            className={styles.categoryCard}
            onClick={scrollToForm}
          >
            <span className={styles.categoryIcon} aria-hidden="true">
              <category.icon />
            </span>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <p className={styles.categoryDescription}>{category.description}</p>
            <span className={styles.categoryLink}>
              Get help <ArrowRight16Regular />
            </span>
          </SurfaceCard>
        ))}
      </div>

      {submitted ? (
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Support request created.</MessageBarTitle>
            Typical response time is under four business hours.
          </MessageBarBody>
        </MessageBar>
      ) : null}

      <div className={styles.layout}>
        <SurfaceCard id="support-form" elevation="high" className={styles.formCard}>
          <div className={styles.formHeading}>
            <span className={styles.formEyebrow}>Create a ticket</span>
            <h2 className={styles.formTitle}>Tell us what is blocking you</h2>
            <p className={styles.formCaption}>Typical response time is under four business hours.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} id="issue-type-label">
                  Issue type *
                </label>
                <Dropdown aria-labelledby="issue-type-label" placeholder="Select issue type">
                  {ISSUE_TYPES.map((type) => (
                    <Option key={type}>{type}</Option>
                  ))}
                </Dropdown>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} id="priority-label">
                  Priority *
                </label>
                <Dropdown aria-labelledby="priority-label" defaultSelectedOptions={[PRIORITIES[0]]} defaultValue={PRIORITIES[0]}>
                  {PRIORITIES.map((priority) => (
                    <Option key={priority}>{priority}</Option>
                  ))}
                </Dropdown>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="support-subject">
                Subject *
              </label>
              <Input
                id="support-subject"
                name="subject"
                required
                placeholder="Short summary of the issue..."
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="support-description">
                Description *
              </label>
              <Textarea
                id="support-description"
                name="description"
                rows={5}
                required
                placeholder="Include what you expected, what happened, and any error message..."
              />
            </div>

            <div className={styles.formActions}>
              <Button appearance="primary" type="submit">
                Create support request
              </Button>
            </div>
          </form>
        </SurfaceCard>

        <SurfaceCard elevation="high" className={styles.ticketCard}>
          <div className={styles.ticketHeading}>
            <span className={styles.ticketEyebrow}>My requests</span>
            <h2 className={styles.ticketTitle}>Recent tickets</h2>
          </div>

          <div className={styles.ticketList}>
            {recentTickets.map((ticket) => (
              <div className={styles.ticketRow} key={ticket.id}>
                <span className={styles.ticketIcon} aria-hidden="true">
                  <DocumentBulletList20Regular />
                </span>
                <div className={styles.ticketCopy}>
                  <div className={styles.ticketMeta}>
                    <span className={styles.ticketId}>{ticket.id}</span>
                    <Badge appearance="tint" color={TICKET_STATUS_COLOR[ticket.status]} size="small">
                      {ticket.status}
                    </Badge>
                  </div>
                  <span className={styles.ticketSubject}>{ticket.subject}</span>
                  <span className={styles.ticketUpdated}>Updated {ticket.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
