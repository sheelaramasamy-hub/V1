import type { QuickAction, RecentConversation, SuggestedPrompt } from "../types/aiAssistant";

export const assistantGreeting = {
  title: "Hi Alex, I'm your Hackable Assistant",
  subtitle: "Ask me about challenges, workshops, or your progress — I'm here to help you get unstuck.",
};

export const suggestedPrompts: SuggestedPrompt[] = [
  { id: "match-skills", label: "Which challenges match my skills?" },
  { id: "weekly-summary", label: "Summarize my progress this week" },
  { id: "prep-hackathon", label: "Help me prepare for a Hack in a Day" },
  { id: "team-formation", label: "How does team formation work for Hack to Build?" },
];

export const recentConversations: RecentConversation[] = [
  { id: "conv-1", title: "Prototype review checklist", timestamp: "Yesterday" },
  { id: "conv-2", title: "Azure AI Foundry quick start", timestamp: "3 days ago" },
  { id: "conv-3", title: "Scoring criteria for Cloud Resilience", timestamp: "Last week" },
];

export const quickActions: QuickAction[] = [
  { id: "browse-workshops", label: "Browse workshops", icon: "workshops" },
  { id: "view-achievements", label: "View my achievements", icon: "achievements" },
  { id: "continue-learning", label: "Continue learning path", icon: "learning" },
  { id: "contact-support", label: "Contact support", icon: "support" },
];
