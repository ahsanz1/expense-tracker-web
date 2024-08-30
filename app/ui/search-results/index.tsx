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
      <div className="rounded-lg px-4 py-2 bg-gray-100 w-full flex flex-row justify-between">
        <h2 className="text-lg font-medium">
          Total Expense For{" "}
          {`"${query}"`}
        </h2>
        <h2 className="text-base font-medium">
          {total.toString()}
        </h2>
      </div>
      <div className="mt-5 flex flex-col gap-y-2">
        {hits.map((h) => (
          <div
            className="rounded-lg px-4 py-2 bg-gray-100 w-full"
            key={h.isoDate}
          >
            <h2 className="text-base font-medium">
              {h.title}
            </h2>
            <h2 className="text-base font-medium">
              {h.amount.toString()}
            </h2>
            <h2 className="text-base font-medium">
              {h.category}
            </h2>
            <h2 className="text-base font-medium">
              {h.date}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
