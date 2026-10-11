import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Product", href: "#preview" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Fermor", href: "#why-fermor" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Fermor text wordmark; shared by navbar and footer. */
export function FermorWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-2xl font-extrabold tracking-tight text-fm-char ${className}`}
    >
      Fermor
      <span className="text-fm-green">.</span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the viewport grows past the md breakpoint.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stopAndClose = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fm-line bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="rounded" aria-label="Fermor — back to top">
          <FermorWordmark />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-fm-ink-soft transition-colors hover:bg-muted hover:text-fm-char"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild className="rounded-full">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-fm-char md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-nav" className="border-t border-fm-line bg-background">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={stopAndClose}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-fm-char transition-colors hover:bg-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full rounded-full">
                <Link to="/auth" onClick={stopAndClose}>
                  Get Started
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
