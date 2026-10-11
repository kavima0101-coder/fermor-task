import { AlignLeft, Sparkles, CircleCheck } from "lucide-react";
import { Section } from "./Section";

const PRINCIPLES = [
  {
    icon: AlignLeft,
    term: "Clarity",
    contrast: "over complexity",
    body: "Numbers only help when you can read them. Fermor aims to present your finances in a way that explains, not overwhelms.",
  },
  {
    icon: Sparkles,
    term: "Useful insights",
    contrast: "over information overload",
    body: "A shorter list of observations you actually understand beats a dashboard full of detail you never look at again.",
  },
  {
    icon: CircleCheck,
    term: "Confident decisions",
    contrast: "over guesswork",
    body: "When the picture is clear, the next step stops feeling like a gamble — and starts feeling deliberate.",
  },
];

/** "Why Fermor" — editorial, typography-led principles list. */
export function WhyFermor() {
  return (
    <Section
      id="why-fermor"
      eyebrow="Why Fermor"
      title={
        <>
          Clarity changes how{" "}
          <span className="hl-sweep text-fm-char">you move forward.</span>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Principles */}
        <div>
          <dl className="divide-y divide-fm-line border-y border-fm-line">
            {PRINCIPLES.map(({ icon: Icon, term, contrast, body }) => (
              <div
                key={term}
                className="group grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-7 md:py-8"
              >
                <dt className="flex items-center gap-3 sm:max-w-[17rem]">
                  <Icon
                    className="size-5 shrink-0 text-fm-amber transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={2.2}
                  />
                  <span className="text-lg font-extrabold tracking-tight text-fm-char">
                    {term}{" "}
                    <span className="font-semibold text-fm-green">
                      {contrast}
                    </span>
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-fm-ink-soft md:text-[0.95rem]">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Side column: a quiet editorial aside */}
        <aside className="flex w-full max-w-xs flex-col justify-center gap-4 rounded-3xl bg-fm-char p-8 text-white lg:w-auto">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/60">
            Our starting point
          </p>
          <p className="text-2xl font-extrabold leading-snug tracking-tight">
            Money is stressful when it is{" "}
            <span className="text-fm-mint">unclear</span> — and calm when it is
            not.
          </p>
          <p className="text-sm leading-relaxed text-white/70">
            Fermor begins from the belief that most people don't need more
            data. They need a better view of the data they already generate.
          </p>
        </aside>
      </div>
    </Section>
  );
}
