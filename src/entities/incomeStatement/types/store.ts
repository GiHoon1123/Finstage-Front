import { IncomeStatement, IncomeStatementList } from "../types";

export interface IncomeStatementState {
  incomeStatement: IncomeStatement | null;
  setIncomeStatement: (income: IncomeStatement) => void;
  clearIncomeStatement: () => void;
}

export interface IncomeStatementListState {
  incomeStatementList: IncomeStatementList | null;
  setIncomeStatementList: (incomeList: IncomeStatementList) => void;
  clearIncomeStatementList: () => void;
}
