"use client";

import AnalyticsCharts from "@/app/ui/analytics-charts";
import AnalyticsDateRange from "@/app/ui/analytics-date-range";
import { Expense } from "@/app/lib/types";
import React, { useState, useCallback, useEffect } from "react";

function AnalyticsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [shouldLoad, setShouldLoad] = useState(false);

  // Get default date range (start of month to today)
  const getDefaultDateRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const year = startOfMonth.getFullYear();
    const month = String(startOfMonth.getMonth() + 1).padStart(2, '0');
    const day = String(startOfMonth.getDate()).padStart(2, '0');
    const startDate = `${year}-${month}-${day}`;
    
    const endYear = today.getFullYear();
    const endMonth = String(today.getMonth() + 1).padStart(2, '0');
    const endDay = String(today.getDate()).padStart(2, '0');
    const endDate = `${endYear}-${endMonth}-${endDay}`;
    
    return { startDate, endDate };
  };

  const fetchExpenses = useCallback(async (startDate: string, endDate: string) => {
    setLoading(true);

    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load expenses on initial mount with default date range
  useEffect(() => {
    const defaultRange = getDefaultDateRange();
    setDateRange(defaultRange);
    fetchExpenses(defaultRange.startDate, defaultRange.endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateRangeChange = useCallback(
    (startDate: string, endDate: string) => {
      setDateRange({ startDate, endDate });
    },
    []
  );

  const handleSearch = useCallback((startDate: string, endDate: string) => {
    // Fetch expenses with the provided dates
    fetchExpenses(startDate, endDate);
  }, [fetchExpenses]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black mb-2">Analytics</h1>
        <p className="text-gray-600">
          Analyze your expenses over time and by category
        </p>
      </div>

      <div className="flex flex-col gap-y-8">
        <AnalyticsDateRange 
          onDateRangeChange={handleDateRangeChange}
          onSearch={handleSearch}
          loading={loading}
          initialStartDate={dateRange.startDate}
          initialEndDate={dateRange.endDate}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading expenses...</p>
          </div>
        ) : (
          <AnalyticsCharts
            expenses={expenses}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
          />
        )}
      </div>
    </main>
  );
}

export default AnalyticsPage;

