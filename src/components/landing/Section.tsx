import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  /** Utility classes for the section band, e.g. backgrounds. */
  className?: string;
  /** Inner wrapper classes, adjust alignment/width when needed. */
  innerClassName?: string;
};

/** Shared section shell: id anchor, eyebrow-dot, heading, optional lede. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  innerClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div
        className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${innerClassName}`}
      >
        {(eyebrow || title || description) && (
          <header className="mb-12 md:mb-14 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-fm-ink-soft">
                <span className="h-2 w-2 rounded-full bg-fm-amber" />
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl font-extrabold tracking-tight text-fm-char md:text-[2.6rem] md:leading-[1.12]">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-fm-ink-soft md:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
