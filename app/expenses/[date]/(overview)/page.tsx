import {
  createCategories,
  fetchCategories,
  fetchExpenses,
} from "@/app/lib/data";
import ExpensesList from "@/app/ui/expenses-list";
import React from "react";

async function Page({ params }: { params: { date: string } }) {
  const date = params.date;
  const expenses: any = await fetchExpenses(date);
  return (
    <main>
      <div className="flex flex-col items-center gap-y-4 mt-8 w-full">
        <ExpensesList
          className="w-full md:hidden"
          expensesDate={date}
          expenses={JSON.parse(JSON.stringify(expenses))}
        />
      </div>
    </main>
  );
}

export default Page;
