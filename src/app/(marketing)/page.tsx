import type { Metadata } from "next";

import { LandingView } from "@/features/marketing/views/landing-view";

export const metadata: Metadata = {
  title: "VoiceForge — AI Text-to-Speech & Voice Cloning",
  description:
    "Turn text into lifelike speech in seconds. Generate studio-quality audio for stories, ads, podcasts, and more with AI-powered voices.",
};

export default function LandingPage() {
  return <LandingView />;
}