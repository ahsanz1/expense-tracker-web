"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Expense } from "@/app/lib/types";

interface AnalyticsChartsProps {
  expenses: Expense[];
  startDate: string;
  endDate: string;
}

const AnalyticsCharts = ({ expenses, startDate, endDate }: AnalyticsChartsProps) => {
  const [expensesOverTimeData, setExpensesOverTimeData] = useState<any>(null);
  const [expensesByCategoryData, setExpensesByCategoryData] = useState<any>(null);

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      setExpensesOverTimeData(null);
      setExpensesByCategoryData(null);
      return;
    }

    // Process expenses over time
    const dateMap: { [key: string]: number } = {};
    expenses.forEach((expense: any) => {
      if (expense.isoDate) {
        const date = new Date(expense.isoDate).toLocaleDateString();
        dateMap[date] = (dateMap[date] || 0) + Number(expense.amount);
      }
    });

    const sortedDates = Object.keys(dateMap).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const expensesOverTime = {
      labels: sortedDates,
      datasets: [
        {
          label: "Daily Expenses",
          data: sortedDates.map((date) => dateMap[date]),
          borderColor: "#000000",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    };

    // Process expenses by category
    const categoryMap: { [key: string]: number } = {};
    expenses.forEach((expense: any) => {
      if (expense.category) {
        categoryMap[expense.category] =
          (categoryMap[expense.category] || 0) + Number(expense.amount);
      }
    });

    const sortedCategories = Object.keys(categoryMap).sort(
      (a, b) => categoryMap[b] - categoryMap[a]
    );

    const expensesByCategory = {
      labels: sortedCategories,
      datasets: [
        {
          label: "Expenses by Category",
          data: sortedCategories.map((cat) => categoryMap[cat]),
          borderColor: "#000000",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 2,
          tension: 0.1,
        },
      ],
    };

    setExpensesOverTimeData(expensesOverTime);
    setExpensesByCategoryData(expensesByCategory);
  }, [expenses]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#000000",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#000000",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  if (!expensesOverTimeData || !expensesByCategoryData) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p>No expenses found for the selected date range.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-black mb-4">
          Expenses Over Time
        </h2>
        <div className="h-[400px]">
          <Line data={expensesOverTimeData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-black mb-4">
          Expenses by Category
        </h2>
        <div className="h-[400px]">
          <Line data={expensesByCategoryData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;

