export function buildSearchParamsKey(params: {
  query: string;
  startDate: string;
  endDate: string;
  category: string;
  source: string;
  page: number;
}) {
  return [
    params.query,
    params.startDate,
    params.endDate,
    params.category,
    params.source,
    String(params.page),
  ].join("|");
}
