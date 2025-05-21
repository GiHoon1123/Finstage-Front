import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useIncomeStatementListStore } from "@/entities/incomeStatement";
import { groupByViewMode } from "../lib/groupedIncomeStatement";
import { getSortedKeys } from "../lib/sortedColumns";
import { useIncomeStatementRows } from "../lib/incomeStatementRows";
import type { ViewMode, SortOrder } from "../types";
import fetchIncomeStatementListToStore from "../api/fetchIncomeStatementListToStore";

export function useStockAnalyticTable() {
  const params = useParams();
  const symbol = typeof params.symbol === "string" ? params.symbol : "";

  const { incomeStatementList } = useIncomeStatementListStore();
  const [viewMode, setViewMode] = useState<ViewMode>("annual");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const grouped = groupByViewMode(incomeStatementList, viewMode);
  const columns = getSortedKeys(grouped, sortOrder);
  const rows = useIncomeStatementRows();

  useEffect(() => {
    if (symbol) {
      fetchIncomeStatementListToStore(symbol);
    }
  }, [symbol]);

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
