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
