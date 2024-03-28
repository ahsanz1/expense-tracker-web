import { fetchCategories } from "@/app/lib/data";
import CreateExpenseForm from "@/app/ui/create-expense-form";
import React from "react";

async function Page({ params }: { params: { date: string } }) {
  const expensesDate = params.date;
  const categories: any = await fetchCategories();
  return (
    <main>
      <CreateExpenseForm
        expensesDate={expensesDate}
        expenseCategories={categories}
      />
    </main>
  );
}

export default Page;
