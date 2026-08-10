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
  },
];

export const WORKSHOP_CATEGORY_FILTERS: { value: string; label: string }[] = [
  ...new Set(workshops.map((workshop) => workshop.category)),
].map((category) => ({ value: category, label: category }));
