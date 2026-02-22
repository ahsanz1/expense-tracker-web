import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { fetchExpensesForMonth } from "@/app/lib/data";
import { slugify } from "@/app/lib/utils";

type ExpenseRow = {
  _id?: string;
  title?: string;
  amount: number;
  date?: string;
  isoDate?: string;
  category?: string;
};

export default async function MonthlyCategoryExpensesPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "short" });
  const year = now.getFullYear();
  const monthLabel = `${month} ${year}`;

  const expenses = (await fetchExpensesForMonth(month, year)) as ExpenseRow[];
  const categoryMap = new Map<string, string>();
  for (const e of expenses) {
    const cat = e.category ?? "Uncategorized";
    if (!categoryMap.has(slugify(cat))) {
      categoryMap.set(slugify(cat), cat);
    }
  }

  const categoryName = categoryMap.get(params.categorySlug);
  if (categoryName == null) {
    notFound();
  }

  const filtered = expenses
    .filter((e) => (e.category ?? "Uncategorized") === categoryName)
    .sort(
      (a, b) =>
        new Date(a.isoDate ?? a.date ?? 0).getTime() -
        new Date(b.isoDate ?? b.date ?? 0).getTime()
    );

  const total = filtered.reduce((acc, e) => acc + Number(e.amount), 0);

  function formatDate(isoOrDate: string | undefined) {
    if (!isoOrDate) return "—";
    const d = new Date(isoOrDate);
    return d.toLocaleDateString("en-PK", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to home
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-black mb-1">
        {categoryName}
      </h1>
      <p className="text-gray-600 mb-6">{monthLabel}</p>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No expenses in this category for this month.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
            {filtered.map((expense) => (
              <li
                key={String(expense._id)}
                className="flex flex-row justify-between items-center px-4 py-3"
              >
                <div>
                  <p className="font-medium text-black">{expense.title ?? "—"}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(expense.isoDate ?? expense.date)}
                  </p>
                </div>
                <p className="font-semibold text-black">
                  PKR {Number(expense.amount).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
            <p className="text-lg font-semibold text-black">
              Total: PKR {total.toLocaleString()}
            </p>
          </div>
        </>
      )}
    </main>
  );
}
