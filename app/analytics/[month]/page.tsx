import { fetchExpensesForMonth } from "@/app/lib/data";
import React from "react";
import { sortByDate } from "@/app/lib/utils";
import { MonthlyExpenseBarChart } from "@/app/ui/charts";

async function Page({ params }: { params: { month: string } }) {
  const [month, year] = params.month.split("-");
  const today = new Date();
  const thisDay = today.getDate();
  const monthExpenses = (await fetchExpensesForMonth(month)) || [];

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Expenses For ${month.toUpperCase()} ${year.toUpperCase()}`,
      },
    },
  };

  const labels = [];
  for (let i = 1; i <= thisDay; i++) labels.push(i);

  sortByDate(monthExpenses);

  const totalExpenseOnEachDay: any = [];

  for (let i = 1; i <= thisDay; i++) {
    const thisDayExpenses = monthExpenses.filter(
      (me: any) => new Date(me.date).getDate() === i
    );
    const thisDayTotal = thisDayExpenses.reduce(
      (acc: Number, curr: any) => acc + curr.amount,
      0
    );
    totalExpenseOnEachDay.push(thisDayTotal);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Expense By Day",
        data: labels.map((l, idx) => totalExpenseOnEachDay[idx]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <MonthlyExpenseBarChart barChartOptions={barChartOptions} data={data} />
    </div>
  );
}

export default Page;
