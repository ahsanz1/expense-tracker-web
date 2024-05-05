import { Expense } from "./types";

export function sortByDate(arr: Expense[]) {
  return arr.sort((a: any, b: any) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export function sortByKeyName(arr: any, key: string) {
  return arr.slice().sort((a: any, b: any) => {
    return a[key].localeCompare(b[key]);
  });
}
