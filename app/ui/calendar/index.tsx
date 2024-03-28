"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function ExpenseTrackerCalendar() {
  const [value] = useState<Value>(new Date());

  const router = useRouter();

  const handleDateSelect = (date: Value) => {
    if (!date) return;
    const dateString = new Date(date.toString())
      .toDateString()
      .replaceAll(" ", "-")
      .toLowerCase();
    router.push(`/expenses/${dateString}`);
  };

  return (
    <Calendar
      onChange={(date) => handleDateSelect(date)}
      value={value}
      className={"!w-full"}
    />
  );
}

export default ExpenseTrackerCalendar;
