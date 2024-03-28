"use client";

import { Expense } from "@/app/lib/types";
import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

function ExpensesList({
  className,
  expensesDate,
  expenses,
}: {
  className: string;
  expensesDate: string;
  expenses: Expense[];
}) {
  const date = new Date(expensesDate).toDateString();
  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex flex-row justify-between">
        <h2>Expenses For {date}</h2>
        <Link href={`/expenses/${expensesDate}/new`}>
          <PlusCircleIcon color="gray" width={24} height={24} />
        </Link>
      </div>
      {expenses.map((expense: Expense) => (
        <Disclosure key={String(expense._id)}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 mt-2 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>
                  {expense.title} - {String(expense.amount)}
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-1 pb-2 pt-2 text-sm text-gray-500">
                <p className="border-b py-2">{expense.title}</p>
                <p className="border-b py-2">{String(expense.amount)}</p>
                <p className="border-b py-2">{expense.category}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default ExpensesList;
