import { useState } from "react";
import { CalendarDays, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Section } from "./Section";
import { SAMPLE_MONTHS, fmtSignedUSD, fmtUSD } from "@/data/finance";

/** Horizontal stacked bar built with plain divs and the category colors. */
function StackedCategoryBar({
  data,
  total,
}: {
  data: { name: string; amount: number; color: string }[];
  total: number;
}) {
  return (
    <div
      role="img"
      aria-label={`Bar chart of spending by category: ${data
        .map((c) => `${c.name} ${fmtUSD(c.amount)}`)
        .join(", ")} (sample data)`}
    >
      <div className="flex h-14 w-full overflow-hidden rounded-xl gap-[3px]">
        {data.map((c) => (
          <div
            key={c.name}
            style={{
              flexGrow: c.amount,
              flexBasis: 0,
              background: c.color,
            }}
            className="h-full min-w-[6px] rounded-md transition-all duration-500"
            title={`${c.name}: ${fmtUSD(c.amount)}`}
          />
        ))}
      </div>
      {/* legend below keeps the chart readable on all widths */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {data.map((c, i) => (
          <div
            key={c.name}
            className="flex items-center gap-2 text-xs font-bold"
          >
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ background: c.color }}
            />
            <span className="text-fm-char/90">{c.name}</span>
            <span className="ml-auto tabular-nums text-fm-ink-soft">
              {fmtUSD(c.amount)}{" "}
              <span className="font-semibold text-fm-ink-soft/70">
                ({Math.round((c.amount / total) * 100)}%)
              </span>
            </span>
            <span className="sr-only">{`row ${i + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Small SVG line showing daily spend, drawn per selected month. */
function DailyTrendLine({ data, color }: { data: number[]; color: string }) {
  const w = 320;
  const h = 90;
  const max = Math.max(...data);
  const step = w / Math.max(1, data.length - 1);
  const pts = data
    .map((v, i) => `${(i * step).toFixed(1)},${(h - 8 - (v / max) * (h - 20)).toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-24 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Interactive month comparison with a stacked bar, trend line and summary. */
export function FinancialSnapshot() {
  const [monthId, setMonthId] = useState(SAMPLE_MONTHS[0].id);
  const month = SAMPLE_MONTHS.find((m) => m.id === monthId) ?? SAMPLE_MONTHS[0];
  const other = SAMPLE_MONTHS.find((m) => m.id !== monthId) ?? month;

  const totals = month.categories.reduce((s, c) => s + c.amount, 0);
  const net = month.income - month.expenses;
  const topCategory = [...month.categories].sort((a, b) => b.amount - a.amount)[0];
  const netDelta = net - (other.income - other.expenses);

  const summary = `${month.label} shows ${fmtUSD(totals)} of tracked spending. ${topCategory.name} is the largest slice at ${fmtUSD(
    topCategory.amount,
  )}. Income of ${fmtUSD(month.income)} against ${fmtUSD(month.expenses)} in expenses leaves ${fmtSignedUSD(net)} — ${
    netDelta >= 0 ? "up" : "down"
  } ${fmtUSD(Math.abs(netDelta))} versus ${other.label}.`;

  return (
    <Section
      id="snapshot"
      className="band-mint"
      eyebrow="Have a try"
      title="Interactive financial snapshot."
      description="Switch between two illustrative months and watch the breakdown move. All figures are sample data — no real accounts."
    >
      <div className="rounded-3xl border border-fm-line bg-white p-6 shadow-xl shadow-emerald-900/5 md:p-8">
        {/* Month selector */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm font-bold text-fm-char">
            <CalendarDays className="size-4 text-fm-green" />
            Compare months (sample)
          </p>
          <div
            role="group"
            aria-label="Choose a month to display"
            className="flex rounded-full bg-fm-mint p-1"
          >
            {SAMPLE_MONTHS.map((m) => {
              const active = m.id === monthId;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMonthId(m.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-fm-green text-white shadow"
                      : "text-fm-char/70 hover:text-fm-char"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-fm-line p-4">
            <p className="text-[0.68rem] font-bold uppercase tracking-wider text-fm-ink-soft">
              Income
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-fm-char">
              <ArrowDownRight className="size-4 text-fm-green" />
              {fmtUSD(month.income)}
            </p>
          </div>
          <div className="rounded-2xl border border-fm-line p-4">
            <p className="text-[0.68rem] font-bold uppercase tracking-wider text-fm-ink-soft">
              Expenses
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-fm-char">
              <ArrowUpRight className="size-4 text-fm-coral" />
              {fmtUSD(month.expenses)}
            </p>
          </div>
          <div className="rounded-2xl border border-fm-line p-4">
            <p className="text-[0.68rem] font-bold uppercase tracking-wider text-fm-ink-soft">
              Net
            </p>
            <p
              className={`mt-1 text-lg font-extrabold ${
                net >= 0 ? "text-fm-green" : "text-fm-coral"
              }`}
            >
              {fmtSignedUSD(net)}
            </p>
          </div>
        </div>

        {/* Breakdown, updates with the month */}
        <div className="mt-6">
          <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-wider text-fm-ink-soft">
            Where spending went — {month.label}
          </p>
          <StackedCategoryBar data={month.categories} total={totals} />
        </div>

        {/* Daily trend */}
        <div className="mt-6 rounded-2xl border border-fm-line p-4">
          <p className="mb-1 text-[0.68rem] font-bold uppercase tracking-wider text-fm-ink-soft">
            Daily spend trend
          </p>
          <DailyTrendLine data={month.series} color={month.categories[0].color} />
        </div>

        {/* Auto-updating summary */}
        <p
          className="mt-6 rounded-2xl bg-fm-mint/50 p-4 text-sm leading-relaxed text-fm-char"
          aria-live="polite"
        >
          {summary}
        </p>
      </div>
    </Section>
  );
}
