import React from "react";
import { HomeCategoryGridSkeleton } from "./ui/skeletons";

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <HomeCategoryGridSkeleton />
    </main>
  );
}
