"use client";

import { createMultipleExpensesAction } from "@/app/lib/actions";
import { sortByKeyName } from "@/app/lib/utils";
import CategorySearchInput from "@/app/ui/category-search-input";
import Link from "next/link";
import React, { useState } from "react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface ExpenseEntry {
  title: string;
  amount: string;
  category: string;
}

function CreateExpenseForm({
  expensesDate,
  expenseCategories = [],
}: {
  expensesDate: string;
  expenseCategories: any[];
}) {
  const date = new Date(expensesDate).toDateString();
  const sortedExpenseCategories = sortByKeyName(expenseCategories, "name");
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([
    { title: "", amount: "", category: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addExpenseRow = () => {
    setExpenses([...expenses, { title: "", amount: "", category: "" }]);
  };

  const removeExpenseRow = (index: number) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter((_, i) => i !== index));
    }
  };

  const updateExpense = (index: number, field: keyof ExpenseEntry, value: string) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = { ...updatedExpenses[index], [field]: value };
    setExpenses(updatedExpenses);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Filter out empty expenses and validate
    const validExpenses = expenses
      .filter((exp) => exp.title.trim() && exp.amount && exp.category)
      .map((exp) => ({
        title: exp.title.trim(),
        amount: Number(exp.amount),
        category: exp.category,
      }));

    if (validExpenses.length === 0) {
      alert("Please add at least one expense with all fields filled.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createMultipleExpensesAction(expensesDate, validExpenses);
    } catch (error) {
      console.error("Error creating expenses:", error);
      alert("Failed to create expenses. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-black mb-2">
        New Expenses - {date}
      </h2>
      <p className="text-gray-600 mb-6">Add multiple expenses at once</p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-6 border border-gray-200 rounded-lg p-6 bg-white">
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Expense #{index + 1}
                </h3>
                {expenses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExpenseRow(index)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    title="Remove expense"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor={`title-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title
                  </label>
                  <input
                    id={`title-${index}`}
                    placeholder="Enter expense title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    type="text"
                    value={expense.title}
                    onChange={(e) =>
                      updateExpense(index, "title", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor={`amount-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Amount (PKR)
                  </label>
                  <input
                    id={`amount-${index}`}
                    placeholder="Enter amount"
                    step="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    required
                    type="number"
                    value={expense.amount}
                    onChange={(e) =>
                      updateExpense(index, "amount", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`category-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <CategorySearchInput
                    id={`category-${index}`}
                    categories={sortedExpenseCategories}
                    value={expense.category}
                    onChange={(value) =>
                      updateExpense(index, "category", value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExpenseRow}
            className="flex flex-row items-center justify-center gap-x-2 px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Add Another Expense
          </button>

          <div className="flex flex-row justify-end gap-x-3 pt-4 border-t border-gray-200">
            <Link
              href={`/expenses/${expensesDate}`}
              className="px-6 py-2 bg-white border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full my-0 mx-auto h-[20px] w-[20px] border-2 border-white border-t-transparent"></div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateExpenseForm;
