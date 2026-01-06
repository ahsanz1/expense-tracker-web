"use client";

import { Expense } from "@/app/lib/types";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { toast } from "react-toastify";

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthDate = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    monthDate < 10 ? `0${monthDate}` : monthDate
  }`;
};

const DateRangeExpenses = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [dateRangeExpenses, setDateRangeExpenses] = useState([]);

  const handleSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dateRange }),
    })
      .then(async (response) => {
        const data = await response.json();
        setDateRangeExpenses(data);
      })
      .catch((error) => {
        toast.error((error as Error).message);
      })
      .finally(() => setLoading(false));
  };

  let totalExpenseBetweenDateRange = 0;

  if (dateRangeExpenses.length > 0) {
    totalExpenseBetweenDateRange = dateRangeExpenses.reduce(
      (acc, curr: any) => acc + curr.amount,
      0
    );
  }

  return (
    <div className="flex flex-col gap-y-4 border border-gray-200 rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold text-black mb-4">Date Range Expenses</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              const newStartDate = new Date(value);
              const endDate = new Date(dateRange.endDate);
              if (newStartDate > endDate) {
                toast.error("Start date should preceed the end date!");
                return;
              }
              setDateRange({
                ...dateRange,
                startDate: getFormattedDate(newStartDate),
              });
              setDateRangeExpenses([]);
            }}
            value={dateRange.startDate}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={dateRange.endDate}
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              const newEndDate = new Date(value);
              const startDate = new Date(dateRange.startDate);
              if (newEndDate < startDate) {
                toast.error("End date must follow the start date!");
                return;
              }
              setDateRange({
                ...dateRange,
                endDate: getFormattedDate(newEndDate),
              });
              setDateRangeExpenses([]);
            }}
            max={getFormattedDate(new Date())}
            disabled={dateRange.startDate === ""}
          />
        </div>
        <div className="flex items-end">
          <button
            className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            onClick={handleSearch}
            disabled={dateRange.startDate === "" || dateRange.endDate === "" || loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full my-0 mx-auto h-[20px] w-[20px] border-2 border-white border-t-transparent"></div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
      
      {dateRangeExpenses.length > 0 && (
        <>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {dateRangeExpenses.map((expense: Expense) => (
                  <Disclosure key={String(expense._id)}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg border-0 px-4 py-3 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition-colors">
                          <div className="flex flex-row justify-between w-full text-left text-sm font-medium text-black">
                            <p>
                              {expense.title} - PKR {String(expense.amount)}
                            </p>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-600 transition-transform`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-3 pt-2 text-sm text-gray-600 bg-gray-50">
                          <p className="border-b border-gray-200 py-2"><span className="font-medium">Title:</span> {expense.title}</p>
                          <p className="border-b border-gray-200 py-2"><span className="font-medium">Amount:</span> PKR {String(expense.amount)}</p>
                          <p className="border-b border-gray-200 py-2"><span className="font-medium">Category:</span> {expense.category}</p>
                          <p className="py-2"><span className="font-medium">Date:</span> {expense.date}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 border border-gray-200 rounded-lg px-6 py-4 bg-gray-50">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold text-black">Total Expense</h2>
              <h2 className="text-xl font-semibold text-black">
                PKR {totalExpenseBetweenDateRange}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangeExpenses;
