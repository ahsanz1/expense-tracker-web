import { fetchCategories } from "@/app/lib/data";
import CreateExpenseForm from "@/app/ui/create-expense-form";
import React from "react";

async function Page({ params }: { params: { date: string } }) {
  const expensesDate = params.date;
  const categories: any = await fetchCategories();
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CreateExpenseForm
        expensesDate={expensesDate}
        expenseCategories={categories}
      />
    </main>
  );
}

export default Page;
