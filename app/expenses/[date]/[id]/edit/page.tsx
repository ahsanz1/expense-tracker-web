import { fetchCategories, fetchExpenseById } from "@/app/lib/data";
import EditExpenseForm from "@/app/ui/edit-expense-form";
import { notFound } from "next/navigation";
import React from "react";

async function Page({ params }: { params: { date: string; id: string } }) {
  const expensesDate = params.date;
  const expenseId = params.id;
  
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
      />
    </main>
  );
}

export default Page;

