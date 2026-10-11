import { FermorWordmark } from "./Navbar";

const FOOTER_LINKS = [
  { label: "Product", href: "#preview" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Fermor", href: "#why-fermor" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Site footer — only verified destinations are linked. */
export function Footer() {
  return (
    <footer className="border-t border-fm-line bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:gap-20">
        <div className="max-w-sm">
          <a href="#top" aria-label="Fermor — back to top">
            <FermorWordmark />
          </a>
          <p className="mt-3 text-sm leading-relaxed text-fm-ink-soft">
            A financial technology platform helping people understand their
            finances and make clearer, more confident decisions.
          </p>
        </div>

        <nav aria-label="Footer" className="md:pt-1">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-fm-ink-soft">
            Explore
          </p>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-semibold text-fm-char/80 transition-colors hover:text-fm-green"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-fm-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-fm-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Fermor. All rights reserved.</p>
          <p className="max-w-md sm:text-right">
            All figures shown on this page are illustrative sample data, not
            real financial information.
          </p>
        </div>
      </div>
    </footer>
  );
}
