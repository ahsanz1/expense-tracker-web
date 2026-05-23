import { CreateCategoryFormSkeleton } from "@/app/ui/skeletons";
import React from "react";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CreateCategoryFormSkeleton />
    </main>
  );
}
