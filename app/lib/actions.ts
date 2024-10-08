"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { withDatabaseOperation } from "./mongo";
import { MongoClient, ObjectId } from "mongodb";
import { dbCategories } from "./static";

const FormSchema = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  category: z.string(),
});

const CategoryFormSchema = z.object({
  categoryName: z.string(),
});

export async function createExpenseAction(
  expenseDate: string,
  formData: FormData
) {
  const { title, amount, category } = FormSchema.parse({
    title: formData.get("title"),
    amount: formData.get("amount"),
    category: formData.get("category"),
  });
  const date = new Date(expenseDate).toDateString();
  const isoDate = new Date(expenseDate).toISOString();
  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const createExpenseRes = await db
      .collection("Expense")
      .insertOne({ title, amount, category, date, isoDate });
    console.log(createExpenseRes);
  });

  revalidatePath(`/expenses/${expenseDate}`);
  redirect(`/expenses/${expenseDate}`);
}

export async function createCategoryAction(formData: FormData) {
  const { categoryName: name } = CategoryFormSchema.parse({
    categoryName: formData.get("category-name"),
  });

  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const createCategoryRes = await db
      .collection("Category")
      .insertOne({ name });
    console.log(createCategoryRes);
  });

  redirect(`/`);
}

export const createCategoriesFromFile = async () => {
  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const insertCategoriesRes = await db
      .collection("Category")
      .insertMany(dbCategories);
    console.log(insertCategoriesRes);
  });
};

export const deleteExpenseAction = async (id: string, expenseDate: string) => {
  const deleteResult = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const deleteResult = await await db
      .collection("Expense")
      .deleteOne({ _id: new ObjectId(id) });
    return deleteResult;
  });
  revalidatePath(`/expenses/${expenseDate}`);
  return deleteResult;
};

export const updateExpenseAction = async (
  id: string,
  field: string,
  value: string | number
) => {
  const updateResult = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const updateResult = await await db
      .collection("Expense")
      .updateOne({ _id: new ObjectId(id) }, { $set: { [field]: value } });
    return updateResult;
  });
  return updateResult;
};
