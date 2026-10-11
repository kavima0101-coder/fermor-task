// ─── Fermor homepage sample data ─────────────────────────────────────────────
// All figures are FICTIONAL and exist purely to demonstrate the interface.
// They do not represent real customers or real financial information.

export type Category = {
  name: string;
  amount: number; // dollars spent in the month
  color: string; // hex used by CSS-drawn charts
};

export type Transactions = { label: string; date: string; amount: number }[];

export type MonthData = {
  id: string;
  label: string; // e.g. "Sep 2026"
  income: number;
  expenses: number;
  categories: Category[];
  series: number[]; // daily spend trend, index = day
  transactions: Transactions;
};

export const SAMPLE_MONTHS: MonthData[] = [
  {
    id: "aug",
    label: "Aug 2026",
    income: 4260,
    expenses: 3320,
    categories: [
      { name: "Rent & Utilities", amount: 1420, color: "#176B4D" },
      { name: "Groceries", amount: 520, color: "#F2A93B" },
      { name: "Transport", amount: 190, color: "#2F9EC4" },
      { name: "Dining Out", amount: 340, color: "#E2694F" },
      { name: "Subscriptions", amount: 95, color: "#7C5CBF" },
      { name: "Other", amount: 755, color: "#9DB8AA" },
    ],
    series: [
      140, 90, 210, 60, 55, 180, 120, 75, 95, 150, 65, 240, 110, 320, 90, 70,
      130, 105, 165, 200, 85, 60, 145, 75, 230, 120, 95, 160, 80, 145, 110,
    ],
    transactions: [
      { label: "Salary deposit", date: "Aug 28", amount: 3120 },
      { label: "Rent — Magnolia Apts", date: "Aug 1", amount: -1280 },
      { label: "Fresh Market Co.", date: "Aug 14", amount: -86.4 },
      { label: "Electric bill", date: "Aug 9", amount: -94.2 },
      { label: "Freelance payment", date: "Aug 21", amount: 1140 },
      { label: "City transit pass", date: "Aug 3", amount: -70 },
    ],
  },
  {
    id: "sep",
    label: "Sep 2026",
    income: 4670,
    expenses: 2980,
    categories: [
      { name: "Rent & Utilities", amount: 1420, color: "#176B4D" },
      { name: "Groceries", amount: 610, color: "#F2A93B" },
      { name: "Transport", amount: 205, color: "#2F9EC4" },
      { name: "Dining Out", amount: 240, color: "#E2694F" },
      { name: "Subscriptions", amount: 95, color: "#7C5CBF" },
      { name: "Other", amount: 410, color: "#9DB8AA" },
    ],
    series: [
      110, 145, 70, 95, 130, 60, 210, 85, 55, 120, 170, 75, 95, 240, 130, 65,
      185, 90, 110, 75, 150, 55, 125, 200, 90, 140, 75, 165, 60, 115, 95,
    ],
    transactions: [
      { label: "Salary deposit", date: "Sep 29", amount: 3120 },
      { label: "Rent — Magnolia Apts", date: "Sep 1", amount: -1280 },
      { label: "Riverside Dental", date: "Sep 18", amount: -140 },
      { label: "Fresh Market Co.", date: "Sep 12", amount: -104.9 },
      { label: "Concert tickets", date: "Sep 23", amount: -85 },
      { label: "Freelance payment", date: "Sep 20", amount: 1550 },
    ],
  },
];

// Hero dashboard uses Sept as its "current" month by default.
export const CURRENT_MONTH = SAMPLE_MONTHS[1];

/* ── Formatters ────────────────────────────────────────────────────────────── */

export const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

/** Signed variant (+ kept, - shown), rounded to whole dollars. */
export const fmtSignedUSD = (n: number) =>
  `${n < 0 ? "-" : "+"}${fmtUSD(Math.abs(n))}`;

/** Two-decimal variant for transaction lines. */
export const fmtCentUSD = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
