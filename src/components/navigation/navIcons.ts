import type { FluentIcon } from "@fluentui/react-icons";
import {
  ChatHelp24Filled,
  ChatHelp24Regular,
  DocumentData24Filled,
  DocumentData24Regular,
  FormMultipleCollection24Filled,
  FormMultipleCollection24Regular,
  Headset24Filled,
  Headset24Regular,
  Home24Filled,
  Home24Regular,
  PeopleCommunity24Filled,
  PeopleCommunity24Regular,
  PersonFeedback24Filled,
  PersonFeedback24Regular,
  Trophy24Filled,
  Trophy24Regular,
} from "@fluentui/react-icons";
import type { NavIconKey } from "../../types/navigation";

/**
 * Exactly the Fluent System Icons named in the Figma side navigation's component
 * descriptions (node 1643:54068). The nav rail renders at the 24px size ramp,
 * which is the size Fluent specifies for a 68px-wide navigation tile — regular
 * for rest state, filled for selected, per Fluent's icon usage guidance.
 */
export const navIcons: Record<NavIconKey, { regular: FluentIcon; filled: FluentIcon }> = {
  home: { regular: Home24Regular, filled: Home24Filled },
  allTracks: { regular: DocumentData24Regular, filled: DocumentData24Filled },
  resources: { regular: PeopleCommunity24Regular, filled: PeopleCommunity24Filled },
  leaderboard: { regular: FormMultipleCollection24Regular, filled: FormMultipleCollection24Filled },
  workshop: { regular: Trophy24Regular, filled: Trophy24Filled },
  feedback: { regular: PersonFeedback24Regular, filled: PersonFeedback24Filled },
  support: { regular: Headset24Regular, filled: Headset24Filled },
  faq: { regular: ChatHelp24Regular, filled: ChatHelp24Filled },
};
