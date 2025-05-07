import { IncomeStatement } from "../types";

export interface IncomeSymbolProps {
  symbol: IncomeStatement["symbol"];
  fontSize?: string;
}

export interface IncomeRevenueProps {
  revenue: IncomeStatement["revenue"];
  fontSize?: string;
}

export interface IncomeGrossProfitProps {
  gross_profit: IncomeStatement["gross_profit"];
  fontSize?: string;
}

export interface IncomeNetIncomeProps {
  net_income: IncomeStatement["net_income"];
  fontSize?: string;
}

export interface IncomeCostOfRevenueProps {
  cost_of_revenue: IncomeStatement["cost_of_revenue"];
  fontSize?: string;
}

export interface IncomeDateProps {
  date: IncomeStatement["date"];
  fontSize?: string;
}

export interface IncomeIDProps {
  id: IncomeStatement["id"];
  fontSize?: string;
}

export interface IncomeOperatingProps {
  operating_income: IncomeStatement["operating_income"];
  fontSize?: string;
}

export interface IncomeEpsProps {
  eps: IncomeStatement["eps"];
  fontSize?: string;
}
