import { updateExpenseField } from "./actions";
import { fetchAllExpenses } from "./data";
import { Expense } from "./types";

export const addISOdateToEachDocument = async () => {
  const allExpensesTillNow: Expense[] = (await fetchAllExpenses()) || [];
  const expensesWithoutISOdate: Expense[] = allExpensesTillNow.filter(
    (e) => e["isoDate"] === undefined || e["isoDate"] === null
  );

  for (let i = 0; i < expensesWithoutISOdate.length; i++) {
    const updateResult = await updateExpenseField(
      expensesWithoutISOdate[i]._id?.toString() || "",
      "isoDate",
      new Date(expensesWithoutISOdate[i].date || new Date()).toISOString()
    );
    console.log("Update Result: ", i + " ", updateResult);
  }
};
