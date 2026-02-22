"use client";

import Link from "next/link";
import React, { useState } from "react";
import CalendarModal from "../calendar-modal";
import "react-calendar/dist/Calendar.css";

export type CategoryTotal = {
  category: string;
  total: number;
  slug: string;
  color: string;
};

export default function HomeCategoryGrid({
  items,
  monthLabel,
  salaryRemaining,
  salaryFormatted,
}: {
  items: CategoryTotal[];
  monthLabel: string;
  salaryRemaining: number;
  salaryFormatted: string;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <>
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-600">Salary remaining (this month)</p>
        <p className="text-2xl font-semibold text-black">PKR {salaryFormatted}</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-2">
            Expenses by category
          </h1>
          <p className="text-gray-600">{monthLabel}</p>
        </div>
        <button
          type="button"
          onClick={() => setCalendarOpen(true)}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors shrink-0"
        >
          Pick a date
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
          No expenses recorded for this month yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(({ category, total, slug, color }) => (
            <Link
              key={slug}
              href={`/monthly-expenses/${slug}`}
              className="block rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              style={{
                backgroundColor: color,
              }}
            >
              <p className="font-medium text-black truncate" title={category}>
                {category}
              </p>
              <p className="mt-1 text-lg font-semibold text-black">
                PKR {total.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}

      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </>
  );
}
