import {
  IncomeStatement,
  useIncomeStatementListStore,
} from "@/entities/incomeStatement";

export default async function fetchIncomeStatementListToStore(
  symbol: IncomeStatement["symbol"],
): Promise<boolean> {
  const { setIncomeStatementList } = useIncomeStatementListStore.getState();

  try {
    const res = await fetch(`http://localhost:4000/api/income/${symbol}`);
    const data: IncomeStatement[] = await res.json();
    console.log("[DEBUG] income list response:", data);

    setIncomeStatementList(data);
    return true;
  } catch (e) {
    console.error("Failed to fetch income statements", e);
    return false;
  }
}
