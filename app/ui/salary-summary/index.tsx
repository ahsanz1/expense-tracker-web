import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { setMonthlySalaryFormAction } from "@/app/lib/actions";

export default function SalarySummary({
  monthKey,
  totalSalary,
  totalSalaryFormatted,
  totalSpentFormatted,
  salaryRemainingFormatted,
  currentSource,
  isEditing,
  editHref,
  cancelHref,
  showSalaryCards = true,
}: {
  monthKey: string;
  totalSalary: number;
  totalSalaryFormatted: string;
  totalSpentFormatted: string;
  salaryRemainingFormatted: string;
  currentSource: string;
  isEditing: boolean;
  editHref: string;
  cancelHref: string;
  showSalaryCards?: boolean;
}) {
  return (
    <div
      className={`mb-6 grid grid-cols-1 gap-4 ${
        showSalaryCards ? "sm:grid-cols-3" : "sm:grid-cols-1"
      }`}
    >
      {showSalaryCards && (
        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className="text-sm font-medium text-gray-600">Total salary (this month)</p>
            {!isEditing && (
              <Link
                href={editHref}
                className="inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black shrink-0"
                aria-label="Edit total salary"
              >
                <PencilSquareIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
            )}
          </div>

          {isEditing ? (
            <form action={setMonthlySalaryFormAction} className="space-y-2">
              <input type="hidden" name="monthKey" value={monthKey} />
              <input type="hidden" name="source" value={currentSource} />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 shrink-0">PKR</span>
                <input
                  type="number"
                  name="amount"
                  min={1}
                  step={1}
                  defaultValue={totalSalary}
                  required
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-lg font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Total salary amount"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Save
                </button>
                <Link
                  href={cancelHref}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          ) : (
            <p className="text-2xl font-semibold text-black">PKR {totalSalaryFormatted}</p>
          )}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
        <p className="text-sm font-medium text-gray-600 mb-0.5">Total spent (this month)</p>
        <p className="text-2xl font-semibold text-black">PKR {totalSpentFormatted}</p>
      </div>

      {showSalaryCards && (
        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
          <p className="text-sm font-medium text-gray-600 mb-0.5">Salary remaining (this month)</p>
          <p className="text-2xl font-semibold text-black">PKR {salaryRemainingFormatted}</p>
        </div>
      )}
    </div>
  );
}
