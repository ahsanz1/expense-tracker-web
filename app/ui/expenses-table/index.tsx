"use client";
import { Expense } from "@/app/lib/types";
import React from "react";

function ExpensesTable({
  className,
  expensesDate,
  expenses,
}: {
  className: string;
  expensesDate: string;
  expenses: Expense[];
}) {
  return (
    <table className={`${className} w-full`}>
      <tr className="flex flex-row justify-between gap-x-11 items-center">
        <th className="w-100 text-center">Sr. No</th>
        <th className="w-100 text-center">Title</th>
        <th className="w-100 text-center">Amount</th>
        <th className="w-100 text-center">Category</th>
      </tr>
      {expenses.map((expense: any, index) => (
        <tr
          key={index}
          className="flex flex-row justify-between gap-x-11 items-center"
        >
          <td className="w-16 text-center">{index + 1}</td>
          <td className="w-16 text-center">{expense.title}</td>
          <td className="w-16 text-center">{expense.amount}</td>
          <td className="w-16 text-center">{expense.category?.name}</td>
        </tr>
      ))}
    </table>
  );
}

export default ExpensesTable;
