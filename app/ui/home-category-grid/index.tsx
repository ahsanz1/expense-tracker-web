"use client";

import { CalendarDaysIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import CalendarModal from "../calendar-modal";
import { HomeCategoryGridSkeleton } from "../skeletons";
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
  monthKey,
  monthOptions,
  currentSource,
  sources,
  salaryRemaining,
  salaryFormatted,
  showSalaryRemaining,
}: {
  items: CategoryTotal[];
  monthLabel: string;
  monthKey: string;
  monthOptions: { key: string; label: string }[];
  currentSource: string;
  sources: readonly string[];
  salaryRemaining: number;
  salaryFormatted: string;
  showSalaryRemaining: boolean;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (updates: { source?: string; month?: string }) => {
    const next = new URLSearchParams(searchParams.toString());
    if (updates.source !== undefined) {
      if (updates.source === "Salary") next.delete("source");
      else next.set("source", updates.source);
    }
    if (updates.month !== undefined) {
      if (updates.month) next.set("month", updates.month);
      else next.delete("month");
    }
    const query = next.toString();
    startTransition(() => {
      router.replace(query ? `/?${query}` : "/");
    });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateParams({ source: value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ month: e.target.value });
  };

  if (isPending) {
    return <HomeCategoryGridSkeleton showSalaryRemaining={showSalaryRemaining} />;
  }

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-1">
            Expenses by category
          </h1>
          <p className="text-gray-600">{monthLabel}</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
          <select
            id="home-month"
            value={monthKey}
            onChange={handleMonthChange}
            className="select-spaced sm:order-none order-last rounded-lg border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm min-w-0 w-full sm:w-auto"
            aria-label="Select month"
          >
            {monthOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
          <div className="flex flex-row items-center justify-between gap-2">
            <select
              id="home-source"
              value={currentSource}
              onChange={handleSourceChange}
              className="select-spaced flex-1 min-w-0 rounded-lg border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors shrink-0"
            >
              <CalendarDaysIcon className="h-5 w-5 shrink-0" />
              Pick a date
            </button>
          </div>
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
              href={`/monthly-expenses/${slug}?month=${encodeURIComponent(monthKey)}`}
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
