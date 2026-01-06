"use client";
import React, { useState } from "react";
import IconSearch from "../icons/search";
import IconButton from "../icon-button";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] =
    useState("");

  const router = useRouter();

  const handleSearchTermChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearch = (
    e?: React.MouseEvent
  ) => {
    e !== undefined &&
      e.preventDefault();
    if (!searchTerm) return;
    router.push(
      `/search?query=${searchTerm}`
    );
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        value={searchTerm}
        onChange={
          handleSearchTermChange
        }
        onKeyDown={(e) => {
          const { key } = e;
          if (key === "Enter") {
            handleSearch();
          }
        }}
        type="text"
        placeholder="Search..."
        className="w-full p-2 pl-4 pr-10 text-black bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
      <IconButton
        onClick={handleSearch}
      >
        <IconSearch className="absolute w-6 h-6 text-gray-500 right-3 top-1/2 transform -translate-y-1/2" />
      </IconButton>
    </div>
  );
};

export default SearchInput;
