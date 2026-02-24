import { fetchCategories, searchExpensesFiltered } from "@/app/lib/data";
import React from "react";
import SearchFilters from "../ui/search-filters";
import SearchResults from "../ui/search-results";

const LIMIT = 10;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const raw = (await Promise.resolve(searchParams).catch(() => ({}))) as Record<
    string,
    string | string[] | undefined
  >;
  const query = (typeof raw?.query === "string" ? raw.query : (raw?.query as string[])?.[0] ?? "").trim();
  const startDate = (typeof raw?.startDate === "string" ? raw.startDate : (raw?.startDate as string[])?.[0]) ?? "";
  const endDate = (typeof raw?.endDate === "string" ? raw.endDate : (raw?.endDate as string[])?.[0]) ?? "";
  const category = (typeof raw?.category === "string" ? raw.category : (raw?.category as string[])?.[0]) ?? "";
  const source = (typeof raw?.source === "string" ? raw.source : (raw?.source as string[])?.[0]) ?? "";
  const pageRaw = (typeof raw?.page === "string" ? raw.page : (raw?.page as string[])?.[0]) ?? "1";
  const page = Math.max(1, parseInt(pageRaw, 10) || 1);

  const { expenses, totalCount } = query
    ? await searchExpensesFiltered({
        query,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        category: category || undefined,
        source: source || undefined,
        page,
        limit: LIMIT,
      })
    : { expenses: [], totalCount: 0 };

  const categories = await fetchCategories();
  const categoriesList = Array.isArray(categories) ? categories : [];

  const paramsRecord: Record<string, string> = {};
  if (query) paramsRecord.query = query;
  if (startDate) paramsRecord.startDate = startDate;
  if (endDate) paramsRecord.endDate = endDate;
  if (category) paramsRecord.category = category;
  if (source) paramsRecord.source = source;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!query && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
          <p>Enter a search term in the navbar to search expenses by title.</p>
        </div>
      )}
      {query && (
        <SearchFilters
          categories={categoriesList}
          initialQuery={query}
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialCategory={category}
          initialSource={source}
        />
      )}
      <SearchResults
        hits={(expenses as any[]) || []}
        query={query}
        totalCount={totalCount}
        page={page}
        limit={LIMIT}
        paramsRecord={paramsRecord}
      />
    </main>
  );
}
