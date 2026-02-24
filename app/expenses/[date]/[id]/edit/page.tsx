import { fetchCategories, fetchExpenseById } from "@/app/lib/data";
import EditExpenseForm from "@/app/ui/edit-expense-form";
import { notFound } from "next/navigation";
import React from "react";

async function Page({
  params,
  searchParams,
}: {
  params: { date: string; id: string };
  searchParams: Promise<{ returnTo?: string }> | { returnTo?: string };
}) {
  const expensesDate = params.date;
  const expenseId = params.id;
  const resolvedSearchParams = (await Promise.resolve(searchParams).catch(() => ({}))) as { returnTo?: string };
  const returnTo =
    typeof resolvedSearchParams.returnTo === "string"
      ? resolvedSearchParams.returnTo
      : undefined;

  const [expense, categories] = await Promise.all([
    fetchExpenseById(expenseId),
    fetchCategories(),
  ]);

  if (!expense || (expense as any).message) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EditExpenseForm
        expense={expense as any}
        expensesDate={expensesDate}
        expenseCategories={categories}
        returnTo={returnTo}
      />
    </main>
  );
}

export default Page;

