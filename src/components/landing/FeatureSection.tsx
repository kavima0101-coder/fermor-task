import { PieChart, Activity, Compass } from "lucide-react";
import { Section } from "./Section";

const BENEFITS = [
  {
    icon: PieChart,
    tint: "bg-fm-amber-soft",
    iconColor: "text-fm-amber",
    title: "Understand where your money goes",
    body: "See recurring costs, seasonal spikes and quiet leaks so you always know what your month actually looked like.",
  },
  {
    icon: Activity,
    tint: "bg-fm-sky-soft",
    iconColor: "text-fm-sky",
    title: "See your financial habits more clearly",
    body: "Patterns that hide inside day-to-day activity become visible, so you can evaluate them with fresh eyes.",
  },
  {
    icon: Compass,
    tint: "bg-fm-mint",
    iconColor: "text-fm-green",
    title: "Make more confident everyday decisions",
    body: "With a clearer picture in front of you, everyday choices get simpler and long-term plans feel less like guesses.",
  },
];

/** "Your finances, finally in focus" — three benefit cards. */
export function FeatureSection() {
  return (
    <Section
      id="features"
      eyebrow="Financial clarity"
      title="Your finances, finally in focus."
      description="Understanding your money is the first step toward changing it. These ideas shape what Fermor is being built around."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map(({ icon: Icon, tint, iconColor, title, body }) => (
          <article
            key={title}
            className="group rounded-3xl border border-fm-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-fm-green/30 hover:shadow-lg hover:shadow-emerald-900/5"
          >
            <span
              className={`inline-flex size-12 items-center justify-center rounded-2xl ${tint} ${iconColor} transition-transform duration-200 group-hover:scale-110`}
            >
              <Icon className="size-6" strokeWidth={2.2} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-fm-char">{title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-fm-ink-soft">
              {body}
            </p>
            <span
              aria-hidden="true"
              className="mt-5 block h-[3px] w-8 rounded-full bg-fm-amber transition-all duration-200 group-hover:w-14"
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
