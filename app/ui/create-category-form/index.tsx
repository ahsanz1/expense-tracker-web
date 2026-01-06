import { createCategoryAction } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";
import FormButton from "../button";

function CreateCategoryForm() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-black mb-6">
        New Category
      </h2>
      <form action={createCategoryAction}>
        <div className="flex flex-col gap-y-4 border border-gray-200 rounded-lg p-6 bg-white">
          <div>
            <label htmlFor="category-name-input" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              id="category-name-input"
              name="category-name"
              placeholder="Enter category name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-row justify-end gap-x-3 pt-4 border-t border-gray-200">
            <Link 
              href={`/`} 
              className="px-6 py-2 bg-white border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <FormButton
              type="submit"
              variant="primary"
              btnText="Save"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryForm;
