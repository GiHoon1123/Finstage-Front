import { IncomeStatement } from "../types";

export interface IncomeStatementState {
  currentIncomeStatement: IncomeStatement | null;
  setIncomeStatement: (income: IncomeStatement) => void;
  clearIncomeStatement: () => void;
}

export interface IncomeStatementListState {
  incomeStatementList: IncomeStatement[];
  setIncomeStatementList: (incomeList: IncomeStatement[]) => void;
  clearIncomeStatementList: () => void;
}
