import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "./Section";

const FAQS = [
  {
    q: "What is Fermor?",
    a: "Fermor is a financial technology platform focused on helping people understand their finances, make informed decisions, and feel more confident about their next steps.",
  },
  {
    q: "How can Fermor help me understand my finances?",
    a: "Fermor is built around making financial information readable: where money went, what patterns are repeating, and what a clearer next decision looks like. The homepage previews on this page are conceptual demonstrations of that direction.",
  },
  {
    q: "Is the information shown on this homepage real financial data?",
    a: "No. Every account, balance, chart and transaction on this page is fictional sample data created purely to demonstrate the interface. Nothing here represents real customers or real financial information.",
  },
  {
    q: "How do I get started?",
    a: "Use the Get Started button to create an account. As the product evolves, this page will explain exactly what to connect and set up — nothing is required beyond that today.",
  },
];

/** FAQ section with an accessible accordion (mouse, touch and keyboard). */
export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="Questions"
      title="Frequently asked questions."
    >
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={f.q}
            value={`faq-${i}`}
            className="mb-3 rounded-2xl border border-fm-line bg-white px-5 data-[state=open]:border-fm-green/30"
          >
            <AccordionTrigger className="py-4 text-left text-base font-bold text-fm-char hover:no-underline [&>svg]:text-fm-green [&>svg]:size-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-fm-ink-soft">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
