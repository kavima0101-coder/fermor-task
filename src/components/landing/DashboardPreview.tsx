import type { ReactNode } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  PiggyBank,
  LineChart,
} from "lucide-react";
import {
  CURRENT_MONTH,
  fmtCentUSD,
  fmtSignedUSD,
  fmtUSD,
} from "@/data/finance";

/* ── Small chart primitives (SVG, sized for the preview card) ──────────────── */

/** Minimal multi-point line chart with a soft area fill. */
function MiniLineChart({
  data,
  stroke = "#176B4D",
  fill = "rgba(23,107,77,0.12)",
  className = "",
}: {
  data: number[];
  stroke?: string;
  fill?: string;
  className?: string;
}) {
  const w = 260;
  const h = 76;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const step = w / Math.max(1, data.length - 1);
  const pts = data.map((v, i) => {
    const x = (i * step).toFixed(2);
    const y = (h - 10 - ((v - min) / span) * (h - 20)).toFixed(2);
    return [x, y] as const;
  });
  const line = pts.map((p) => p.join(",")).join(" ");
  const area = `${pts[0][0]},${h} ${line} ${pts[pts.length - 1][0]},${h}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points={area} fill={fill} stroke="none" />
      <polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BAR_COLORS = [
  "#F2A93B",
  "#2F9EC4",
  "#176B4D",
  "#E2694F",
  "#7C5CBF",
  "#F2A93B",
  "#2F9EC4",
];

/** Compact weekly-spend bars, one per weekday-style bucket. */
function MiniBars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-24 items-end gap-1.5" aria-hidden="true">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-[5px] transition-all duration-300"
            style={{
              height: `${Math.max(8, (v / max) * 84)}px`,
              background: BAR_COLORS[i % BAR_COLORS.length],
            }}
          />
        </div>
      ))}
    </div>
  );
}

/** Donut built from the month's category mix. */
function Donut({ data }: { data: { amount: number; color: string }[] }) {
  const total = data.reduce((s, c) => s + c.amount, 0);
  const r = 15.9155; // radius so circumference is exactly 100

  const segments = data.map((cat, i) => {
    const pct = (cat.amount / total) * 100;
    const offset = data
      .slice(0, i)
      .reduce((s, prev) => s + (prev.amount / total) * 100, 0);
    return (
      <circle
        key={i}
        cx="21"
        cy="21"
        r={r}
        fill="none"
        stroke={cat.color}
        strokeWidth={5.5}
        strokeDasharray={`${pct.toFixed(3)} ${(100 - pct).toFixed(3)}`}
        strokeDashoffset={(-offset + 25).toFixed(3)}
        strokeLinecap="butt"
      />
    );
  });

  return (
    <svg viewBox="0 0 42 42" className="size-28 shrink-0" aria-hidden="true">
      <circle cx="21" cy="21" r={r} fill="none" stroke="#EEF1EC" strokeWidth={5.5} />
      {segments}
    </svg>
  );
}

/* ── Tiny card helpers ─────────────────────────────────────────────────────── */

function StatTile({
  icon,
  tint,
  label,
  value,
  delta,
}: {
  icon: ReactNode;
  tint: string;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-fm-line bg-white p-3.5">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: tint }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
          {label}
        </p>
        <p className="text-lg font-extrabold text-fm-char">{value}</p>
      </div>
      <span
        className={`ml-auto text-xs font-bold ${
          delta.startsWith("-") ? "text-fm-coral" : "text-fm-green"
        }`}
      >
        {delta}
      </span>
    </div>
  );
}

/* ── The dashboard mock ────────────────────────────────────────────────────── */

/**
 * Hero-side "product screenshot" rendered purely with React + CSS/SVG.
 * Everything shown is fictional sample data from src/data/finance.ts.
 */
export function DashboardPreview() {
  const m = CURRENT_MONTH;
  const donutData = [...m.categories].sort((a, b) => b.amount - a.amount);

  // Compress the 31-day series into 8 weekly buckets for the bar chart.
  const buckets = Array.from({ length: 8 }, (_, i) =>
    m.series
      .slice(i * 4, i * 4 + 4)
      .reduce((s, v) => s + v, 0),
  );

  // Savings goal: fixed illustrative values.
  const goalTarget = 6000;
  const goalSaved = 3450;
  const goalPct = Math.round((goalSaved / goalTarget) * 100);

  return (
    <div className="relative w-full max-w-md rounded-3xl border border-fm-line bg-white shadow-xl shadow-emerald-900/5">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-fm-line px-5 py-3.5">
        <p className="text-xs font-bold text-fm-ink-soft">
          September overview
        </p>
        <span className="rounded-full bg-fm-amber-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-fm-char">
          Sample data
        </span>
      </div>

      <div className="space-y-3.5 p-5">
        {/* balance */}

        <div className="rounded-2xl bg-fm-green p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-white/70">
                Total balance
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">
                {fmtUSD(11142)}
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-bold">
              <TrendingUp className="size-3" />
              +6.2%
            </span>
          </div>
          <div className="mt-3 rounded-xl bg-white/10 p-2.5">
            <MiniLineChart data={m.series} stroke="#8FE3C0" fill="rgba(255,255,255,0.14)" />
          </div>
          <p className="mt-2 text-[0.65rem] text-white/60">
            Illustrative trends — not real account data.
          </p>
        </div>

        {/* income / expenses */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <StatTile
            icon={<ArrowDownLeft className="size-4 text-fm-green" />}
            tint="#DDEFE4"
            label="Income"
            value={fmtUSD(m.income)}
            delta="+9.6%"
          />
          <StatTile
            icon={<ArrowUpRight className="size-4 text-fm-coral" />}
            tint="#FBE6E0"
            label="Expenses"
            value={fmtUSD(m.expenses)}
            delta="-7.5%"
          />
        </div>

        {/* spending breakdown + goal */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div className="rounded-2xl border border-fm-line p-4">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
              Spending mix
            </p>
            <div className="flex items-center gap-4">
              <Donut data={donutData} />
              <ul className="min-w-0 space-y-1.5">
                {donutData.slice(0, 3).map((c) => (
                  <li key={c.name} className="flex items-center gap-2 text-[0.7rem]">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: c.color }}
                    />
                    <span className="truncate font-semibold text-fm-char">
                      {c.name}
                    </span>
                    <span className="ml-auto font-bold text-fm-ink-soft">
                      {Math.round((c.amount / m.expenses) * 100)}%
                    </span>
                    <span className="sr-only">
                      of monthly spending, {fmtUSD(c.amount)}
                    </span>
                    <span className="hidden sm:block font-bold text-fm-ink-soft">
                      {fmtUSD(c.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="rounded-2xl border border-fm-line p-4">
              <div className="flex items-center justify-between">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                  Savings goal
                </p>
                <PiggyBank className="size-4 text-fm-sky" />
              </div>
              <p className="mt-2 text-lg font-extrabold text-fm-char">
                {fmtUSD(goalSaved)}{" "}
                <span className="text-xs font-bold text-fm-ink-soft">
                  of {fmtUSD(goalTarget)}
                </span>
              </p>
              <div
                role="progressbar"
                aria-valuenow={goalPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Emergency fund: ${goalPct}% saved (sample)`}
                className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-fm-mint"
              >
                <div
                  className="h-full rounded-full bg-fm-sky transition-all duration-500"
                  style={{ width: `${goalPct}%` }}
                />
              </div>
            </div>

            {/* weekly bars */}
            <div className="rounded-2xl border border-fm-line p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                  Weekly spend
                </p>
                <LineChart className="size-4 text-fm-plum" />
              </div>
              <MiniBars data={buckets} />
            </div>
          </div>
 </div>

        {/* transactions */}
        <div className="rounded-2xl border border-fm-line p-3">
          <p className="px-1.5 pb-2 pt-1 text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
            Recent activity
          </p>
          <ul>
            {m.transactions.slice(0, 4).map((t) => (
              <li
                key={t.label}
                className="flex items-center justify-between gap-3 rounded-xl px-1.5 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-fm-char">{t.label}</p>
                  <p className="text-[0.7rem] text-fm-ink-soft">{t.date}</p>
                </div>
                <span
                  className={`text-sm font-bold tabular-nums ${
                    t.amount < 0 ? "text-fm-char" : "text-fm-green"
                  }`}
                >
                  {fmtSignedUSD(t.amount)}
                </span>
                <span className="sr-only">
                  {fmtCentUSD(Math.abs(t.amount))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}