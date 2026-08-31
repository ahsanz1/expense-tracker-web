import React from "react";

import Skeleton from "react-loading-skeleton";

const EXPENSE_DAY_ROWS = 6;

function ExpensesListMobileSkeleton() {
  return (
    <div className="md:hidden w-full flex flex-col">
      <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <Skeleton height={28} width={220} />
        <Skeleton height={40} width={40} className="rounded-md" />
      </div>
      <div className="flex flex-col">
        {Array.from({ length: EXPENSE_DAY_ROWS }).map((_, i) => (
          <Skeleton
            key={i}
            height={52}
            className={`rounded-lg ${i > 0 ? "mt-2" : ""}`}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex flex-row justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
          <Skeleton height={20} width={88} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="flex flex-row justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
          <Skeleton height={20} width={88} />
          <Skeleton height={20} width={120} />
        </div>
      </div>
    </div>
  );
}

function ExpensesTableDesktopSkeleton() {
  return (
    <div className="hidden md:block w-full">
      <div className="flex flex-row justify-between items-center mb-6">
        <Skeleton height={32} width={280} />
        <Skeleton height={40} width={120} className="rounded-md" />
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex gap-4">
          <Skeleton height={14} width={24} />
          <Skeleton height={14} width={48} className="flex-1" />
          <Skeleton height={14} width={56} />
          <Skeleton height={14} width={64} className="flex-1" />
          <Skeleton height={14} width={56} />
        </div>
        <div className="divide-y divide-gray-200 bg-white">
          {Array.from({ length: EXPENSE_DAY_ROWS }).map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <Skeleton height={16} width={20} />
              <Skeleton height={16} width="30%" className="flex-1" />
              <Skeleton height={16} width={72} />
              <Skeleton height={16} width="25%" className="flex-1" />
              <div className="flex gap-3 justify-center">
                <Skeleton height={20} width={20} />
                <Skeleton height={20} width={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <Skeleton height={16} width={72} className="mb-2" />
          <Skeleton height={32} width={140} />
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <Skeleton height={16} width={80} className="mb-2" />
          <Skeleton height={32} width={160} />
        </div>
      </div>
    </div>
  );
}

/** Matches /expenses/[date]: mobile list + desktop table */
export function ExpensesSkeleton() {
  return (
    <>
      <ExpensesListMobileSkeleton />
      <ExpensesTableDesktopSkeleton />
    </>
  );
}

function DateRangePickerSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <Skeleton height={24} width={180} className="mb-4" />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Skeleton height={16} width={72} className="mb-2" />
          <Skeleton height={42} className="rounded-md" />
        </div>
        <div className="flex-1">
          <Skeleton height={16} width={64} className="mb-2" />
          <Skeleton height={42} className="rounded-md" />
        </div>
        <div className="flex items-end">
          <Skeleton height={42} width={100} className="rounded-md" />
        </div>
      </div>
    </div>
  );
}

function ChartCardSkeleton({ titleWidth = 160 }: { titleWidth?: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <Skeleton height={24} width={titleWidth} className="mb-4" />
      <Skeleton height={400} className="rounded" />
    </div>
  );
}

/** /analytics client page – line charts */
export function AnalyticsChartsSkeleton() {
  return (
    <div className="flex flex-col gap-y-8">
      <ChartCardSkeleton titleWidth={180} />
      <ChartCardSkeleton titleWidth={200} />
    </div>
  );
}

/** /analytics/[month] – bar + line charts */
function AnalyticsMonthChartsSkeleton() {
  return (
    <div className="flex flex-col gap-y-8">
      <ChartCardSkeleton titleWidth={200} />
      <ChartCardSkeleton titleWidth={160} />
    </div>
  );
}

/** /analytics/[month] full page */
export function AnalyticsMonthPageSkeleton() {
  return (
    <>
      <div className="mb-8">
        <Skeleton height={36} width={140} className="mb-2" />
        <Skeleton height={20} width={280} />
      </div>
      <div className="flex flex-col gap-y-8">
        <DateRangePickerSkeleton />
        <AnalyticsMonthChartsSkeleton />
      </div>
    </>
  );
}

/** /analytics client page while fetching */
export function AnalyticsPageSkeleton() {
  return (
    <>
      <div className="mb-8">
        <Skeleton height={36} width={140} className="mb-2" />
        <Skeleton height={20} width={320} />
      </div>
      <div className="flex flex-col gap-y-8">
        <DateRangePickerSkeleton />
        <AnalyticsChartsSkeleton />
      </div>
    </>
  );
}

export const AnalyticsSkeleton = AnalyticsMonthPageSkeleton;

function ExpenseFormRowSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex flex-row justify-between items-center mb-4">
        <Skeleton height={16} width={88} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton height={16} width={64} className="mb-2" />
            <Skeleton height={42} className="rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormActionsSkeleton() {
  return (
    <div className="flex flex-row justify-end gap-x-3 pt-4 border-t border-gray-200">
      <Skeleton height={40} width={80} className="rounded-md" />
      <Skeleton height={40} width={100} className="rounded-md" />
    </div>
  );
}

/** /expenses/[date]/new */
export function CreateExpenseFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton height={28} width={280} className="mb-2" />
      <Skeleton height={20} width={200} className="mb-6" />
      <div className="flex flex-col gap-y-6 border border-gray-200 rounded-lg p-6 bg-white">
        <ExpenseFormRowSkeleton />
        <Skeleton height={42} width={200} className="rounded-md" />
        <FormActionsSkeleton />
      </div>
    </div>
  );
}

