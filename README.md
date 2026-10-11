# Fermor — Fintech Homepage

A polished, responsive homepage for **Fermor**, a financial technology platform
helping people understand their finances, make clearer decisions, and take
confident steps toward their goals.

> Every number, chart and transaction on the page is **fictional sample data**
> created to demonstrate the interface. Nothing represents real customers or
> real financial information.

## Quick start

```bash
bun install     # or npm install
bun run dev     # or npm run dev  → http://localhost:5173
```

Other scripts:

```bash
bun run build   # type-check + production build
bun run preview # serve the production build locally
bun run lint    # ESLint
```

The project deploys to Vercel or Netlify as a standard Vite static site
(build command `npm run build`, output directory `dist`).

## Tech stack

- **React 19 + Vite 7**, written in TypeScript for type safety
- **Tailwind CSS 4** (theme tokens defined in `src/index.css`) with shadcn/ui
  primitives (button, accordion) over Radix UI
- **lucide-react** icons, **framer-motion** not required — animations are
  pure CSS transitions that respect `prefers-reduced-motion`
- **Custom SVG/CSS charts** — no heavyweight charting library

## Project structure

```
src/
├── data/
│   └── finance.ts              # All fictional sample data + USD formatters
├── components/
│   ├── landing/
│   │   ├── Section.tsx         # Shared section shell (anchor, eyebrow, title)
│   │   ├── Navbar.tsx          # Sticky nav + mobile hamburger menu
│   │   ├── Hero.tsx            # Headline, CTAs, dashboard preview
│   │   ├── DashboardPreview.tsx# React/CSS dashboard mock with SVG charts
│   │   ├── FeatureSection.tsx  # "Your finances, finally in focus"
│   │   ├── ProductPreview.tsx  # Large product showcase with charts
│   │   ├── HowItWorks.tsx      # 3-step Understand → Discover → Act
│   │   ├── WhyFermor.tsx       # Editorial principles layout
│   │   ├── FinancialSnapshot.tsx # Interactive month comparison
│   │   ├── FAQ.tsx             # Accessible accordion
│   │   ├── CtaSection.tsx      # Closing call to action
│   │   └── Footer.tsx          # Wordmark, links, sample-data notice
│   └── ui/                     # shadcn/ui primitives (template)
└── pages/
    └── Landing.tsx             # Composes the full homepage
```

## Key design decisions

- **Colorful, trustworthy palette** — warm off-white background (`#F8F9F6`),
  deep charcoal text (`#17231E`), forest-green primary (`#176B4D`), supported
  by an energetic set of mint, amber, sky, coral and plum accents used
  consistently across icons, charts, badges and bands. Colors are exposed as
  `--fm-*` CSS variables and Tailwind theme utilities so the system, not
  hard-coded hexes, carries the identity.
- **Typography** — Manrope with tight tracking and heavy headline weights for
  an editorial, premium feel; system fallbacks keep rendering instant.
- **Honest product previews** — dashboards are real React components with
  SVG/CSS charts driven by typed sample data, labelled "Sample data" /
  "Illustrative data" wherever shown. A fixed copy explains nothing is real.
- **Interaction without a backend** — the month selector recomputes stats,
  layout-stable stacked bars, a daily-spend trend SVG and an `aria-live`
  summary paragraph; the FAQ is a Radix accordion (mouse, touch, keyboard).
- **Accessibility & reduced motion** — semantic landmarks, labelled
  progress/charts via `role="img"` + `aria-label`, focus-visible rings,
  `scroll-behavior: smooth` that switches off under reduced-motion
  preferences, and no horizontal overflow at 320px.
- **Deliberate scope** — no fake sign-ups (`/auth` routes to the app's real
  auth page via the template), no invented pricing, integrations or
  regulatory claims.

## Screens

| Mobile | Desktop |
| --- | --- |
| Stacked hero with full-width dashboard | Two-column hero with dashboard preview |

*(Run the dev server to view; screenshots are intentionally omitted from the
repo to keep it lean — capture them locally from the running app.)*
