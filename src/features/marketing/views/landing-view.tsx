import { LandingFooter } from "@/features/marketing/components/landing-footer";
import { LandingHeader } from "@/features/marketing/components/landing-header";
import { LandingHero } from "@/features/marketing/components/landing-hero";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { FaqSection } from "@/features/marketing/components/faq-section";

export function LandingView() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <HowItWorks />
        <FaqSection />
      </main>
      <LandingFooter />
    </div>
  );
}
