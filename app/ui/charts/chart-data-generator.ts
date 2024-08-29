import { sortByDate } from "@/app/lib/utils";

interface ChartDataGenerator {
  month: string;
  year: string;
  today: Date;
  thisDay: number;
  monthExpenses: [];
}

export const getChartData = ({
  month,
  year,
  today,
  thisDay,
  monthExpenses,
}: ChartDataGenerator) => {
  const chartOptions = {
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

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expense By Day",
        data: labels.map((l, idx) => totalExpenseOnEachDay[idx]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return { chartOptions, chartData };
};
