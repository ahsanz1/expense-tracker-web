"use client";

import { buildSearchParamsKey } from "@/app/lib/search-utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useSearchNav } from "../search-nav-context";
import { SearchPageSkeleton } from "../skeletons";

function readUrlKey(searchParams: URLSearchParams) {
  const query = (searchParams.get("query") ?? "").trim();
  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";
  const category = searchParams.get("category") ?? "";
  const source = searchParams.get("source") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  return buildSearchParamsKey({ query, startDate, endDate, category, source, page });
}

export default function SearchPageShell({
  serverKey,
  hasQuery = true,
  children,
}: {
  serverKey: string;
  hasQuery?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSearchPending, endSearchNavigation } = useSearchNav();
  const urlKey = readUrlKey(searchParams);
  const queryInUrl = (searchParams.get("query") ?? "").trim();
  const skeletonHasQuery = queryInUrl.length > 0 || hasQuery;
  const isStale = urlKey !== serverKey;
  const refreshAttempted = useRef<string | null>(null);

  useEffect(() => {
    if (!isStale) {
      endSearchNavigation();
      refreshAttempted.current = null;
      return;
    }
    if (refreshAttempted.current === urlKey) return;
    refreshAttempted.current = urlKey;
    router.refresh();
  }, [isStale, urlKey, serverKey, endSearchNavigation, router]);

  const showLoading = isSearchPending || isStale;

  if (showLoading) {
    return <SearchPageSkeleton hasQuery={skeletonHasQuery} />;
  }

  return <>{children}</>;
}
