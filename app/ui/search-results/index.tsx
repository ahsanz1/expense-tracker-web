import { Expense } from "@/app/lib/types";
import React from "react";

interface SearchResultsProps {
  hits: Expense[];
  query: string;
}

const SearchResults = (
  props: SearchResultsProps
) => {
  const { hits = [], query = "" } =
    props;
  const total = hits.reduce(
    (acc: Number, curr: any) =>
      acc + curr.amount,
    0
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-600">
            Results for: <span className="font-medium text-black">"{query}"</span>
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
                Total Expense For{" "}
                {`"${query}"`}
              </h2>
              <h2 className="text-xl font-semibold text-black">
                PKR {total.toString()}
              </h2>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {hits.map((h) => (
                <div
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  key={h.isoDate}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-black mb-1">
                        {h.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {h.category} • {h.date}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-black">
                      PKR {h.amount.toString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchResults;
