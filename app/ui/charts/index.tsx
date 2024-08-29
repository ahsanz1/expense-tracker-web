"use client";

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DataSet = {
  label: string;
  data: any;
  backgroundColor: string;
};

interface ChartProps {
  chartOptions: object;
  data: { labels: number[]; datasets: DataSet[] };
}

const MonthlyExpenseBarChart = ({ chartOptions, data }: ChartProps) => {
  return (
    <div className="w-full">
      {" "}
      <Bar options={chartOptions} data={data} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

const MonthlyExpenseLineChart = ({ chartOptions, data }: ChartProps) => {
  return (
    <div className="w-full">
      {" "}
      <Line options={chartOptions} data={data} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export { MonthlyExpenseBarChart, MonthlyExpenseLineChart };
