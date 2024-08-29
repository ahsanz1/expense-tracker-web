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
    return { ...ds, backgroundColor: "#4a235a" };
  });

  const lineChartData = { ...chartData, datasets: lineChartDataSets };

  return (
    <div className="flex flex-col gap-y-6">
      <DateRangeExpenses />
      <MonthlyExpenseBarChart chartOptions={chartOptions} data={chartData} />
      <MonthlyExpenseLineChart
        chartOptions={chartOptions}
        data={lineChartData}
      />
    </div>
  );
}

export default Page;
