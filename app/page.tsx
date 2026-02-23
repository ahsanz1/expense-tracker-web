import { fetchExpensesForMonth } from "./lib/data";
import { EXPENSE_SOURCES, SALARY_MONTHLY_AMOUNT } from "./lib/static";
import { slugify, amountToColor } from "./lib/utils";
import HomeCategoryGrid from "./ui/home-category-grid";

function formatPkr(n: number): string {
  return n.toLocaleString("en-PK", { maximumFractionDigits: 0 });
}

function getSourceFromParams(sourceParam: string | string[] | undefined): string {
  const raw = typeof sourceParam === "string" ? sourceParam : sourceParam?.[0];
  if (!raw) return "Salary";
  const decoded = decodeURIComponent(raw);
  return EXPENSE_SOURCES.includes(decoded as any) ? decoded : "Salary";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }> | { source?: string };
}) {
  const params = (await Promise.resolve(searchParams).catch(() => ({}))) as { source?: string };
  const selectedSource = getSourceFromParams(params.source);

  const now = new Date();
  const month = now.toLocaleString("default", { month: "short" });
  const year = now.getFullYear();
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
    salaryRemaining = Math.max(0, SALARY_MONTHLY_AMOUNT - salarySpent);
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
      <HomeCategoryGrid
        items={items}
        monthLabel={monthLabel}
        currentSource={selectedSource}
        sources={[...EXPENSE_SOURCES]}
        salaryRemaining={salaryRemaining}
        salaryFormatted={formatPkr(salaryRemaining)}
        showSalaryRemaining={selectedSource === "Salary"}
      />
    </main>
  );
}
