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
    <div className={`${className} flex flex-col`} {...swipeHandlers}>
      <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-black">Expenses For {date}</h2>
        <Link 
          href={`/expenses/${expensesDate}/new`}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <PlusCircleIcon className="h-6 w-6 text-black" />
        </Link>
      </div>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No expenses for this date</p>
        </div>
      ) : (
        <>
          {expenses.map((expense: Expense, idx) => (
            <Disclosure key={String(expense._id)}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg border border-gray-200 mt-2 px-4 py-3 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition-colors">
                    <div className="flex flex-row justify-between w-full text-left text-sm font-medium text-black">
                      <p>
                        {expense.title} - PKR {String(expense.amount)}
                      </p>
                      <div className="flex flex-row gap-x-2 mr-2">
                        <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                        <TrashIcon
                          className="h-5 w-5 text-gray-600 hover:text-red-600 transition-colors"
                          onClick={(e) =>
                            openDeleteModal(e, expense._id?.toString())
                          }
                        />
                      </div>
                    </div>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-gray-600 transition-transform`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-3 pt-2 text-sm text-gray-600 border-l border-r border-b border-gray-200 rounded-b-lg">
                    <p className="border-b border-gray-100 py-2"><span className="font-medium">Title:</span> {expense.title}</p>
                    <p className="border-b border-gray-100 py-2"><span className="font-medium">Amount:</span> PKR {String(expense.amount)}</p>
                    <p className="py-2"><span className="font-medium">Category:</span> {expense.category}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
          
          <div className="mt-4 space-y-2">
            <div className="flex flex-row justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
              <h3 className="font-semibold text-black">Daily Total</h3>
              <h3 className="font-semibold text-black">PKR {totalExpense}</h3>
            </div>
            <div className="flex flex-row justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
              <h3 className="font-semibold text-black">Month Total</h3>
              <h3 className="font-semibold text-black">PKR {monthTotal.toString()}</h3>
            </div>
          </div>
        </>
      )}
      
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
