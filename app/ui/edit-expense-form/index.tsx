"use client";

import { updateExpenseAction } from "@/app/lib/actions";
import { sortByKeyName } from "@/app/lib/utils";
import CategorySearchInput from "@/app/ui/category-search-input";
import Link from "next/link";
import React, { useState } from "react";
import { Expense } from "@/app/lib/types";

interface EditExpenseFormProps {
  expense: Expense;
  expensesDate: string;
  expenseCategories: any[];
}

function EditExpenseForm({
  expense,
  expensesDate,
  expenseCategories = [],
}: EditExpenseFormProps) {
  const date = new Date(expensesDate).toDateString();
  const sortedExpenseCategories = sortByKeyName(expenseCategories, "name");
  
  const [formData, setFormData] = useState({
    title: expense.title?.toString() || "",
    amount: expense.amount?.toString() || "",
    category: expense.category || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title.trim() || !formData.amount || !formData.category) {
      alert("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title.trim());
      formDataToSubmit.append("amount", formData.amount);
      formDataToSubmit.append("category", formData.category);

      await updateExpenseAction(
        expense._id?.toString() || "",
        expensesDate,
        formDataToSubmit
      );
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-black mb-2">
        Edit Expense - {date}
      </h2>
      <p className="text-gray-600 mb-6">Update expense details</p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-6 border border-gray-200 rounded-lg p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                placeholder="Enter expense title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount (PKR)
              </label>
              <input
                id="amount"
                placeholder="Enter amount"
                step="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                required
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <CategorySearchInput
                id="category"
                categories={sortedExpenseCategories}
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
                required
              />
            </div>
          </div>

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
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditExpenseForm;

