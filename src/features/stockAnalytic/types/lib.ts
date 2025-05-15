import type { IncomeStatement } from "@/entities/incomeStatement";

export type NumericField = Extract<
  keyof IncomeStatement,
  | "revenue"
  | "cost_of_revenue"
  | "gross_profit"
  | "operating_income"
  | "net_income"
  | "eps"
>;
