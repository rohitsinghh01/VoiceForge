import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/features/marketing/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before you start generating speech.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-12 max-w-2xl rounded-2xl border bg-card px-6"
        >
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-base hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
