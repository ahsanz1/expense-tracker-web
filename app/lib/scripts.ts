import { updateExpenseAction } from "./actions";
import { fetchAllExpenses } from "./data";
import { Expense } from "./types";

export const addISOdateToEachDocument = async () => {
  const allExpensesTillNow: Expense[] = (await fetchAllExpenses()) || [];
  const expensesWithoutISOdate: Expense[] = allExpensesTillNow.filter(
    (e) => e["isoDate"] === undefined || e["isoDate"] === null
  );

  for (let i = 0; i < expensesWithoutISOdate.length; i++) {
    const updateResult = await updateExpenseAction(
      expensesWithoutISOdate[i]._id,
      "isoDate",
      new Date(expensesWithoutISOdate[i].date || new Date()).toISOString()
    );
    console.log("Update Result: ", i + " ", updateResult);
  }
};
