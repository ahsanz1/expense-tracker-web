import { AnalyticsMonthPageSkeleton } from "@/app/ui/skeletons";
import React from "react";

function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnalyticsMonthPageSkeleton />
    </main>
  );
}

export default Loading;
