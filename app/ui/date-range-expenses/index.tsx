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
    <div className="flex flex-col gap-y-4">
      <div className="rounded-lg px-4 py-2 bg-gray-100">
        <h2 className="text-lg font-medium">Date Range</h2>
      </div>
      <div className="flex flex-row justify-between gap-x-2">
        <input
          type="date"
          className="border-2 p-1 rounded-lg w-[40%]"
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
        <input
          type="date"
          className="border-2 p-1 rounded-lg w-[40%]"
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
        <button
          className="rounded-lg px-2 bg-gray-100 w-[20%]"
          onClick={handleSearch}
          disabled={dateRange.startDate === "" || dateRange.endDate === ""}
        >
          {loading ? (
            <div className="animate-spin rounded-full my-0 mx-auto h-[24px] w-[24px] border-t-2 border-b-2 border-purple-500"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>
      <div className="date-range-expenses">
        {dateRangeExpenses.map((expense: Expense) => (
          <Disclosure key={String(expense._id)}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 mt-2 px-4 py-2 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <div className="flex flex-row justify-between w-full text-left text-sm font-medium text-purple-900">
                    <p>
                      {expense.title} - {String(expense.amount)}
                    </p>
                  </div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-1 pb-2 pt-2 text-sm text-gray-500">
                  <p className="border-b py-2">{expense.title}</p>
                  <p className="border-b py-2">{String(expense.amount)}</p>
                  <p className="border-b py-2">{expense.category}</p>
                  <p className="border-b py-2">{expense.date}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
      {dateRangeExpenses.length > 0 && (
        <div className="rounded-lg px-4 py-2 bg-gray-100 flex flex-row justify-between">
          <h2 className="text-lg font-medium">Total Expense</h2>
          <h2 className="text-lg font-medium">
            {totalExpenseBetweenDateRange}
          </h2>
        </div>
      )}
    </div>
  );
};

export default DateRangeExpenses;
