import { fetchExpensesForMonth, fetchMonthlySalaryAmount } from "./lib/data";
import { EXPENSE_SOURCES } from "./lib/static";
import { slugify, amountToColor, getMonthYearFromKey, getCurrentMonthKey, getMonthOptions, buildHomeHref } from "./lib/utils";
import HomeCategoryGrid from "./ui/home-category-grid";
import SalarySummary from "./ui/salary-summary";

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
  searchParams: Promise<{ source?: string; month?: string; editSalary?: string }> | { source?: string; month?: string; editSalary?: string };
}) {
  const params = (await Promise.resolve(searchParams).catch(() => ({}))) as {
    source?: string;
    month?: string;
    editSalary?: string;
  };
  const selectedSource = getSourceFromParams(params.source);
  const monthKey = getMonthKeyFromParams(params.month);
  const isEditingSalary = params.editSalary === "1";
  const monthYear = getMonthYearFromKey(monthKey);
  const month = monthYear?.month ?? new Date().toLocaleString("default", { month: "short" });
  const year = monthYear?.year ?? new Date().getFullYear();
  const monthLabel = `${month} ${year}`;

  const [expenses, totalSalary] = await Promise.all([
    fetchExpensesForMonth(month, year) as Promise<
      { category?: string; amount: number; source?: string }[]
    >,
    selectedSource === "Salary"
      ? fetchMonthlySalaryAmount(monthKey)
      : Promise.resolve(0),
  ]);
  const expensesForSource = expenses.filter(
    (e) => (e.source ?? "Salary") === selectedSource
  );

  const byCategory = new Map<string, number>();
  for (const e of expensesForSource) {
    const cat = e.category ?? "Uncategorized";
    byCategory.set(cat, (byCategory.get(cat) ?? 0) + Number(e.amount));
  }

  const totalSpent = expensesForSource.reduce(
    (acc, e) => acc + Number(e.amount),
    0
  );
  const salaryRemaining =
    selectedSource === "Salary" ? totalSalary - totalSpent : 0;

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
      <HomeCategoryGrid
        items={items}
        monthLabel={monthLabel}
        monthKey={monthKey}
        monthOptions={getMonthOptions(24)}
        currentSource={selectedSource}
        sources={[...EXPENSE_SOURCES]}
        salarySection={
          <SalarySummary
            monthKey={monthKey}
            totalSalary={totalSalary}
            totalSalaryFormatted={formatPkr(totalSalary)}
            totalSpentFormatted={formatPkr(totalSpent)}
            salaryRemainingFormatted={formatPkr(salaryRemaining)}
            currentSource={selectedSource}
            isEditing={isEditingSalary && selectedSource === "Salary"}
            editHref={buildHomeHref({
              month: monthKey,
              source: selectedSource,
              editSalary: true,
            })}
            cancelHref={buildHomeHref({
              month: monthKey,
              source: selectedSource,
            })}
            showSalaryCards={selectedSource === "Salary"}
          />
        }
      />
    </main>
  );
}
