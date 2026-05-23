import { fetchExpensesForMonth } from "./lib/data";
import { EXPENSE_SOURCES, SALARY_MONTHLY_AMOUNT } from "./lib/static";
import { slugify, amountToColor, getMonthYearFromKey, getCurrentMonthKey, getMonthOptions } from "./lib/utils";
import HomeCategoryGrid from "./ui/home-category-grid";
import { HomeCategoryGridSkeleton } from "./ui/skeletons";
import { Suspense } from "react";

function formatPkr(n: number): string {
  return n.toLocaleString("en-PK", { maximumFractionDigits: 0 });
}

function getSourceFromParams(sourceParam: string | string[] | undefined): string {
  const raw = typeof sourceParam === "string" ? sourceParam : sourceParam?.[0];
  if (!raw) return "Salary";
  const decoded = decodeURIComponent(raw);
  return EXPENSE_SOURCES.includes(decoded as any) ? decoded : "Salary";
}

function getMonthKeyFromParams(monthParam: string | string[] | undefined): string {
  const raw = typeof monthParam === "string" ? monthParam : monthParam?.[0];
  if (!raw) return getCurrentMonthKey();
  const key = raw.trim();
  return getMonthYearFromKey(key) ? key : getCurrentMonthKey();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; month?: string }> | { source?: string; month?: string };
}) {
  const params = (await Promise.resolve(searchParams).catch(() => ({}))) as { source?: string; month?: string };
  const selectedSource = getSourceFromParams(params.source);
  const monthKey = getMonthKeyFromParams(params.month);
  const monthYear = getMonthYearFromKey(monthKey);
  const month = monthYear?.month ?? new Date().toLocaleString("default", { month: "short" });
  const year = monthYear?.year ?? new Date().getFullYear();
  const monthLabel = `${month} ${year}`;

  const allExpenses = (await fetchExpensesForMonth(month, year)) as {
    category?: string;
    amount: number;
    source?: string;
  }[];
  const expensesForSource = allExpenses.filter(
    (e) => (e.source ?? "Salary") === selectedSource
  );

  const byCategory = new Map<string, number>();
  for (const e of expensesForSource) {
    const cat = e.category ?? "Uncategorized";
    byCategory.set(cat, (byCategory.get(cat) ?? 0) + Number(e.amount));
  }

  let salaryRemaining = 0;
  if (selectedSource === "Salary") {
    const salarySpent = allExpenses
      .filter((e) => (e.source ?? "Salary") === "Salary")
      .reduce((acc, e) => acc + Number(e.amount), 0);
    salaryRemaining = SALARY_MONTHLY_AMOUNT - salarySpent;
  }

  const sorted = Array.from(byCategory.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  const minTotal = sorted.length ? Math.min(...sorted.map((s) => s.total)) : 0;
  const maxTotal = sorted.length ? Math.max(...sorted.map((s) => s.total)) : 0;
  const range = maxTotal - minTotal || 1;

  const items = sorted.map(({ category, total }) => ({
    category,
    total,
    slug: slugify(category),
    color: amountToColor(range === 0 ? 0 : (total - minTotal) / range),
  }));

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<HomeCategoryGridSkeleton showSalaryRemaining={selectedSource === "Salary"} />}>
        <HomeCategoryGrid
          items={items}
          monthLabel={monthLabel}
          monthKey={monthKey}
          monthOptions={getMonthOptions(24)}
          currentSource={selectedSource}
          sources={[...EXPENSE_SOURCES]}
          salaryRemaining={salaryRemaining}
          salaryFormatted={formatPkr(salaryRemaining)}
          showSalaryRemaining={selectedSource === "Salary"}
        />
      </Suspense>
    </main>
  );
}
