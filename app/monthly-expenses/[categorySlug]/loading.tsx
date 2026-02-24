import React from "react";
import Link from "next/link";
import { MonthlyExpensesListSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to home
        </Link>
      </div>
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-1" />
      <div className="h-5 w-32 bg-gray-100 rounded animate-pulse mb-6" />
      <MonthlyExpensesListSkeleton />
    </main>
  );
}
