"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { withDatabaseOperation } from "./mongo";
import { MongoClient, ObjectId } from "mongodb";
import { dbCategories, DEFAULT_EXPENSE_SOURCE } from "./static";

const MonthlySalarySchema = z.object({
  monthKey: z.string().regex(/^\d{4}-\d{1,2}$/),
  amount: z.coerce.number().positive(),
});

const SESSION_COOKIE = "expense_tracker_session";

export async function loginAction(credentials: { email: string; password: string; _nonce?: number }) {
  const email = (credentials.email ?? "").trim();
  const password = credentials.password ?? "";
  const expectedEmail = process.env.AUTH_EMAIL ?? "";
  const expectedPassword = process.env.AUTH_PASSWORD ?? "";
  const secret = process.env.AUTH_SECRET ?? "";

  if (!secret || expectedEmail === "" || expectedPassword === "") {
    return { error: "Auth not configured" };
  }
  if (email !== expectedEmail || password !== expectedPassword) {
    return { error: "Invalid email or password" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}

const FormSchema = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  category: z.string(),
  source: z.string().optional().default(DEFAULT_EXPENSE_SOURCE),
});

const CategoryFormSchema = z.object({
  categoryName: z.string(),
});

const MultipleExpensesSchema = z.array(FormSchema);

export async function createExpenseAction(
  expenseDate: string,
  formData: FormData
) {
  const { title, amount, category, source } = FormSchema.parse({
    title: formData.get("title"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    source: formData.get("source") || undefined,
  });
  const date = new Date(expenseDate).toDateString();
  const isoDate = new Date(expenseDate).toISOString();
  const expenseSource = source || DEFAULT_EXPENSE_SOURCE;
  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const createExpenseRes = await db
      .collection("Expense")
      .insertOne({ title, amount, category, source: expenseSource, date, isoDate });
    console.log(createExpenseRes);
  });

  revalidatePath(`/expenses/${expenseDate}`);
  redirect(`/expenses/${expenseDate}`);
}

export async function createMultipleExpensesAction(
  expenseDate: string,
  expenses: Array<{ title: string; amount: number; category: string; source?: string }>
) {
  const validatedExpenses = MultipleExpensesSchema.parse(expenses);
  const date = new Date(expenseDate).toDateString();
  const isoDate = new Date(expenseDate).toISOString();
  
  const expensesToInsert = validatedExpenses.map((expense) => ({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    source: expense.source || DEFAULT_EXPENSE_SOURCE,
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

function isSafeReturnTo(returnTo: string | null | undefined): boolean {
  if (!returnTo || typeof returnTo !== "string") return false;
  const trimmed = returnTo.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//");
}

export async function updateExpenseAction(
  expenseId: string,
  expenseDate: string,
  formData: FormData
) {
  const { title, amount, category, source } = FormSchema.parse({
    title: formData.get("title"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    source: formData.get("source") || undefined,
  });
  const returnToRaw = formData.get("returnTo")?.toString();
  const safeReturn =
    returnToRaw != null && isSafeReturnTo(returnToRaw) ? returnToRaw.trim() : null;

  const date = new Date(expenseDate).toDateString();
  const isoDate = new Date(expenseDate).toISOString();
  const expenseSource = source || DEFAULT_EXPENSE_SOURCE;

  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const updateResult = await db
      .collection("Expense")
      .updateOne(
        { _id: new ObjectId(expenseId) },
        { $set: { title, amount, category, source: expenseSource, date, isoDate } }
      );
    console.log(updateResult);
  });

  revalidatePath(`/expenses/${expenseDate}`);
  if (safeReturn) revalidatePath(safeReturn);
  redirect(safeReturn ?? `/expenses/${expenseDate}`);
}

export async function setMonthlySalaryAction(monthKey: string, amount: number) {
  const { monthKey: key, amount: salary } = MonthlySalarySchema.parse({ monthKey, amount });

  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    await db.collection("MonthlySalary").updateOne(
      { monthKey: key },
      { $set: { monthKey: key, amount: salary } },
      { upsert: true }
    );
  });

  revalidatePath("/");
  return { success: true as const };
}

export async function setMonthlySalaryFormAction(formData: FormData) {
  const monthKey = formData.get("monthKey")?.toString() ?? "";
  const amountRaw = formData.get("amount");
  const source = formData.get("source")?.toString() ?? "Salary";
  const { monthKey: key, amount: salary } = MonthlySalarySchema.parse({
    monthKey,
    amount: amountRaw,
  });

  await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    await db.collection("MonthlySalary").updateOne(
      { monthKey: key },
      { $set: { monthKey: key, amount: salary } },
      { upsert: true }
    );
  });

  revalidatePath("/");

  const params = new URLSearchParams();
  params.set("month", key);
  if (source !== "Salary") params.set("source", source);
  redirect(`/?${params.toString()}`);
}

// Helper function for updating a single field in an expense (used by scripts)
export async function updateExpenseField(
  id: string,
  field: string,
  value: string | number
) {
  const updateResult = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const updateResult = await db
      .collection("Expense")
      .updateOne({ _id: new ObjectId(id) }, { $set: { [field]: value } });
    return updateResult;
  });
  return updateResult;
}
