"use client";
import React, { useState, useTransition } from "react";
import IconSearch from "../icons/search";
import IconButton from "../icon-button";
import { useRouter } from "next/navigation";
import { useSearchNav } from "../search-nav-context";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { beginSearchNavigation, isSearchPending } = useSearchNav();

  const handleSearchTermChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearch = (e?: React.MouseEvent) => {
    e !== undefined && e.preventDefault();
    if (!searchTerm.trim()) return;
    const q = searchTerm.trim();
    beginSearchNavigation();
    startTransition(() => {
      router.push(`/search?query=${encodeURIComponent(q)}&page=1`);
      router.refresh();
    });
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        type="text"
        placeholder="Search..."
        disabled={isPending || isSearchPending}
        className="w-full p-2 pl-4 pr-10 text-black bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-60"
      />
      <IconButton onClick={handleSearch} disabled={isPending || isSearchPending}>
        <IconSearch className="absolute w-6 h-6 text-gray-500 right-3 top-1/2 transform -translate-y-1/2" />
      </IconButton>
    </div>
  );
};

export default SearchInput;
