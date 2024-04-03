"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { withDatabaseOperation } from "./mongo";
import { MongoClient } from "mongodb";

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
  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const createExpenseRes = await db
      .collection("Expense")
      .insertOne({ title, amount, category, date });
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
