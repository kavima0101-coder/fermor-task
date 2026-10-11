import { Wallet, ArrowDownToLine, PiggyBank, ReceiptText } from "lucide-react";
import { Section } from "./Section";
import { CURRENT_MONTH, fmtUSD } from "@/data/finance";

/** Grouped income vs. expense bars per week for the selected sample month. */
function IncomeExpenseChart({
  weeklyIncome,
  weeklyExpenses,
}: {
  weeklyIncome: number[];
  weeklyExpenses: number[];
}) {
  const max = Math.max(...weeklyIncome, ...weeklyExpenses);
  const bars = Array.from({ length: weeklyIncome.length }, (_, i) => ({
    income: (weeklyIncome[i] / max) * 120,
    expense: (weeklyExpenses[i] / max) * 120,
  }));

  return (
    <div
      role="img"
      aria-label={`Bar chart of weekly income versus expenses for ${CURRENT_MONTH.label} (sample data)`}
    >
      <div className="flex items-end gap-4">
        {bars.map((b, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-end justify-center gap-1.5">
              <div
                className="w-1/2 max-w-[22px] rounded-t-md bg-fm-green transition-all duration-500"
                style={{ height: `${Math.max(6, b.income)}px` }}
              />
              <div
                className="w-1/2 max-w-[22px] rounded-t-md bg-fm-amber transition-all duration-500"
                style={{ height: `${Math.max(6, b.expense)}px` }}
              />
            </div>
            <span className="text-[0.65rem] font-bold text-fm-ink-soft">
              W{i + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-5 text-xs font-semibold text-fm-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-fm-green" /> Income
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-fm-amber" /> Expenses
        </span>
      </div>
    </div>
  );
}

const CHECK_ITEMS = [
  "Spending overview with category context",
  "Income versus expenses at a glance",
  "Savings progress that stays visible",
  "A monthly activity summary you can read, not scroll",
];

/** "A clearer picture. A better next step." — full product showcase. */
export function ProductPreview() {
  const m = CURRENT_MONTH;

  // Derive plausible weekly buckets from the fictional daily series.
  const weeklyIncome = [1150, 1080, 1230, 1210];
  const weeklyExpenses = [
    m.series.slice(0, 7).reduce((s, v) => s + v, 0),
    m.series.slice(7, 14).reduce((s, v) => s + v, 0),
    m.series.slice(14, 21).reduce((s, v) => s + v, 0),
    m.series.slice(21).reduce((s, v) => s + v, 0),
  ];

  return (
    <Section
      id="preview"
      eyebrow="Product showcase"
      title={
        <>
          A clearer picture.{" "}
          <span className="text-fm-green">A better next step.</span>
        </>
      }
      description="This is a conceptual preview of the kind of view Fermor is building toward — every number is fictional."
    >
      <div className="overflow-hidden rounded-3xl border border-fm-line bg-white shadow-xl shadow-emerald-900/5 lg:grid lg:grid-cols-[1.65fr_1fr]">
        {/* Left: dashboard mock */}
        <div className="border-b border-fm-line p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-fm-mint">
                <Wallet className="size-5 text-fm-green" />
              </span>
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                  September 2026
                </p>
                <p className="text-sm font-bold text-fm-char">
                  Monthly overview · sample
                </p>
              </div>
            </div>
            <span className="rounded-full bg-fm-amber-soft px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-fm-char">
              Illustrative data
            </span>
          </div>

          {/* Two-up pills: income / expenses */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-fm-line p-4">
              <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                <ArrowDownToLine className="size-3.5 text-fm-green" /> Income
              </p>
              <p className="mt-1.5 text-xl font-extrabold text-fm-char">
                {fmtUSD(m.income)}
              </p>
            </div>
            <div className="rounded-2xl border border-fm-line p-4">
              <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                <ArrowDownToLine className="size-3.5 rotate-180 text-fm-coral" />{" "}
                Expenses
              </p>
              <p className="mt-1.5 text-xl font-extrabold text-fm-char">
                {fmtUSD(m.expenses)}
              </p>
            </div>
          </div>

          {/* Chart card */}
          <div className="mt-3.5 rounded-2xl border border-fm-line p-5">
            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
              Income vs. expenses, by week
            </p>
            <IncomeExpenseChart
              weeklyIncome={weeklyIncome}
              weeklyExpenses={weeklyExpenses}
            />
          </div>

          {/* Bottom row: savings + activity */}
          <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
            <div className="rounded-2xl border border-fm-line p-4">
              <p className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                Savings progress
                <PiggyBank className="size-4 text-fm-sky" />
              </p>
              <div
                role="progressbar"
                aria-valuenow={57}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Emergency fund goal: 57% reached (sample)"
                className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-fm-mint"
              >
                <div
                  className="h-full rounded-full bg-fm-sky transition-all duration-500"
                  style={{ width: "57%" }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-fm-ink-soft">
                {fmtUSD(3420)} of {fmtUSD(6000)} goal · 57%
              </p>
            </div>
            <div className="rounded-2xl border border-fm-line p-4">
              <p className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-wider text-fm-ink-soft">
                Monthly activity
                <ReceiptText className="size-4 text-fm-plum" />
              </p>
              <ul className="mt-3 space-y-1.5 text-xs font-semibold text-fm-char">
                <li className="flex justify-between">
                  <span className="text-fm-ink-soft">Transactions</span>
                  <span>48</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-fm-ink-soft">Largest expense</span>
                  <span>$1,280 rent</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-fm-ink-soft">Net change</span>
                  <span className="text-fm-green">+$1,690</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: explanation */}
        <div className="flex flex-col justify-center gap-5 bg-fm-mint/40 p-7 md:p-9">
          <h3 className="text-xl font-bold text-fm-char">
            One view, actually readable
          </h3>
          <ul className="space-y-3">
            {CHECK_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-fm-char/90">
                <span className="mt-0.5 flex size-4.5 h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-fm-green text-[0.6rem] font-extrabold text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-fm-ink-soft">
            Interface concepts and numbers shown here are illustrative. They
            demonstrate how financial information could be organized, not what
            any real account did.
          </p>
        </div>
      </div>
    </Section>
  );
}
