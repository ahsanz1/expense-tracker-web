"use client";

import React, { useState, useEffect } from "react";

interface AnalyticsDateRangeProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  onSearch: (startDate: string, endDate: string) => void;
  loading: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
}

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthDate = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    monthDate < 10 ? `0${monthDate}` : monthDate
  }`;
};

const AnalyticsDateRange = ({ onDateRangeChange, onSearch, loading, initialStartDate, initialEndDate }: AnalyticsDateRangeProps) => {
  // Default to start of current month to today
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate || getFormattedDate(startOfMonth),
    endDate: initialEndDate || getFormattedDate(today),
  });

  // Sync with parent when initial dates change
  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      setDateRange({
        startDate: initialStartDate,
        endDate: initialEndDate,
      });
    }
  }, [initialStartDate, initialEndDate]);

  const handleSearch = () => {
    if (dateRange.startDate && dateRange.endDate) {
      // Update parent state and trigger search with dates
      onDateRangeChange(dateRange.startDate, dateRange.endDate);
      onSearch(dateRange.startDate, dateRange.endDate);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    const endDate = new Date(dateRange.endDate);
    const startDate = new Date(newStartDate);
    
    if (startDate > endDate) {
      // If start date is after end date, update end date to start date
      setDateRange({
        startDate: newStartDate,
        endDate: newStartDate,
      });
    } else {
      setDateRange({
        ...dateRange,
        startDate: newStartDate,
      });
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(newEndDate);
    
    if (endDate < startDate) {
      // If end date is before start date, update start date to end date
      setDateRange({
        startDate: newEndDate,
        endDate: newEndDate,
      });
    } else {
      setDateRange({
        ...dateRange,
        endDate: newEndDate,
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-black mb-4">Select Date Range</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={dateRange.startDate}
            onChange={handleStartDateChange}
            max={getFormattedDate(new Date())}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={dateRange.endDate}
            onChange={handleEndDateChange}
            min={dateRange.startDate}
            max={getFormattedDate(new Date())}
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleSearch}
            disabled={!dateRange.startDate || !dateRange.endDate || loading}
            className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <div className="animate-spin rounded-full my-0 mx-auto h-[20px] w-[20px] border-2 border-white border-t-transparent"></div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDateRange;

