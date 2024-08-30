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
    <SearchResults
      hits={hits || []}
      query={query}
    />
  );
};

export default SearchPage;
