"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function ExpenseTrackerCalendar() {
  const [value, setValue] = useState<Value>(new Date());

  const router = useRouter();

  const handleDateSelect = (date: Value) => {
    if (!date) return;
    // Handle both single date and date array
    const selectedDate = Array.isArray(date) ? date[0] : date;
    if (!selectedDate || !(selectedDate instanceof Date)) return;
    
    // Update the calendar value
    setValue(selectedDate);
    
    // Format as YYYY-MM-DD which can be parsed by new Date()
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    // Navigate to the expenses page
    router.push(`/expenses/${dateString}`);
  };

  return (
    <Calendar
      onChange={handleDateSelect}
      value={value}
      className={"!w-full"}
    />
  );
}

export default ExpenseTrackerCalendar;
