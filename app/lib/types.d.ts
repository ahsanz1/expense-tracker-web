import { ObjectId } from "bson";

export type Expense = {
  _id?: ObjectId | string;
  title: String;
  amount: Number;
  category: string;
  date?: string;
  isoDate?: string
};
