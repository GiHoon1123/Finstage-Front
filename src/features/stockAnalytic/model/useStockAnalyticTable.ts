import { useState } from "react";
import { useIncomeStatementListStore } from "@/entities/incomeStatement";
import { groupByViewMode } from "../lib/groupedIncomeStatement";
import { getSortedKeys } from "../lib/sortedColumns";
import { useIncomeStatementRows } from "../lib/incomeStatementRows";
import type { ViewMode, SortOrder } from "../types";

export function useStockAnalyticTable() {
  const { incomeStatementList } = useIncomeStatementListStore();
  const [viewMode, setViewMode] = useState<ViewMode>("annual");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const grouped = groupByViewMode(incomeStatementList, viewMode);
  const columns = getSortedKeys(grouped, sortOrder);
  const rows = useIncomeStatementRows();

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
