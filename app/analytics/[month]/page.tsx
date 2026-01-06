import { fetchExpensesForMonth } from "@/app/lib/data";
import React from "react";
import {
  MonthlyExpenseBarChart,
  MonthlyExpenseLineChart,
} from "@/app/ui/charts";
import { getChartData } from "@/app/ui/charts/chart-data-generator";
import DateRangeExpenses from "@/app/ui/date-range-expenses";

async function Page({ params }: { params: { month: string } }) {
  const [month, year] = params.month.split("-");
  const today = new Date();
  const thisDay = today.getDate();
  const monthExpenses = (await fetchExpensesForMonth(month)) || [];

  const { chartOptions, chartData } = getChartData({
    month,
    year,
    today,
    thisDay,
    monthExpenses,
  });

  const lineChartDataSets = chartData.datasets.map((ds) => {
    return { ...ds, backgroundColor: "#000000", borderColor: "#000000" };
  });

  const lineChartData = { ...chartData, datasets: lineChartDataSets };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black mb-2">Analytics</h1>
        <p className="text-gray-600">Monthly expense analysis and trends</p>
      </div>
      <div className="flex flex-col gap-y-8">
        <DateRangeExpenses />
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Monthly Overview</h2>
          <MonthlyExpenseBarChart chartOptions={chartOptions} data={chartData} />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Expense Trends</h2>
          <MonthlyExpenseLineChart
            chartOptions={chartOptions}
            data={lineChartData}
          />
        </div>
      </div>
    </main>
  );
}

export default Page;