/** /expenses/[date]/[id]/edit */
export function EditExpenseFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton height={28} width={240} className="mb-2" />
      <Skeleton height={20} width={160} className="mb-6" />
      <div className="flex flex-col gap-y-6 border border-gray-200 rounded-lg p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Skeleton height={16} width={72} className="mb-2" />
              <Skeleton height={42} className="rounded-md" />
            </div>
          ))}
        </div>
        <FormActionsSkeleton />
      </div>
    </div>
  );
}

/** /category/new */
export function CreateCategoryFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <Skeleton height={28} width={160} className="mb-6" />
      <div className="flex flex-col gap-y-4 border border-gray-200 rounded-lg p-6 bg-white">
        <div>
          <Skeleton height={16} width={100} className="mb-2" />
          <Skeleton height={42} className="rounded-md" />
        </div>
        <FormActionsSkeleton />
      </div>
    </div>
  );
}

const CATEGORY_LIST_SKELETON_COUNT = 10;

/** /categories */
export function CategoriesPageSkeleton() {
  return (
    <>
      <div className="mb-8 flex flex-row justify-between items-center">
        <div>
          <Skeleton height={36} width={160} className="mb-2" />
          <Skeleton height={20} width={280} />
        </div>
        <Skeleton height={40} width={140} className="rounded-md" />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Skeleton height={42} className="rounded-md mb-4" />
        <div className="space-y-4">
          {Array.from({ length: CATEGORY_LIST_SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 border-gray-200">
              <div className="flex flex-row justify-between items-center">
                <Skeleton height={22} width="45%" />
                <Skeleton height={22} width={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton height={44} />
      <Skeleton count={10} height={112} />
    </div>
  );
}

const SEARCH_RESULT_ROWS = 10;

function SearchFiltersSkeleton() {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="sm:hidden">
        <Skeleton height={46} className="rounded-lg" />
      </div>
      <div className="hidden sm:block">
        <Skeleton height={20} width={80} className="mb-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton height={16} width={72} className="mb-1" />
              <Skeleton height={42} className="rounded" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Skeleton height={40} width={112} className="rounded-lg" />
          <Skeleton height={40} width={72} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Matches search page layout (filters, header, total, 10 rows, pagination). */
export function SearchPageSkeleton({ hasQuery = true }: { hasQuery?: boolean }) {
  if (!hasQuery) {
    return (
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
        <Skeleton height={20} width="80%" className="mx-auto" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SearchFiltersSkeleton />

      <div className="mb-6">
        <Skeleton height={36} width={240} className="mb-2" />
        <Skeleton height={20} width={320} />
      </div>

      <div className="border border-gray-200 rounded-lg px-6 py-4 bg-gray-50 mb-6">
        <Skeleton height={28} width={280} />
        <Skeleton height={16} width={160} className="mt-2" />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {Array.from({ length: SEARCH_RESULT_ROWS }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div className="flex-1 min-w-0">
                <Skeleton height={20} width="60%" className="mb-1" />
                <Skeleton height={16} width="45%" />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Skeleton height={24} width={96} />
                <Skeleton height={20} width={20} className="rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Skeleton height={16} width={88} />
        <div className="flex gap-2">
          <Skeleton height={40} width={88} className="rounded-lg" />
          <Skeleton height={40} width={64} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}

const HOME_CATEGORY_CARD_COUNT = 12;

function HomeCategoryCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 bg-gray-100">
      <Skeleton height={18} width="85%" className="mb-2" />
      <Skeleton height={24} width="70%" />
    </div>
  );
}

/** Matches home page: header, month/source/date controls, salary card, category grid */
export function HomeCategoryGridSkeleton({
  showSalarySummary = true,
}: {
  showSalarySummary?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <Skeleton height={36} width={280} className="mb-1" />
          <Skeleton height={20} width={96} />
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
          <Skeleton
            height={42}
            className="rounded-lg sm:order-none order-last w-full sm:w-[140px] shrink-0"
          />
          <div className="flex flex-row items-center justify-between gap-2 w-full sm:w-auto">
            <Skeleton height={42} className="rounded-lg flex-1 min-w-0 sm:min-w-[140px] sm:max-w-[200px]" />
            <Skeleton height={42} width={132} className="rounded-lg shrink-0" />
          </div>
        </div>
      </div>

      {showSalarySummary && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
            <Skeleton height={16} width={180} className="mb-1" />
            <Skeleton height={32} width={160} />
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
            <Skeleton height={16} width={160} className="mb-1" />
            <Skeleton height={32} width={160} />
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
            <Skeleton height={16} width={200} className="mb-1" />
            <Skeleton height={32} width={160} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: HOME_CATEGORY_CARD_COUNT }).map((_, i) => (
          <HomeCategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

const MONTHLY_EXPENSE_ROWS = 8;

/** /monthly-expenses/[categorySlug] full page */
export function MonthlyExpensesPageSkeleton() {
  return (
    <>
      <div className="mb-6">
        <Skeleton height={16} width={120} />
      </div>
      <Skeleton height={28} width={200} className="mb-1" />
      <Skeleton height={20} width={96} className="mb-6" />
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
        {Array.from({ length: MONTHLY_EXPENSE_ROWS }).map((_, i) => (
          <li
            key={i}
            className="flex flex-row justify-between items-center gap-3 px-4 py-3"
          >
            <div className="flex-1 min-w-0">
              <Skeleton height={18} width="70%" className="mb-1" />
              <Skeleton height={14} width="55%" />
            </div>
            <Skeleton height={20} width={72} className="shrink-0" />
            <Skeleton height={20} width={20} className="shrink-0 rounded" />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
        <Skeleton height={24} width={160} />
      </div>
    </>
  );
}

export const MonthlyExpensesListSkeleton = MonthlyExpensesPageSkeleton;
