export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is VoiceForge?",
    answer:
      "VoiceForge is an AI-powered text-to-speech platform. Write or paste any text, pick a voice, and generate natural-sounding audio in seconds — for stories, ads, podcasts, games, and more.",
  },
  {
    question: "Can I clone my own voice?",
    answer:
      "Yes. Upload a short voice sample and VoiceForge creates a custom voice you can use across all your generations. Your cloned voices stay private to your organization.",
  },
  {
    question: "How does pricing work?",
    answer:
      "VoiceForge uses pay-as-you-go billing. Speech generation starts at $0.30 per 1,000 characters, so you only pay for what you use — no subscriptions required.",
  },
  {
    question: "What voices are available?",
    answer:
      "Browse a library of system voices across categories and languages, or create your own. Every voice is tuned for expressive, lifelike delivery.",
  },
  {
    question: "Can I use the audio commercially?",
    answer:
      "Generated audio is yours to use in your projects. Check your plan details for any usage limits, and reach out if you have specific licensing questions.",
  },
  {
    question: "Do I need an organization to get started?",
    answer:
      "Resonance works with team organizations through Clerk. After signing up, you'll create or join an organization to manage voices, billing, and generations together.",
  },
];
