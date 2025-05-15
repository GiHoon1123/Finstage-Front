import { IncomeStatement } from "@/entities/incomeStatement";
import type { ViewMode, SortOrder } from "./index";

export interface CompanySearchFieldProps {
  query: string;
  setQuery: (q: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSelection: () => void;
}

export interface IncomeTableHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

export interface IncomeTableBodyProps {
  columns: string[];
  grouped: Record<string, IncomeStatement[]>;
  rows: {
    label: string;
    getValue: (list: IncomeStatement[]) => number | string;
  }[];
}
