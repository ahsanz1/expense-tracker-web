import { deleteExpenseAction } from "@/app/lib/actions";
import { Dialog, Transition } from "@headlessui/react";
import { ObjectId } from "mongodb";
import React, { Fragment } from "react";

const DeleteExpenseModal = ({
  isOpen,
  onCloseModal,
  expenseId,
  expenseDate,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  expenseId: string | undefined;
  expenseDate: string;
}) => {
  const handleDeleteAgree = async () => {
    if (expenseId && expenseDate)
      await deleteExpenseAction(expenseId, expenseDate);
    onCloseModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Expense
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this expense?
                    </p>
                  </div>
                  <div className="mt-4 flex flex-row justify-end gap-x-4">
                    <button
                      type="button"
                      className="inline-flex w-24 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onCloseModal}
                    >
                      Cancel{" "}
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-24 justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDeleteAgree}
                    >
                      Yes{" "}
                    </button>
                  </div>{" "}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteExpenseModal;
