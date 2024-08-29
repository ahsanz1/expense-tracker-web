import { fetchExpensesBetweenDateRange } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startDate, endDate }: any = body;
    const data = await fetchExpensesBetweenDateRange(
      new Date(startDate).toISOString(),
      new Date(endDate).toISOString()
    );
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Error fetching expenses for the selected date range!", { status: 400 });
  }
}
