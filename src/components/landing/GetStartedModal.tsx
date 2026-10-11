import { useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Drop-in replacement for the primary "Get Started" CTA.
 *
 * This homepage is a frontend assignment, so instead of sending people to an
 * unfinished dashboard the button opens an honest modal explaining that Fermor
 * is a conceptual preview — and offers a way back into the page itself.
 */
export function GetStartedButton({
  className = "",
  size = "default",
  children = (
    <>
      Get Started
      <ArrowRight className="ml-1 size-4" />
    </>
  ),
}: {
  className?: string;
  size?: "default" | "sm" | "lg";
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const scrollToPreview = () => {
    setOpen(false);
    document
      .getElementById("preview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size={size}
        onClick={() => setOpen(true)}
        className={`rounded-full ${className}`}
      >
        {children}
      </Button>

      <DialogContent className="max-w-md rounded-3xl border-fm-line bg-white p-0 sm:rounded-3xl">
        <div className="relative overflow-hidden rounded-3xl">
          {/* decorative colorful header band */}
          <div
            aria-hidden="true"
            className="h-24 w-full"
            style={{
              background:
                "linear-gradient(120deg, #176B4D 0%, #2F9EC4 55%, #7C5CBF 100%)",
            }}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close dialog"
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35"
          >
            <X className="size-4" />
          </button>
          <span
            aria-hidden="true"
            className="absolute -top-5 left-6 flex size-14 items-center justify-center rounded-2xl border-4 border-white bg-fm-amber-soft"
          >
            <Sparkles className="size-6 text-fm-amber" />
          </span>

          <DialogHeader className="px-6 pb-1 pt-6 text-left sm:text-left">
            <DialogTitle className="text-xl font-extrabold tracking-tight text-fm-char">
              Fermor is a conceptual preview
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-relaxed text-fm-ink-soft">
              This homepage is a frontend demonstration of what Fermor is
              working toward. Every dashboard, chart and transaction you've
              seen is fictional sample data — there are no accounts to create
              or connect yet.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 px-6 pb-6">
            <ul className="space-y-2 rounded-2xl bg-fm-mint/50 p-4 text-xs leading-relaxed text-fm-char/90">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-fm-green" />
                No signup, payment or financial advice is offered on this page.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-fm-amber" />
                Numbers and charts are illustrative — never real customer data.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-fm-sky" />
                Stay tuned as the product takes shape.
              </li>
            </ul>

            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
              <Button
                onClick={scrollToPreview}
                className="flex-1 rounded-full bg-fm-green hover:bg-fm-green-deep"
              >
                Explore the preview
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border-fm-line text-fm-char hover:bg-muted"
              >
                Keep browsing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
