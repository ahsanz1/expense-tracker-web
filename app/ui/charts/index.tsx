"use client";

import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyExpenseBarChart = ({
  barChartOptions,
  data,
}: {
  barChartOptions: any;
  data: any;
}) => {
  return (
    <div>
      {" "}
      <Bar options={barChartOptions} data={data} />
    </div>
  );
};

export { MonthlyExpenseBarChart };
