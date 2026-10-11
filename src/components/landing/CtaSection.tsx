import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Closing call to action — visually strong, mirrors the hero language. */
export function CtaSection() {
  return (
    <section className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-fm-char px-6 py-14 text-center text-white md:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="mx-auto mb-7 flex h-10 w-fit items-center justify-center gap-1.5 rounded-full bg-white/10 px-4"
          >
            <span className="size-2 rounded-full bg-fm-amber" />
            <span className="size-2 rounded-full bg-fm-mint" />
            <span className="size-2 rounded-full bg-fm-sky" />
          </div>
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight md:text-[2.75rem] md:leading-[1.12]">
            Take the next step toward{" "}
            <span className="text-fm-mint">financial clarity.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/75 md:text-lg">
            Start with a clearer understanding of your money.
          </p>
          <div className="mt-9">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-fm-mint px-8 text-base font-bold text-fm-char hover:bg-white"
            >
              <Link to="/auth">
                Get Started
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/50">
            Dashboards on this page show illustrative sample data.
          </p>
        </div>
      </div>
    </section>
  );
}
