import { createCategoryAction } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";
import FormButton from "../button";

function CreateCategoryForm() {
  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="rounded-lg bg-gray-100 p-3 mt-3 font-semibold text-lg">
        New Category
      </h2>
      <form action={createCategoryAction}>
        <div className="flex flex-col justify-start gap-y-2 rounded-lg bg-gray-100 p-3">
          <label htmlFor="title-input" className="mt-2 font-semibold">
            Enter category name
          </label>
          <input
            id="category-name-input"
            name="category-name"
            placeholder="Category Name"
            type="text"
            className="p-2"
            required
          ></input>
          <div className="flex flex-row justify-end gap-x-3 mt-2">
            <Link href={`/`} className="px-4 py-2 bg-white rounded-lg">
              Cancel
            </Link>
            <FormButton
              type="submit"
              className="px-4 py-2 bg-blue-400 rounded-lg"
              btnText="Save"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryForm;
