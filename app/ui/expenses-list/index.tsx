"use client";

import { Expense } from "@/app/lib/types";
import { Dialog, Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import DeleteExpenseModal from "../delete-expense-modal";
import { ObjectId } from "mongodb";

function ExpensesList({
  className,
  expensesDate,
  expenses = [],
  monthTotal = 0,
}: {
  className: string;
  expensesDate: string;
  expenses: Expense[];
  monthTotal: Number;
}) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const date = new Date(expensesDate).toDateString();
  const totalExpense = expenses.reduce(
    (acc, curr: any) => acc + curr.amount,
    0
  );
  const deleteExpenseRef = useRef<string | undefined>("");

  const calculateDate = (swipe: string) => {
    let thisDate = new Date(date);
    let prevDate = null;

    switch (swipe) {
      case "left": {
        prevDate = new Date(thisDate.setDate(thisDate.getDate() + 1))
          .toDateString()
          .replaceAll(" ", "-")
          .toLowerCase();
        return prevDate;
      }
      case "right": {
        prevDate = new Date(thisDate.setDate(thisDate.getDate() - 1))
          .toDateString()
          .replaceAll(" ", "-")
          .toLowerCase();
        return prevDate;
      }
      default: {
        return date;
      }
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const dateString = calculateDate("left");
      router.push(`/expenses/${dateString}`);
    },
    onSwipedRight: () => {
      const dateString = calculateDate("right");
      router.push(`/expenses/${dateString}`);
    },
    trackMouse: true,
  });

  const openDeleteModal = (e: React.MouseEvent, id: string | undefined) => {
    e.stopPropagation();
    if (!deleteExpenseRef.current) deleteExpenseRef.current = id;
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    deleteExpenseRef.current = "";
    setShowModal(false);
  };

  return (
    <div className={`${className} flex flex-col h-screen`} {...swipeHandlers}>
      <div className="flex flex-row justify-between rounded-lg px-4 py-2 bg-gray-100">
        <h2 className="text-lg font-medium">Expenses For {date}</h2>
        <Link href={`/expenses/${expensesDate}/new`}>
          <PlusCircleIcon color="gray" width={24} height={24} />
        </Link>
      </div>
      {expenses.map((expense: Expense, idx) => (
        <Disclosure key={String(expense._id)}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 mt-2 px-4 py-2 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <div className="flex flex-row justify-between w-full text-left text-sm font-medium text-purple-900">
                  <p>
                    {expense.title} - {String(expense.amount)}
                  </p>
                  <div className="flex flex-row gap-x-2 mr-2">
                    <PencilSquareIcon className="h-5 w-5 text-purple-400" />
                    <TrashIcon
                      className="h-5 w-5 text-purple-400"
                      onClick={(e) =>
                        openDeleteModal(e, expense._id?.toString())
                      }
                    />
                  </div>
                </div>
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
      <div className="flex flex-row justify-between rounded-lg mt-2 px-4 py-2 font-medium bg-gray-100">
        <h3>Total</h3>
        <h3>{totalExpense}</h3>
      </div>
      <div className="flex flex-row justify-between rounded-lg mt-2 px-4 py-2 font-medium bg-gray-100">
        <h3>Month Total</h3>
        <h3>{monthTotal.toString()}</h3>
      </div>
      <DeleteExpenseModal
        isOpen={showModal}
        onCloseModal={closeDeleteModal}
        expenseId={deleteExpenseRef.current}
        expenseDate={date}
      />
    </div>
  );
}

export default ExpensesList;
