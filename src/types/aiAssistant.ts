export interface SuggestedPrompt {
  id: string;
  label: string;
}

export interface RecentConversation {
  id: string;
  title: string;
  timestamp: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: "workshops" | "achievements" | "support" | "learning";
}
