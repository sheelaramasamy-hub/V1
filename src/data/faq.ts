export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting started",
    items: [
      {
        id: "what-is-hackable",
        question: "What is Hackable?",
        answer:
          "Hackable is the participant portal for Microsoft Global Partner Hackathons. It brings tracks, learning, workshops, submissions, and progress into one place.",
      },
      {
        id: "how-do-i-enroll",
        question: "How do I enroll in a hackathon?",
        answer:
          "Open All Tracks, choose an eligible challenge, and select Register or Enroll. The track then appears on your dashboard.",
      },
      {
        id: "join-more-than-one-track",
        question: "Can I join more than one track?",
        answer:
          "Yes. You can enroll in multiple tracks when schedules do not conflict, but focus on completing the milestones for each active challenge.",
      },
      {
        id: "complete-in-one-sitting",
        question: "Do I need to complete a track in one sitting?",
        answer:
          "No. Hack to Skill and Hack to Build tracks are designed to be worked on across days or weeks — your progress is saved automatically.",
      },
    ],
  },
  {
    id: "tracks-submissions",
    label: "Tracks & submissions",
    items: [
      {
        id: "submission-deadlines",
        question: "Where can I see submission deadlines?",
        answer:
          "The dashboard shows upcoming deadlines in the right rail. Each track page also includes its complete milestone schedule.",
      },
      {
        id: "update-a-submission",
        question: "Can I update a submission after uploading it?",
        answer: "You can replace files and edit evidence until the milestone deadline. The latest saved version is used for review.",
      },
      {
        id: "supported-file-types",
        question: "What file types are supported?",
        answer:
          "Tracks may accept links, Microsoft 365 documents, PDFs, images, and short videos. Requirements are listed beside each milestone.",
      },
      {
        id: "missed-deadline",
        question: "What happens if I miss a milestone deadline?",
        answer:
          "The milestone is marked incomplete, but you can keep progressing through the rest of the track — completed work is never lost.",
      },
    ],
  },
  {
    id: "workshops-learning",
    label: "Workshops & learning",
    items: [
      {
        id: "workshop-recordings",
        question: "Are workshop recordings available?",
        answer:
          "Most workshops are published as on-demand recordings within two business days. Sessions containing private team reviews are not recorded.",
      },
      {
        id: "learning-affects-score",
        question: "Do learning resources affect my score?",
        answer:
          "Learning progress does not directly add leaderboard points, but completing recommended modules can unlock track milestones.",
      },
      {
        id: "register-for-workshop",
        question: "How do I register for a live workshop?",
        answer: "Open Workshops, choose a session, and select Register. You'll get a calendar invite and a reminder before it starts.",
      },
    ],
  },
  {
    id: "account-access",
    label: "Account & access",
    items: [
      {
        id: "update-profile",
        question: "How do I update my profile or language preference?",
        answer:
          "Open the account menu in the top bar and choose Account settings to update your name, language, and notification preferences.",
      },
      {
        id: "cant-sign-in",
        question: "I can't sign in — what should I check first?",
        answer:
          "Confirm you're using the email your organization registered with Hackable, then clear your browser cache. If it still fails, open a support request.",
      },
      {
        id: "change-email",
        question: "Can I change the email address on file?",
        answer:
          "Email changes go through your organization's Microsoft 365 admin, since sign-in is tied to that identity. Contact support to start the process.",
      },
    ],
  },
];

export const totalFaqCount = faqCategories.reduce((sum, category) => sum + category.items.length, 0);
