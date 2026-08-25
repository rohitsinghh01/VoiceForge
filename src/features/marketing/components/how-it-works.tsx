import { howItWorksSteps } from "@/features/marketing/data/how-it-works";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-dashed border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="text-muted-foreground">
            From script to speech in three simple steps. No studio required.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border bg-card p-6 shadow-xs"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-[#ff8ee3]/20 via-[#57d7e0]/20 to-[#818CF8]/20">
                  <step.icon className="size-5 text-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Step {step.step}
                </span>
              </div>
              <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
