import { useState } from "react";
import { useIncomeStatementListStore } from "@/entities/incomeStatement";
import { groupByViewMode } from "./useGroupedIncomeStatement";
import { sortGroupedKeys } from "./useSortedColumns";
import { useIncomeStatementRows } from "./useIncomeStatementRows";
import type { ViewMode, SortOrder } from "../types";

export function useIncomeStatementTable() {
  const { incomeStatementList } = useIncomeStatementListStore();
  const [viewMode, setViewMode] = useState<ViewMode>("annual");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const grouped = groupByViewMode(incomeStatementList, viewMode);
  const columns = sortGroupedKeys(Object.keys(grouped), viewMode, sortOrder);
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
