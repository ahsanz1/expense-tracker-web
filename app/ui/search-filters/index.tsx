"use client";

import { EXPENSE_SOURCES } from "@/app/lib/static";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useSearchNav } from "../search-nav-context";

export default function SearchFilters({
  categories,
  initialQuery,
  initialStartDate,
  initialEndDate,
  initialCategory,
  initialSource,
}: {
  categories: { name: string }[];
  initialQuery: string;
  initialStartDate: string;
  initialEndDate: string;
  initialCategory: string;
  initialSource: string;
}) {
  const router = useRouter();
  const { beginSearchNavigation } = useSearchNav();
  const [isApplyPending, startApplyTransition] = useTransition();
  const [isClearPending, startClearTransition] = useTransition();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [category, setCategory] = useState(initialCategory);
  const [source, setSource] = useState(initialSource);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setCategory(initialCategory);
    setSource(initialSource);
  }, [initialStartDate, initialEndDate, initialCategory, initialSource]);

  const applyFilters = () => {
    beginSearchNavigation();
    startApplyTransition(() => {
      const params = new URLSearchParams();
      const q = initialQuery.trim();
      if (q) params.set("query", q);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (category) params.set("category", category);
      if (source) params.set("source", source);
      params.set("page", "1");
      router.push(`/search?${params.toString()}`);
      router.refresh();
    });
  };

  const clearFilters = () => {
    beginSearchNavigation();
    startClearTransition(() => {
      const q = initialQuery.trim();
      if (!q) {
        router.push("/search");
        router.refresh();
      } else {
        router.push(`/search?query=${encodeURIComponent(q)}&page=1`);
        router.refresh();
      }
      setStartDate("");
      setEndDate("");
      setCategory("");
      setSource("");
    });
  };

  const filterFields = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label htmlFor="filter-start" className="block text-xs font-medium text-gray-600 mb-1">
          Start date
        </label>
        <input
          id="filter-start"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label htmlFor="filter-end" className="block text-xs font-medium text-gray-600 mb-1">
          End date
        </label>
        <input
          id="filter-end"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label htmlFor="filter-category" className="block text-xs font-medium text-gray-600 mb-1">
          Category
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-spaced w-full rounded border border-gray-300 bg-white pl-4 pr-10 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-source" className="block text-xs font-medium text-gray-600 mb-1">
          Source
        </label>
        <select
          id="filter-source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="select-spaced w-full rounded border border-gray-300 bg-white pl-4 pr-10 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All</option>
          {EXPENSE_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      {/* Mobile: collapsible with filter icon; desktop: always visible */}
      <div className="sm:hidden">
        <Disclosure as="div" defaultOpen={false}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-black hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black">
                <span className="flex items-center gap-2">
                  <FunnelIcon className="h-5 w-5 text-gray-600" />
                  Filters
                </span>
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-3">
            {filterFields}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={applyFilters}
                disabled={isApplyPending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-black"
              >
                {isApplyPending ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : null}
                Apply filters
              </button>
              <button
                type="button"
                onClick={clearFilters}
                disabled={isClearPending}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-black"
              >
                {isClearPending ? (
                  <span className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                ) : null}
                Clear
              </button>
            </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className="hidden sm:block">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-black mb-3">
          <FunnelIcon className="h-5 w-5 text-gray-600" />
          Filters
        </h2>
        {filterFields}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={applyFilters}
            disabled={isApplyPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-black"
          >
            {isApplyPending ? (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : null}
            Apply filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            disabled={isClearPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-black"
          >
            {isClearPending ? (
              <span className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            ) : null}
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
