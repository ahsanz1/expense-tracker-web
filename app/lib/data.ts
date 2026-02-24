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

const SHORT_MONTH_TO_NUM: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

export const fetchExpensesForMonth = async (month: string, year: number | string) => {
  const yearNum = typeof year === "string" ? parseInt(year, 10) : year;
  const monthNum = SHORT_MONTH_TO_NUM[month];
  if (monthNum == null) {
    return [];
  }
  const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));
  const startISO = start.toISOString();
  const endISO = end.toISOString();

  const expenses = await withDatabaseOperation(async function (
    client: MongoClient
  ) {
    const db = client.db("expense-tracker-db");
    const expenses = await (
      await db.collection("Expense").find({
        isoDate: {
          $gte: startISO,
          $lte: endISO,
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

export type SearchExpensesFilters = {
  query: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  source?: string;
  page?: number;
  limit?: number;
};

export const searchExpensesFiltered = async (
  filters: SearchExpensesFilters
): Promise<{ expenses: unknown[]; totalCount: number }> => {
  const { query, startDate, endDate, category, source, page = 1, limit = 10 } = filters;
  const q = (query ?? "").trim();
  if (!q) return { expenses: [], totalCount: 0 };

  const skip = (Math.max(1, page) - 1) * limit;
  const match: Record<string, unknown> = {
    title: { $regex: q, $options: "i" },
  };

  if (startDate || endDate) {
    match.isoDate = {};
    if (startDate) {
      (match.isoDate as Record<string, string>).$gte = new Date(startDate).toISOString();
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);
      (match.isoDate as Record<string, string>).$lte = end.toISOString();
    }
  }
  if (category && category.trim()) {
    match.category = category.trim();
  }
  if (source && source.trim()) {
    if (source.trim() === "Salary") {
      match.$or = [
        { source: "Salary" },
        { source: { $exists: false } },
        { source: null },
      ];
    } else {
      match.source = source.trim();
    }
  }

  const result = await withDatabaseOperation(async function (client: MongoClient) {
    const db = client.db("expense-tracker-db");
    const coll = db.collection("Expense");
    const [expenses, totalCount] = await Promise.all([
      coll.find(match).sort({ isoDate: -1 }).skip(skip).limit(limit).toArray(),
      coll.countDocuments(match),
    ]);
    return { expenses, totalCount };
  });
  return {
    expenses: serializeMongoData(result.expenses),
    totalCount: result.totalCount,
  };
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
