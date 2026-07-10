import { Expense } from "./types";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Month key "YYYY-MM" to { month: "Jan", year: number } */
export function getMonthYearFromKey(key: string): { month: string; year: number } | null {
  const match = /^(\d{4})-(\d{1,2})$/.exec(key.trim());
  if (!match) return null;
  const year = parseInt(match[1], 10);
  const monthNum = parseInt(match[2], 10);
  if (monthNum < 1 || monthNum > 12) return null;
  return { month: MONTH_NAMES[monthNum - 1], year };
}

/** Current month key "YYYY-MM" */
export function getCurrentMonthKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return `${y}-${String(m).padStart(2, "0")}`;
}

/** Last N months as keys for dropdown (current first) */
export function getMonthOptions(count: number): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  const d = new Date();
  for (let i = 0; i < count; i++) {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const key = `${y}-${String(m).padStart(2, "0")}`;
    out.push({ key, label: `${MONTH_NAMES[m - 1]} ${y}` });
    d.setMonth(d.getMonth() - 1);
  }
  return out;
}

/** Build home page query string for month/source/editSalary filters */
export function buildHomeHref(options: {
  month?: string;
  source?: string;
  editSalary?: boolean;
}): string {
  const params = new URLSearchParams();
  if (options.month) params.set("month", options.month);
  if (options.source && options.source !== "Salary") params.set("source", options.source);
  if (options.editSalary) params.set("editSalary", "1");
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

/** Converts a string to a URL-safe slug (e.g. "Food & Drinks" → "food-drinks"). */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Light gradient: green → yellow → orange → red. [ratio 0–1, r, g, b] */
const AMOUNT_COLOR_STOPS: [number, number, number, number][] = [
  [0, 209, 250, 229],   // light green (low)
  [0.2, 220, 252, 210], // green–yellow
  [0.4, 254, 243, 199], // light yellow
  [0.6, 254, 223, 178], // light orange
  [0.8, 254, 205, 185], // orange–red
  [1, 254, 202, 202],   // light red (high)
];

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

/**
 * Returns a light background color for amount-based coding.
 * ratio 0 (low) = light green → yellow → orange → light red = ratio 1 (high).
 * Uses a smooth curve so changes between categories feel gradual.
 */
export function amountToColor(ratio: number): string {
  if (Number.isNaN(ratio) || ratio <= 0) {
    const [, r, g, b] = AMOUNT_COLOR_STOPS[0];
    return `rgb(${r}, ${g}, ${b})`;
  }
  if (ratio >= 1) {
    const [, r, g, b] = AMOUNT_COLOR_STOPS[AMOUNT_COLOR_STOPS.length - 1];
    return `rgb(${r}, ${g}, ${b})`;
  }
  // Smoother distribution: ease so middle amounts don’t jump as sharply
  const eased = Math.pow(ratio, 0.85);
  for (let i = 0; i < AMOUNT_COLOR_STOPS.length - 1; i++) {
    const [t0, r0, g0, b0] = AMOUNT_COLOR_STOPS[i];
    const [t1, r1, g1, b1] = AMOUNT_COLOR_STOPS[i + 1];
    if (eased >= t0 && eased <= t1) {
      const t = (eased - t0) / (t1 - t0);
      return `rgb(${lerp(r0, r1, t)}, ${lerp(g0, g1, t)}, ${lerp(b0, b1, t)})`;
    }
  }
  const [, r, g, b] = AMOUNT_COLOR_STOPS[0];
  return `rgb(${r}, ${g}, ${b})`;
}

export function sortByDate(arr: Expense[]) {
  return arr.sort((a: any, b: any) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export function sortByKeyName(arr: any, key: string) {
  return arr.slice().sort((a: any, b: any) => {
    return a[key].localeCompare(b[key]);
  });
}
