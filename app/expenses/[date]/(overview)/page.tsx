import {
  fetchCategories,
  fetchExpenses,
  fetchExpensesForMonth,
} from "@/app/lib/data";
import ExpensesList from "@/app/ui/expenses-list";
import React from "react";

async function Page({ params }: { params: { date: string } }) {
  const date = params.date;
  const month = new Date(date).toLocaleString("default", { month: "short" });
  const expensesPromise = await Promise.all([
    fetchExpenses(date),
    fetchExpensesForMonth(month),
  ]);
  const [expenses, expensesForMonth] = expensesPromise;
  const monthTotal = expensesForMonth.reduce(
    (acc: Number, curr: any) => acc + curr.amount,
    0
  );
  return (
    <main>
      <div className="flex flex-col items-center gap-y-4 mt-8 w-full">
        <ExpensesList
          className="w-full md:hidden"
          expensesDate={date}
          expenses={JSON.parse(JSON.stringify(expenses))}
          monthTotal={monthTotal}
        />
      </div>
    </main>
  );
}

export default Page;
