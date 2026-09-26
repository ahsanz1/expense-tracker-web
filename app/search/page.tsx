import { fetchCategories, searchExpensesFiltered } from "@/app/lib/data";
import React, { Suspense } from "react";
import SearchFilters from "../ui/search-filters";
import { buildSearchParamsKey, parseCategoryParams } from "@/app/lib/search-utils";
import SearchPageShell from "../ui/search-page-shell";
import SearchResults from "../ui/search-results";
import { SearchPageSkeleton } from "../ui/skeletons";

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
  const categories = parseCategoryParams(raw?.category);
  const source = (typeof raw?.source === "string" ? raw.source : (raw?.source as string[])?.[0]) ?? "";
  const pageRaw = (typeof raw?.page === "string" ? raw.page : (raw?.page as string[])?.[0]) ?? "1";
  const page = Math.max(1, parseInt(pageRaw, 10) || 1);

  const hasActiveSearch = query.length > 0 || categories.length > 0;

  const { expenses, totalCount, totalAmount } = hasActiveSearch
    ? await searchExpensesFiltered({
        query: query || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        categories,
        source: source || undefined,
        page,
        limit: LIMIT,
      })
    : { expenses: [], totalCount: 0, totalAmount: 0 };

  const serverKey = buildSearchParamsKey({
    query,
    startDate,
    endDate,
    categories,
    source,
    page,
  });

  const allCategories = await fetchCategories();
  const categoriesList = Array.isArray(allCategories) ? allCategories : [];

  const paramsRecord: Record<string, string | string[] | undefined> = {};
  if (query) paramsRecord.query = query;
  if (startDate) paramsRecord.startDate = startDate;
  if (endDate) paramsRecord.endDate = endDate;
  if (categories.length > 0) paramsRecord.category = categories;
  if (source) paramsRecord.source = source;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<SearchPageSkeleton showFilters />}>
        <SearchPageShell serverKey={serverKey} showFilters>
          <SearchFilters
            categories={categoriesList}
            initialQuery={query}
            initialStartDate={startDate}
            initialEndDate={endDate}
            initialCategories={categories}
            initialSource={source}
          />
          {!hasActiveSearch ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
              <p>
                Search by title in the navbar, or select one or more categories below and apply filters.
              </p>
            </div>
          ) : (
            <SearchResults
              hits={(expenses as any[]) || []}
              query={query}
              categories={categories}
              totalCount={totalCount}
              totalAmount={totalAmount}
              page={page}
              limit={LIMIT}
              paramsRecord={paramsRecord}
            />
          )}
        </SearchPageShell>
      </Suspense>
    </main>
  );
}
