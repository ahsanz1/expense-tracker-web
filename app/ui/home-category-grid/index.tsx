"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  currentSource,
  sources,
  salaryRemaining,
  salaryFormatted,
  showSalaryRemaining,
}: {
  items: CategoryTotal[];
  monthLabel: string;
  currentSource: string;
  sources: readonly string[];
  salaryRemaining: number;
  salaryFormatted: string;
  showSalaryRemaining: boolean;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const next = new URLSearchParams(searchParams.toString());
    if (value === "Salary") {
      next.delete("source");
    } else {
      next.set("source", value);
    }
    const query = next.toString();
    router.replace(query ? `/?${query}` : "/");
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-1">
            Expenses by category
          </h1>
          <p className="text-gray-600">{monthLabel}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            id="home-source"
            value={currentSource}
            onChange={handleSourceChange}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm min-w-[10rem]"
            aria-label="Filter by expense source"
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setCalendarOpen(true)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors shadow-sm"
          >
            Pick a date
          </button>
        </div>
      </div>

      {showSalaryRemaining && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
          <p className="text-sm font-medium text-gray-600 mb-0.5">Salary remaining (this month)</p>
          <p className="text-2xl font-semibold text-black">PKR {salaryFormatted}</p>
        </div>
      )}

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
