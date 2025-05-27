import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useIncomeStatementListStore,
  fetchIncomeStatementListToStore,
  incomeStatementRows,
  groupByViewMode,
  sortedColumns,
} from "@/entities/incomeStatement";
import type { ViewMode, SortOrder } from "@/entities/incomeStatement";

export function useStockAnalyticTable() {
  const params = useParams();
  const symbol = typeof params.symbol === "string" ? params.symbol : "";
  const [isLoading, setIsLoading] = useState(false);

  const { incomeStatementList } = useIncomeStatementListStore();
  const [viewMode, setViewMode] = useState<ViewMode>("annual");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const grouped = groupByViewMode(incomeStatementList, viewMode);
  const columns = sortedColumns(grouped, sortOrder);
  const rows = incomeStatementRows();

  useEffect(() => {
    if (!symbol || isLoading) return;

    const fetchData = async () => {
      setIsLoading(true);
      await fetchIncomeStatementListToStore(symbol);
      setIsLoading(false);
    };

    if (incomeStatementList[0]?.symbol !== symbol) {
      fetchData();
    }
  }, [symbol, incomeStatementList, isLoading]);

  return {
    viewMode,
    setViewMode,
    sortOrder,
    setSortOrder,
    grouped,
    columns,
    rows,
  };
}
