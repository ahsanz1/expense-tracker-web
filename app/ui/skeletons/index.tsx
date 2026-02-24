import React from "react";

import Skeleton from "react-loading-skeleton";

export function ExpensesSkeleton() {
  return (
    <div className="flex flex-col mt-8 gap-y-4">
      <Skeleton height={32} />
      <Skeleton
        count={10}
        height={32}
      />
    </div>
  );
}

export function CreateExpenseFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-3">
      <Skeleton
        className="mt-3"
        height={52}
      />
      <Skeleton height={333} />
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-4">
        <Skeleton height={40} />
        <div className="flex flex-row justify-between gap-x-2 [&>span:nth-child(1)]:w-[40%] [&>span:nth-child(2)]:w-[40%] [&>span:nth-child(3)]:w-[20%]">
          <Skeleton
            height={38}
            className="w-[100%]"
          />
          <Skeleton
            height={38}
            className="w-[100%]"
          />
          <Skeleton
            height={38}
            className="w-[100%]"
          />
        </div>
      </div>
      <Skeleton height={196} />
      <Skeleton height={196} />
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton height={44} />
      <Skeleton
        count={10}
        height={112}
      />
    </div>
  );
}

export function HomeCategoryGridSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <Skeleton height={32} width={280} className="mb-1" />
          <Skeleton height={20} width={80} />
        </div>
        <div className="flex gap-2">
          <Skeleton height={42} width={120} />
          <Skeleton height={42} width={140} />
          <Skeleton height={42} width={120} />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height={112} className="rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function MonthlyExpensesListSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 mt-6">
      <Skeleton height={24} count={1} className="mb-2" />
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="flex flex-row justify-between items-center gap-3 px-4 py-3">
            <div className="flex-1 min-w-0">
              <Skeleton height={18} width="70%" className="mb-1" />
              <Skeleton height={14} width="50%" />
            </div>
            <Skeleton height={20} width={64} />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end pt-4">
        <Skeleton height={28} width={140} />
      </div>
    </div>
  );
}
