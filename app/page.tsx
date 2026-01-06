import React from "react";
import ExpenseTrackerCalendar from "./ui/calendar";
import "react-calendar/dist/Calendar.css";

export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black mb-2">Select a Date</h1>
        <p className="text-gray-600">Choose a date to view or add expenses</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <ExpenseTrackerCalendar />
      </div>
    </main>
  );
}
