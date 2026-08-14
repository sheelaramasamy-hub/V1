import coverOne from "../assets/images/challenge-cover-1.png";
import coverTwo from "../assets/images/challenge-cover-2.png";
import coverThree from "../assets/images/challenge-cover-3.png";
import type { RecommendedItem } from "../types/recommendations";

/**
 * The first item mirrors the Figma reference; the remaining cards use distinct
 * Microsoft learning topics and artwork while preserving the designed layout.
 */
export const recommendedItems: RecommendedItem[] = [
  {
    id: "secure-ai-apps",
    provider: "Microsoft Learn",
    durationMinutes: 45,
    title: "Secure your AI apps on Azure",
    actionLabel: "Start learning",
    resourceId: "secure-ai-apps-azure",
  },
  {
    id: "fabric-analytics-foundations",
    provider: "Microsoft Learn",
    durationMinutes: 60,
    title: "Analyze data with Microsoft Fabric",
    actionLabel: "Start learning",
    thumbnail: coverOne,
    resourceId: "build-with-fabric",
  },
  {
    id: "power-platform-apps",
    provider: "Microsoft Learn",
    durationMinutes: 35,
    title: "Build apps with Power Platform",
    actionLabel: "Start learning",
    thumbnail: coverTwo,
    resourceId: "power-platform-apps",
  },
  {
    id: "copilot-studio-agents",
    provider: "Microsoft Learn",
    durationMinutes: 50,
    title: "Design agents in Copilot Studio",
    actionLabel: "Start learning",
    thumbnail: coverThree,
    resourceId: "copilot-studio-agents",
  },
];
