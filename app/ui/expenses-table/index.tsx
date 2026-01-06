"use client";
import { Expense } from "@/app/lib/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteExpenseModal from "../delete-expense-modal";
import Link from "next/link";

function ExpensesTable({
  className,
  expensesDate,
  expenses,
  monthTotal,
}: {
  className: string;
  expensesDate: string;
  expenses: Expense[];
  monthTotal: Number;
}) {
  const [showModal, setShowModal] = useState(false);
  const deleteExpenseRef = useRef<string | undefined>("");
  const router = useRouter();
  const date = new Date(expensesDate).toDateString();
  const totalExpense = expenses.reduce(
    (acc, curr: any) => acc + curr.amount,
    0
  );

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
    <div className={className}>
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">Expenses For {date}</h2>
        <Link
          href={`/expenses/${expensesDate}/new`}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Add Expense
        </Link>
      </div>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No expenses for this date</p>
        </div>
      ) : (
        <>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense: Expense, index) => (
                  <tr key={String(expense._id)} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      PKR {String(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex flex-row justify-center gap-x-3">
                        <Link
                          href={`/expenses/${expensesDate}/${expense._id}/edit`}
                          className="text-gray-600 hover:text-black transition-colors"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-gray-600 hover:text-red-600 transition-colors"
                          onClick={(e) => openDeleteModal(e, expense._id?.toString())}
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Daily Total</p>
              <p className="text-2xl font-semibold text-black">PKR {totalExpense}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Month Total</p>
              <p className="text-2xl font-semibold text-black">PKR {monthTotal.toString()}</p>
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

export default ExpensesTable;
