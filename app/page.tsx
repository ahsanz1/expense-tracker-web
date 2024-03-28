import React from "react";
import ExpenseTrackerCalendar from "./ui/calendar";
import "react-calendar/dist/Calendar.css";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  py-24 px-8">
      <ExpenseTrackerCalendar />
    </main>
  );
}
