import type { IncomeStatement } from "../types";

export type ViewMode = "annual" | "quarterly" | "monthly";
export type SortOrder = "desc" | "asc";
export type NumericField = Extract<
  keyof IncomeStatement,
  | "revenue"
  | "cost_of_revenue"
  | "gross_profit"
  | "operating_income"
  | "net_income"
  | "eps"
>;
