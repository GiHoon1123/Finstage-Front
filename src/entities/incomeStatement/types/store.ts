import { IncomeStatement } from "../types";

export interface IncomeStatementState {
  incomeStatement: IncomeStatement | null;
  setIncomeStatement: (income: IncomeStatement) => void;
  clearIncomeStatement: () => void;
}

export interface IncomeStatementListState {
  incomeStatementList: IncomeStatement[] | null;
  setIncomeStatementList: (incomeList: IncomeStatement[]) => void;
  clearIncomeStatementList: () => void;
}
