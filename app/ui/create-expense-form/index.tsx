import { createExpenseAction } from "@/app/lib/actions";
import Link from "next/link";
import React from "react";

function CreateExpenseForm({
  expensesDate,
  expenseCategories,
}: {
  expensesDate: string;
  expenseCategories: any[];
}) {
  const date = new Date(expensesDate).toDateString();
  const createExpenseActionWithDateArg = createExpenseAction.bind(null, date);
  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="rounded-lg bg-gray-100 p-3 mt-3 font-semibold text-lg">
        New Expense - {date}
      </h2>
      <form action={createExpenseActionWithDateArg}>
        <div className="flex flex-col justify-start gap-y-2 rounded-lg bg-gray-100 p-3">
          <label htmlFor="title-input" className="mt-2 font-semibold">
            Enter expense title
          </label>
          <input
            id="title-input"
            name="title"
            placeholder="Title"
            step="1"
            className="p-2"
          ></input>
          <label htmlFor="amount-input" className="mt-2 font-semibold">
            Enter PKR amount
          </label>
          <input
            id="amount-input"
            name="amount"
            placeholder="Amount"
            step="1"
            className="p-2"
          ></input>
          <label htmlFor="category-dd" className="mt-2 font-semibold">
            Choose Category
          </label>
          <select id="category-dd" name="category" className="p-2">
            <option value="" disabled selected>
              Select expense category
            </option>
            {expenseCategories.map((ctgry: any) => (
              <option value={ctgry.name} key={ctgry.name}>
                {ctgry.name}
              </option>
            ))}
          </select>
          <div className="flex flex-row justify-end gap-x-3 mt-2">
            <Link
              href={`/expenses/${expensesDate}`}
              className="px-4 py-2 bg-white rounded-lg"
            >
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 bg-blue-400 rounded-lg">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateExpenseForm;
