import { Document, MongoClient, WithId } from "mongodb";
import { withDatabaseOperation } from "./mongo";
import { dbCategories } from "./static";
import { Expense } from "./types";

export const createCategories = async () => {
  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const insertCategoriesRes = await db
      .collection("Category")
      .insertMany(dbCategories);
    console.log(insertCategoriesRes);
  });
};

export const fetchCategories = async () => {
  const categories = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const categories = await (await db.collection("Category").find()).toArray();
    return categories;
  });
  return categories;
};

export const fetchExpenses = async (date: string) => {
  const eDate = new Date(date).toDateString();
  const expenses = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expenses = await (
      await db.collection("Expense").find({ date: eDate })
    ).toArray();
    return expenses;
  });
  return expenses;
};
