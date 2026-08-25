import { AudioLines, PenLine, Volume2, type LucideIcon } from "lucide-react";

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Write your script",
    description:
      "Paste a story, ad copy, podcast intro, or any text. Use a sample prompt to get started instantly.",
    icon: PenLine,
  },
  {
    step: 2,
    title: "Pick a voice",
    description:
      "Choose from expressive system voices or clone your own. Preview voices before you generate.",
    icon: Volume2,
  },
  {
    step: 3,
    title: "Generate & listen",
    description:
      "Hit generate and get studio-quality audio in seconds. Play, download, and revisit your history anytime.",
    icon: AudioLines,
  },
];
