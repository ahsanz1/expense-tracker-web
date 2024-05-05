import React from "react";

import Skeleton from "react-loading-skeleton";

export function ExpensesSkeleton() {
  return (
    <div className="flex flex-col mt-8 gap-y-4">
      <Skeleton height={32} />
      <Skeleton count={10} height={32} />
    </div>
  );
}

export function CreateExpenseFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-3">
      <Skeleton className="mt-3" height={52} />
      <Skeleton height={333} />
    </div>
  );
}

export function BarChartSkeletion({ noOfBars }: { noOfBars: number }) {
  const count = new Array(noOfBars).fill(0);
  return (
    <div className="flex flex-row gap-x-3 mt-3">
      {count.map((c, idx) => (
        <Skeleton height={350} width={20} key={idx} />
      ))}
    </div>
  );
}
