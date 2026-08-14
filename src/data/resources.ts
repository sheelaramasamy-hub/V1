import resourceBlueBloom from "../assets/images/resource-blue-bloom.png";
import resourceBlueFold from "../assets/images/resource-blue-fold.png";
import resourceSoftOrbit from "../assets/images/resource-soft-orbit.png";
import resourceSunriseArcs from "../assets/images/resource-sunrise-arcs.png";
import resourceVioletFolds from "../assets/images/resource-violet-folds.png";
import resourcePurpleSculpture from "../assets/images/resource-purple-sculpture.png";
import resourceFabricMark from "../assets/images/resource-fabric-mark.png";
import coverTwo from "../assets/images/challenge-cover-2.png";
import coverThree from "../assets/images/challenge-cover-3.png";
import type { FeaturedResource, Resource } from "../types/resources";

export const featuredResource: FeaturedResource = {
  id: "microsoft-fabric-for-analytics-teams",
  eyebrow: "Recommended next",
  title: "Microsoft Fabric for analytics teams",
  description: "Continue the learning path selected for your Data for Impact Sprint.",
  cover: resourceFabricMark,
  moduleLabel: "2 of 6 modules",
  progress: 34,
  actionLabel: "Continue",
};

export const resources: Resource[] = [
  {
    id: "secure-ai-apps-azure",
    category: "Learning path",
    title: "Secure your AI apps on Azure",
    description: "Apply identity, data protection, and threat controls to production AI.",
    meta: "45 min · 6 modules",
    level: "Intermediate",
    progress: 60,
    cover: resourceBlueBloom,
    actionLabel: "Continue learning",
    points: [
      "Apply Microsoft Entra identity controls to AI workloads",
      "Classify and protect sensitive training and prompt data",
      "Detect and respond to threats against production AI apps",
      "Apply Responsible AI guardrails before you ship",
    ],
  },
  {
    id: "responsible-ai-design-review",
    category: "Video",
    title: "Responsible AI design review",
    description: "A practical walkthrough of the Hackable impact assessment workflow.",
    meta: "32 min",
    level: "Beginner",
    progress: 25,
    cover: resourceBlueFold,
    actionLabel: "Continue learning",
    points: [
      "Walk through the Hackable impact assessment template",
      "Spot common fairness and transparency gaps early",
      "Frame mitigations judges expect to see at demo",
    ],
  },
  {
    id: "build-with-fabric",
    category: "Lab",
    title: "Build with Microsoft Fabric",
    description: "Create a lakehouse and publish an actionable Power BI report.",
    meta: "75 min · Guided",
    level: "Beginner",
    progress: 0,
    cover: resourceSoftOrbit,
    actionLabel: "Start learning",
    points: [
      "Provision a Fabric workspace and lakehouse",
      "Ingest sample data with a pipeline",
      "Publish a Power BI report your team can act on",
    ],
  },
  {
    id: "sustainable-cloud-foundations",
    category: "Learning path",
    title: "Sustainable cloud foundations",
    description: "Measure and optimize the carbon impact of Azure workloads.",
    meta: "50 min · 5 modules",
    level: "Intermediate",
    progress: 0,
    cover: resourceSunriseArcs,
    actionLabel: "Start learning",
    points: [
      "Measure the carbon impact of an Azure workload",
      "Apply the Well-Architected sustainability pillar",
      "Right-size compute and storage for lower impact",
    ],
  },
  {
    id: "hackathon-evidence-canvas",
    category: "Template",
    title: "Hackathon evidence canvas",
    description: "Frame the user problem, success measures, and test evidence.",
    meta: "Download · DOCX",
    level: "Beginner",
    progress: 0,
    cover: resourceVioletFolds,
    actionLabel: "Download",
    points: [
      "Frame the user problem in one page",
      "Define success measures judges can verify",
      "Log test evidence as you build",
    ],
  },
  {
    id: "pitching-a-technical-story",
    category: "Video",
    title: "Pitching a technical story",
    description: "Turn a working prototype into a concise, credible narrative.",
    meta: "24 min",
    level: "Beginner",
    progress: 100,
    cover: resourcePurpleSculpture,
    actionLabel: "Watch again",
    points: [
      "Structure a 3-minute technical demo narrative",
      "Lead with impact, not implementation detail",
      "Handle judge questions without losing the thread",
    ],
  },
  {
    id: "power-platform-apps",
    category: "Learning path",
    title: "Build apps with Power Platform",
    description: "Compose a Power Apps and Power Automate solution without writing infrastructure code.",
    meta: "35 min · 4 modules",
    level: "Beginner",
    progress: 0,
    cover: coverTwo,
    actionLabel: "Start learning",
    points: [
      "Build a canvas app bound to real data",
      "Automate an approval flow with Power Automate",
      "Share the app securely with your team",
    ],
  },
  {
    id: "copilot-studio-agents",
    category: "Learning path",
    title: "Design agents in Copilot Studio",
    description: "Design, test, and publish a custom Copilot Studio agent end to end.",
    meta: "50 min · 5 modules",
    level: "Intermediate",
    progress: 0,
    cover: coverThree,
    actionLabel: "Start learning",
    points: [
      "Design a topic and trigger structure for an agent",
      "Ground responses in your own knowledge sources",
      "Test and publish the agent to a channel",
    ],
  },
];

/** Looks up a resource by id across the catalogue and the featured spotlight. */
export function getResourceById(id: string | undefined): Resource | undefined {
  if (!id) return undefined;
  if (id === featuredResource.id) {
    return {
      id: featuredResource.id,
      category: "Learning path",
      title: featuredResource.title,
      description: featuredResource.description,
      meta: featuredResource.moduleLabel,
      level: "Intermediate",
      progress: featuredResource.progress,
      cover: featuredResource.cover,
      actionLabel: featuredResource.actionLabel,
      points: [
        "Connect Fabric to an existing analytics source",
        "Model data for self-serve reporting",
        "Share a governed workspace with your team",
      ],
    };
  }
  return resources.find((resource) => resource.id === id);
}

export const RESOURCE_CATEGORY_FILTERS: { value: string; label: string }[] = [
  { value: "Learning path", label: "Paths" },
  { value: "Video", label: "Videos" },
  { value: "Lab", label: "Labs" },
  { value: "Template", label: "Templates" },
];
