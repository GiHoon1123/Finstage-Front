import type { IncomeStatement } from "@/entities/incomeStatement";
import type { ViewMode, SortOrder } from "./index";

export interface StockAnalyticTableBodyProps {
  columns: string[];
  grouped: Record<string, IncomeStatement[]>;
  rows: {
    label: string;
    getValue: (list: IncomeStatement[]) => number | string;
  }[];
}

export interface StockAnalyticTableHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}
