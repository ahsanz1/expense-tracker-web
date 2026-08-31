"use client";

import Link from "next/link";
import React, { useState } from "react";

interface CategoryWithAmount {
  name: string;
  amount: number;
}

interface CategoriesListProps {
  categories: CategoryWithAmount[];
}

function CategoriesList({ categories }: CategoriesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Calculate amounts for percentile-based color coding
  const amounts = filteredCategories.map((c) => c.amount).sort((a, b) => b - a);
  const maxAmount = amounts[0] || 0;

  const searchInput = (
    <div className="mb-4">
      <label
        htmlFor="category-search"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Search categories
      </label>
      <input
        id="category-search"
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search by category name"
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
    </div>
  );
  
  if (maxAmount === 0) {
    // All categories have 0 amount
    return (
      <div>
        {searchInput}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No categories match your search.
          </div>
        ) : (
          <div className="space-y-4">
          {filteredCategories.map((category) => (
          <div
            key={category.name}
            className="border rounded-lg p-4 bg-gray-100 border-gray-300"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black">
                  {category.name}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-black">
                  PKR {category.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          ))}
          </div>
        )}
      </div>
    );
  }

  // Calculate percentiles for tighter color coding
  const p90 = amounts[Math.floor(amounts.length * 0.1)] || 0; // Top 10%
  const p70 = amounts[Math.floor(amounts.length * 0.3)] || 0; // Top 30%

  // Function to get background color based on amount with tighter thresholds
  const getBackgroundColor = (amount: number) => {
    // Red for top 10% (>= 90th percentile), Yellow for next 20% (70-90th percentile), Green for rest (<70th percentile)
    if (amount >= p90) {
      return "bg-red-100 border-red-300";
    } else if (amount >= p70) {
      return "bg-yellow-100 border-yellow-300";
    } else {
      return "bg-green-100 border-green-300";
    }
  };

  // Sort categories by amount (highest first)
  const sortedCategories = [...filteredCategories].sort((a, b) => b.amount - a.amount);

  return (
    <div>
      {searchInput}
      {sortedCategories.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <p>No categories match your search.</p>
        </div>
      ) : (
        <>
          {sortedCategories.map((category) => (
            <div
              key={category.name}
              className={`border rounded-lg p-4 transition-colors ${getBackgroundColor(
                category.amount
              )}`}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">
                    {category.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-black">
                    PKR {category.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CategoriesList;

