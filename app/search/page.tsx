import React from "react";
import SearchResults from "../ui/search-results";
import { searchExpenses } from "../lib/data";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) => {
  const { query = "" } = searchParams;
  const hits = await searchExpenses(
    query
  );
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchResults
        hits={hits || []}
        query={query}
      />
    </main>
  );
};

export default SearchPage;
