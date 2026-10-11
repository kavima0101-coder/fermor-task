import { Eye, SearchCheck, Footprints } from "lucide-react";
import { Section } from "./Section";

const STEPS = [
  {
    number: "01",
    icon: Eye,
    tint: "bg-fm-amber-soft",
    iconColor: "text-fm-amber",
    title: "Understand",
    body: "Get a clearer view of your financial situation and what it actually looks like month to month.",
  },
  {
    number: "02",
    icon: SearchCheck,
    tint: "bg-fm-sky-soft",
    iconColor: "text-fm-sky",
    title: "Discover",
    body: "Identify spending patterns and opportunities to improve, without staring at a wall of numbers.",
  },
  {
    number: "03",
    icon: Footprints,
    tint: "bg-fm-mint",
    iconColor: "text-fm-green",
    title: "Take action",
    body: "Use your insights to make more informed financial decisions and keep the momentum going.",
  },
];

/** "How it works" — horizontal 3-step track on desktop, vertical on mobile. */
export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="band-mint"
      eyebrow="How it works"
      title="Three steps. One clear picture."
      description="Fermor is built around a simple loop: understand first, discover what matters, then act on it."
    >
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {/* connector line on desktop */}
        <div
          aria-hidden="true"
          className="absolute left-[16%] right-[16%] top-7 hidden border-t-2 border-dashed border-fm-green/25 md:block"
        />
        {STEPS.map(({ icon: Icon, number, tint, iconColor, title, body }) => (
          <li key={number} className="relative">
            <div className="flex flex-col items-center gap-5 text-center md:gap-6">
              <div className="relative">
                <span
                  className={`relative z-10 flex size-14 items-center justify-center rounded-2xl border border-fm-line bg-white shadow-sm ${tint}`}
                >
                  <Icon className={`size-6 ${iconColor}`} strokeWidth={2.2} />
                </span>
                <span className="absolute -right-2 -top-2 z-20 flex size-6 items-center justify-center rounded-full bg-fm-green text-[0.65rem] font-extrabold text-white">
                  {number}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-fm-char">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-fm-ink-soft">
                  {body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
