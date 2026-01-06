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

const MultipleExpensesSchema = z.array(FormSchema);

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

export async function createMultipleExpensesAction(
  expenseDate: string,
  expenses: Array<{ title: string; amount: number; category: string }>
) {
  const validatedExpenses = MultipleExpensesSchema.parse(expenses);
  const date = new Date(expenseDate).toDateString();
  const isoDate = new Date(expenseDate).toISOString();
  
  const expensesToInsert = validatedExpenses.map((expense) => ({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date,
    isoDate,
  }));

  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    if (expensesToInsert.length > 0) {
      const createExpensesRes = await db
        .collection("Expense")
        .insertMany(expensesToInsert);
      console.log(createExpensesRes);
    }
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
    const deleteResult = await db
      .collection("Expense")
      .deleteOne({ _id: new ObjectId(id) });
    return deleteResult;
  });
  revalidatePath(`/expenses/${expenseDate}`);
  return deleteResult;
};

export async function updateExpenseAction(
  expenseId: string,
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
    const updateResult = await db
      .collection("Expense")
      .updateOne(
        { _id: new ObjectId(expenseId) },
        { $set: { title, amount, category, date, isoDate } }
      );
    console.log(updateResult);
  });

  revalidatePath(`/expenses/${expenseDate}`);
  redirect(`/expenses/${expenseDate}`);
}
