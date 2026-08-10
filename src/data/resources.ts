import resourceBlueBloom from "../assets/images/resource-blue-bloom.png";
import resourceBlueFold from "../assets/images/resource-blue-fold.png";
import resourceSoftOrbit from "../assets/images/resource-soft-orbit.png";
import resourceSunriseArcs from "../assets/images/resource-sunrise-arcs.png";
import resourceVioletFolds from "../assets/images/resource-violet-folds.png";
import resourcePurpleSculpture from "../assets/images/resource-purple-sculpture.png";
import resourceFabricMark from "../assets/images/resource-fabric-mark.png";
import type { FeaturedResource, Resource } from "../types/resources";

export const featuredResource: FeaturedResource = {
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
    progress: 60,
    cover: resourceBlueBloom,
    actionLabel: "Continue learning",
  },
  {
    id: "responsible-ai-design-review",
    category: "Video",
    title: "Responsible AI design review",
    description: "A practical walkthrough of the Hackable impact assessment workflow.",
    meta: "32 min",
    progress: 25,
    cover: resourceBlueFold,
    actionLabel: "Continue learning",
  },
  {
    id: "build-with-fabric",
    category: "Lab",
    title: "Build with Microsoft Fabric",
    description: "Create a lakehouse and publish an actionable Power BI report.",
    meta: "75 min · Guided",
    progress: 0,
    cover: resourceSoftOrbit,
    actionLabel: "Start learning",
  },
  {
    id: "sustainable-cloud-foundations",
    category: "Learning path",
    title: "Sustainable cloud foundations",
    description: "Measure and optimize the carbon impact of Azure workloads.",
    meta: "50 min · 5 modules",
    progress: 0,
    cover: resourceSunriseArcs,
    actionLabel: "Start learning",
  },
  {
    id: "hackathon-evidence-canvas",
    category: "Template",
    title: "Hackathon evidence canvas",
    description: "Frame the user problem, success measures, and test evidence.",
    meta: "Download · DOCX",
    progress: 0,
    cover: resourceVioletFolds,
    actionLabel: "Download",
  },
  {
    id: "pitching-a-technical-story",
    category: "Video",
    title: "Pitching a technical story",
    description: "Turn a working prototype into a concise, credible narrative.",
    meta: "24 min",
    progress: 100,
    cover: resourcePurpleSculpture,
    actionLabel: "Watch again",
  },
];

export const RESOURCE_CATEGORY_FILTERS: { value: string; label: string }[] = [
  { value: "Learning path", label: "Paths" },
  { value: "Video", label: "Videos" },
  { value: "Lab", label: "Labs" },
  { value: "Template", label: "Templates" },
];
