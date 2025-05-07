export interface IncomeStatement {
  symbol: string;
  revenue: number;
  gross_profit: number;
  net_income: number;
  cost_of_revenue: number;
  date: string;
  id: number;
  operating_income: number;
  eps: number;
}

export interface IncomeStatementList {
  income_statement: IncomeStatement[];
}
