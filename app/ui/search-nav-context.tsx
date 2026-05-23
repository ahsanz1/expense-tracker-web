"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

type SearchNavContextValue = {
  isSearchPending: boolean;
  beginSearchNavigation: () => void;
  endSearchNavigation: () => void;
};

const SearchNavContext = createContext<SearchNavContextValue | null>(null);

export function SearchNavProvider({ children }: { children: React.ReactNode }) {
  const [isSearchPending, setIsSearchPending] = useState(false);

  const beginSearchNavigation = useCallback(() => {
    setIsSearchPending(true);
  }, []);

  const endSearchNavigation = useCallback(() => {
    setIsSearchPending(false);
  }, []);

  return (
    <SearchNavContext.Provider
      value={{ isSearchPending, beginSearchNavigation, endSearchNavigation }}
    >
      {children}
    </SearchNavContext.Provider>
  );
}

export function useSearchNav() {
  const ctx = useContext(SearchNavContext);
  if (!ctx) {
    throw new Error("useSearchNav must be used within SearchNavProvider");
  }
  return ctx;
}
