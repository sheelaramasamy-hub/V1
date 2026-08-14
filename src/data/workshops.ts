import coverOne from "../assets/images/challenge-cover-1.png";
import coverTwo from "../assets/images/challenge-cover-2.png";
import coverThree from "../assets/images/challenge-cover-3.png";
import resourceBlueBloom from "../assets/images/resource-blue-bloom.png";
import resourceSoftOrbit from "../assets/images/resource-soft-orbit.png";
import resourceSunriseArcs from "../assets/images/resource-sunrise-arcs.png";
import type { Workshop } from "../types/workshops";

export const workshops: Workshop[] = [
  {
    id: "rapid-prototyping-azure-ai",
    status: "Live now",
    category: "AI",
    title: "Rapid prototyping with Azure AI",
    presenterName: "Samira Patel",
    presenterInitials: "SP",
    date: "Today · 3:00–4:30 PM IST",
    actionLabel: "Join live",
    cover: coverOne,
    description:
      "A hands-on session building a working AI prototype end to end with Azure AI Foundry — from model selection to a demoable UI, in one sitting.",
    agenda: [
      "Stand up an Azure AI Foundry project",
      "Wire a model to a simple front end",
      "Iterate live on prompts with the group",
      "Leave with a working prototype and repo",
    ],
  },
  {
    id: "designing-responsible-ai-experiences",
    status: "Upcoming",
    category: "Design",
    title: "Designing responsible AI experiences",
    presenterName: "Rohan Mehta",
    presenterInitials: "RM",
    date: "Aug 12 · 3:00–4:00 PM IST",
    actionLabel: "Register",
    cover: resourceSunriseArcs,
    description:
      "A design-led walkthrough of the patterns that keep AI features trustworthy — disclosure, override, and graceful failure — with real product examples.",
    agenda: [
      "Review the Hackable Responsible AI checklist",
      "Critique real AI feature flows as a group",
      "Practice writing disclosure and error copy",
      "Q&A on your own track's design",
    ],
  },
  {
    id: "power-platform-solve-a-thon-recap",
    status: "On demand",
    category: "Power Platform",
    title: "Power Platform solve-a-thon recap",
    presenterName: "Priya Nair",
    presenterInitials: "PN",
    date: "48 min · Recorded",
    actionLabel: "Watch now",
    cover: coverTwo,
    description:
      "Highlights from the Power Platform solve-a-thon — three winning builds walked through end to end, with the judges' scoring notes.",
    agenda: [
      "Watch three winning solve-a-thon builds",
      "See the judges' scoring criteria applied",
      "Pick up reusable Power Automate patterns",
    ],
  },
  {
    id: "secure-by-design-architecture-clinic",
    status: "Upcoming",
    category: "Cloud",
    title: "Secure by design architecture clinic",
    presenterName: "Diego Santos",
    presenterInitials: "DS",
    date: "Aug 15 · 5:30–6:30 PM IST",
    actionLabel: "Register",
    cover: resourceBlueBloom,
    description:
      "Bring your architecture diagram — this clinic reviews Zero Trust fundamentals live against real submissions from this event's tracks.",
    agenda: [
      "Refresher on Zero Trust architecture principles",
      "Live review of submitted architecture diagrams",
      "Common pitfalls in identity and network segmentation",
      "Open office hours for your own design",
    ],
  },
  {
    id: "lakehouse-to-live-dashboard",
    status: "Upcoming",
    category: "Data",
    title: "From lakehouse to live dashboard",
    presenterName: "Nina Gupta",
    presenterInitials: "NG",
    date: "Aug 18 · 2:00–3:30 PM IST",
    actionLabel: "Register",
    cover: coverThree,
    description:
      "Follow data from a Fabric lakehouse to a live Power BI dashboard, with the modeling decisions explained at each step.",
    agenda: [
      "Ingest sample data into a Fabric lakehouse",
      "Model a star schema for reporting",
      "Publish and refresh a Power BI dashboard",
      "Troubleshoot common refresh failures",
    ],
  },
  {
    id: "tell-a-compelling-demo-story",
    status: "On demand",
    category: "Pitching",
    title: "Tell a compelling demo story",
    presenterName: "Marcus Lee",
    presenterInitials: "ML",
    date: "36 min · Recorded",
    actionLabel: "Watch now",
    cover: resourceSoftOrbit,
    description:
      "A recorded coaching session on turning a working prototype into a three-minute story that judges remember.",
    agenda: [
      "Structure a demo around impact, not features",
      "Open with the problem, not the tech stack",
      "Handle a live-demo failure without losing the room",
    ],
  },
];

export const WORKSHOP_CATEGORY_FILTERS: { value: string; label: string }[] = [
  ...new Set(workshops.map((workshop) => workshop.category)),
].map((category) => ({ value: category, label: category }));

export function getWorkshopById(id: string | undefined): Workshop | undefined {
  return id ? workshops.find((workshop) => workshop.id === id) : undefined;
}
