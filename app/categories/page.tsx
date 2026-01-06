import { fetchAllExpenses, fetchCategories } from "@/app/lib/data";
import CategoriesList from "@/app/ui/categories-list";
import Link from "next/link";
import React from "react";

async function Page() {
  const [categories, allExpenses] = await Promise.all([
    fetchCategories(),
    fetchAllExpenses(),
  ]);

  // Handle error cases
  if (!Array.isArray(categories) || categories.some((c: any) => c.message)) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-black mb-2">Categories</h1>
            <p className="text-gray-600">
              View all categories and their total expenses
            </p>
          </div>
          <Link
            href="/category/new"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            New Category
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-red-600">Error loading categories. Please try again.</p>
        </div>
      </main>
    );
  }

  // Calculate total amount per category
  const categoryAmounts: { [key: string]: number } = {};

  // Initialize all categories with 0
  if (Array.isArray(categories)) {
    categories.forEach((cat: any) => {
      categoryAmounts[cat.name] = 0;
    });
  }

  // Sum up expenses by category
  if (Array.isArray(allExpenses) && !allExpenses.some((e: any) => e.message)) {
    allExpenses.forEach((expense: any) => {
      if (expense.category && expense.amount) {
        categoryAmounts[expense.category] =
          (categoryAmounts[expense.category] || 0) + Number(expense.amount);
      }
    });
  }

  // Convert to array format
  const categoriesWithAmounts = Object.entries(categoryAmounts).map(
    ([name, amount]) => ({
      name,
      amount: amount as number,
    })
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-black mb-2">Categories</h1>
          <p className="text-gray-600">
            View all categories and their total expenses
          </p>
        </div>
        <Link
          href="/category/new"
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          New Category
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <CategoriesList categories={categoriesWithAmounts} />
      </div>
    </main>
  );
}

export default Page;

