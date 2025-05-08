import { IncomeStatement } from "@/entities/incomeStatement";

export async function fetchCompanyFinance(
  symbol: string,
): Promise<IncomeStatement[]> {
  const res = await fetch(`/api/stocks/${symbol}/finance`);
  if (!res.ok) throw new Error("Failed to fetch income statements");
  return res.json();
}
