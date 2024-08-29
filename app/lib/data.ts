import { MongoClient } from "mongodb";
import { withDatabaseOperation } from "./mongo";

export const fetchCategories = async () => {
  const categories = await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const categories = await (await db.collection("Category").find()).toArray();
    return categories;
  });
  return categories;
};

export const fetchExpenses = async (date: string) => {
  const eDate = new Date(date).toDateString();
  const expenses = await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const expenses = await (await db.collection("Expense").find({ date: eDate })).toArray();
    return expenses;
  });
  return expenses;
};

export const fetchExpensesForMonth = async (month: string) => {
  const expenses = await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const expenses = await (await db.collection("Expense").find({ date: { $regex: month, $options: "i" } })).toArray();
    return expenses;
  });
  return expenses;
};

export const fetchExpensesBetweenDateRange = async (startDate: string, endDate: string) => {
  const expenses = await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const expenses = await (
      await db.collection("Expense").find({ isoDate: { $gte: startDate, $lte: endDate } })
    ).toArray();
    return expenses;
  });
  return expenses;
};
