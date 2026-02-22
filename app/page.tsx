import { fetchExpensesForMonth } from "./lib/data";
import { SALARY_MONTHLY_AMOUNT } from "./lib/static";
import { slugify, amountToColor } from "./lib/utils";
import HomeCategoryGrid from "./ui/home-category-grid";

function formatPkr(n: number): string {
  return n.toLocaleString("en-PK", { maximumFractionDigits: 0 });
}

export default async function Home() {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "short" });
  const year = now.getFullYear();
  const monthLabel = `${month} ${year}`;

  const expenses = await fetchExpensesForMonth(month, year) as { category?: string; amount: number; source?: string }[];
  const byCategory = new Map<string, number>();

  let salarySpentThisMonth = 0;
  for (const e of expenses) {
    if ((e.source ?? "Salary") === "Salary") {
      salarySpentThisMonth += Number(e.amount);
    }
    const cat = e.category ?? "Uncategorized";
    byCategory.set(cat, (byCategory.get(cat) ?? 0) + Number(e.amount));
  }
  const salaryRemaining = Math.max(0, SALARY_MONTHLY_AMOUNT - salarySpentThisMonth);

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
        salaryRemaining={salaryRemaining}
        salaryFormatted={formatPkr(salaryRemaining)}
      />
    </main>
  );
}
