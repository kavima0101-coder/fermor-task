import { Button } from "@/components/ui/button";
import { GetStartedButton } from "./GetStartedModal";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft colorful wash behind the hero, kept subtle and calm */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38rem 20rem at 82% 8%, rgba(47,158,196,0.10), transparent 70%), radial-gradient(30rem 18rem at 8% 78%, rgba(242,169,59,0.12), transparent 70%), radial-gradient(26rem 16rem at 48% 0%, rgba(23,107,77,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-2 lg:items-center lg:gap-10">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-fm-ink-soft">
            A clearer way to manage your financial life
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-fm-char md:text-[3.4rem]">
            Make your money make{" "}
            <span className="relative whitespace-nowrap text-fm-green">
              more sense
              {/* hand-drawn underline accent */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-2 left-0 w-full"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 8.5C60 2.5 120 2.5 217 6.5"
                  stroke="#F2A93B"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fm-ink-soft md:text-lg">
            Understand your finances, make clearer decisions, and take
            confident steps toward your financial goals with Fermor.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <GetStartedButton size="lg" className="bg-fm-green px-7 text-base hover:bg-fm-green-deep" />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-fm-line bg-white px-7 text-base text-fm-char hover:bg-muted"
            >
              <a href="#preview">Explore the platform</a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-fm-ink-soft">
            Screens below show illustrative sample data — not real accounts.
          </p>
        </div>

        {/* Product preview */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <DashboardPreview />
          </div>
          {/* small floating accent card */}
          <div className="absolute -left-2 bottom-8 hidden -rotate-2 items-center gap-2 rounded-2xl border border-fm-line bg-white px-3.5 py-2.5 shadow-lg shadow-emerald-900/5 lg:flex">
            <span className="flex size-8 items-center justify-center rounded-xl bg-fm-plum-soft font-extrabold text-fm-plum">
              ✱
            </span>
            <div className="leading-tight">
              <p className="text-[0.68rem] font-bold uppercase tracking-wide text-fm-ink-soft">
                Net income
              </p>
              <p className="text-sm font-extrabold text-fm-char">+$1,690</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
