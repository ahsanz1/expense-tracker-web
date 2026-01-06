import { MongoClient, ObjectId } from "mongodb";
import { withDatabaseOperation } from "./mongo";

/**
 * Converts MongoDB documents to plain JavaScript objects
 * by converting ObjectId instances to strings
 */
function serializeMongoData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (data instanceof ObjectId) {
    return data.toString() as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => serializeMongoData(item)) as unknown as T;
  }

  if (typeof data === "object" && data.constructor === Object) {
    const serialized: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        serialized[key] = serializeMongoData((data as any)[key]);
      }
    }
    return serialized as T;
  }

  return data;
}

export const fetchCategories = async () => {
  const categories = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const categories = await (await db.collection("Category").find()).toArray();
    return categories;
  });
  return serializeMongoData(categories);
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
  return serializeMongoData(expenses);
};

export const fetchAllExpenses = async () => {
  const expenses = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expenses = await (await db.collection("Expense").find()).toArray();
    return expenses;
  });
  return serializeMongoData(expenses);
};

export const fetchExpensesForMonth = async (month: string) => {
  const expenses = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expenses = await (
      await db.collection("Expense").find({
        date: {
          $regex: month,
          $options: "i",
        },
      })
    ).toArray();
    return expenses;
  });
  return serializeMongoData(expenses);
};

export const fetchExpensesBetweenDateRange = async (
  startDate: string,
  endDate: string
) => {
  const expenses = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expenses = await (
      await db.collection("Expense").find({
        isoDate: {
          $gte: startDate,
          $lte: endDate,
        },
      })
    ).toArray();
    return expenses;
  });
  return serializeMongoData(expenses);
};

export const searchExpenses = async (searchTerm: string) => {
  const expenses = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expenses = await (
      await db.collection("Expense").find({
        $or: [
          {
            title: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            category: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        ],
      })
    ).toArray();
    return expenses;
  });
  return serializeMongoData(expenses);
};

export const fetchExpenseById = async (id: string) => {
  const expense = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expense = await db.collection("Expense").findOne({
      _id: new ObjectId(id),
    });
    return expense;
  });
  return serializeMongoData(expense);
};
