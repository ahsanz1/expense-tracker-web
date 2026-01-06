import {
  fetchCategories,
  fetchExpenses,
  fetchExpensesForMonth,
} from "@/app/lib/data";
import ExpensesList from "@/app/ui/expenses-list";
import ExpensesTable from "@/app/ui/expenses-table";
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile View */}
      <div className="md:hidden">
        <ExpensesList
          className="w-full"
          expensesDate={date}
          expenses={expenses}
          monthTotal={monthTotal}
        />
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <ExpensesTable
          className="w-full"
          expensesDate={date}
          expenses={expenses}
          monthTotal={monthTotal}
        />
      </div>
    </main>
  );
}

export default Page;
