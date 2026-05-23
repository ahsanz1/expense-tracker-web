import React from "react";
import { SearchPageSkeleton } from "../ui/skeletons";

const Loading = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchPageSkeleton hasQuery />
    </main>
  );
};

export default Loading;
