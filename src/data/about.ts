export const aboutHackathon = {
  title: "About Your Hackathon",
  description:
    "In this Hackathon, you'll explore and build solutions using Microsoft technologies such as Fabric, Microsoft Dynamics 365, Azure, Power Platform and more. Participants may choose any one use case from the available use cases. Once enrolled in a use case, you won't be able to enroll in another, so choose carefully.",
  primaryAction: "Explore use cases",
};

export interface Prerequisite {
  id: string;
  title: string;
  detail: string;
}

/**
 * Revealed when the Prerequisites disclosure is expanded. Written to match how
 * the platform actually gates participation — identity, tooling, and skill
 * baseline — rather than generic filler.
 */
export const prerequisites: Prerequisite[] = [
  {
    id: "account",
    title: "A Microsoft Learn profile linked to your work account",
    detail: "Progress, achievements and completion certificates are recorded against this profile.",
  },
  {
    id: "azure",
    title: "An active Azure subscription with Contributor access",
    detail: "Labs provision resources into your own subscription when you launch a challenge.",
  },
  {
    id: "tooling",
    title: "A modern browser, plus VS Code for the build tracks",
    detail: "Chromium-based browsers and Edge are fully supported. No local runtime installs are required.",
  },
  {
    id: "skills",
    title: "Working familiarity with your chosen use case's primary product",
    detail: "Each use case lists its difficulty level so you can pick one that matches your experience.",
  },
];
