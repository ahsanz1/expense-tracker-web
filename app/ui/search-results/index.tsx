import { Expense } from "@/app/lib/types";
import Link from "next/link";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

interface SearchResultsProps {
  hits: Expense[];
  query: string;
  totalCount: number;
  page: number;
  limit: number;
  /** Current search params as record (e.g. { query: "x", page: "1" }) for building pagination URLs */
  paramsRecord: Record<string, string | undefined>;
}

function toExpenseDateParam(isoOrDate: string | undefined): string {
  if (!isoOrDate) return "";
  const d = new Date(isoOrDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function SearchResults({
  hits = [],
  query = "",
  totalCount,
  page,
  limit,
  paramsRecord,
}: SearchResultsProps) {
  const totalAmount = hits.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    Object.entries(paramsRecord).forEach(([k, v]) => {
      if (v != null && v !== "") params.set(k, v);
    });
    params.set("page", String(p));
    return `/search?${params.toString()}`;
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-black mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-600">
            Results for: <span className="font-medium text-black">&quot;{query}&quot;</span>
            {totalCount > 0 && (
              <span className="ml-2 text-gray-500">
                ({totalCount} {totalCount === 1 ? "result" : "results"})
              </span>
            )}
          </p>
        )}
      </div>

      {hits.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No expenses found</p>
        </div>
      ) : (
        <>
          <div className="border border-gray-200 rounded-lg px-6 py-4 bg-gray-50 mb-6">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold text-black">
                Total (this page): PKR {totalAmount.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {hits.map((h) => {
                const expenseDate = toExpenseDateParam((h as any).isoDate ?? (h as any).date);
                const editHref =
                  (h as any)._id && expenseDate
                    ? `/expenses/${expenseDate}/${(h as any)._id}/edit?returnTo=${encodeURIComponent(`/search?${new URLSearchParams({ ...paramsRecord, page: String(page) }).toString()}`)}`
                    : null;
                return (
                  <div
                    className="px-6 py-4 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                    key={String((h as any)._id ?? (h as any).date ?? "") + String((h as any).title ?? "")}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-black mb-1">
                        {(h as any).title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(h as any).category} • {(h as any).date}
                        {((h as any).source ?? "Salary") !== "Salary" && (
                          <span> • {(h as any).source}</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-lg font-semibold text-black">
                        PKR {Number((h as any).amount).toLocaleString()}
                      </span>
                      {editHref && (
                        <Link
                          href={editHref}
                          className="p-1 text-black hover:text-gray-600 rounded"
                          aria-label="Edit expense"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                {hasPrev && (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {hasNext && (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
