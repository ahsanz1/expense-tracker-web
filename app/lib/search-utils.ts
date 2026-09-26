export function parseCategoryParams(
  raw: string | string[] | undefined
): string[] {
  if (raw == null) return [];
  const values = Array.isArray(raw) ? raw : [raw];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    for (const part of value.split(",")) {
      const name = part.trim();
      if (!name || seen.has(name)) continue;
      seen.add(name);
      out.push(name);
    }
  }
  return out;
}

export function serializeCategoriesParam(categories: string[]): string {
  return categories.map((c) => c.trim()).filter(Boolean).join(",");
}

export function buildSearchParamsKey(params: {
  query: string;
  startDate: string;
  endDate: string;
  categories: string[];
  source: string;
  page: number;
}) {
  return [
    params.query,
    params.startDate,
    params.endDate,
    [...params.categories].sort().join(","),
    params.source,
    String(params.page),
  ].join("|");
}

export function appendSearchParams(
  params: URLSearchParams,
  record: Record<string, string | string[] | undefined>
) {
  Object.entries(record).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) params.append(key, item);
      });
    } else if (value != null && value !== "") {
      params.set(key, value);
    }
  });
}
