import { ObjectId } from "bson";

export type Expense = {
  _id?: ObjectId;
  title: String;
  amount: Number;
  category: string;
  date?: string;
};
