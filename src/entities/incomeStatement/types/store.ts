import { IncomeStatement } from "../types";

export interface IncomeStatementListState {
  incomeStatementList: IncomeStatement[];
  setIncomeStatementList: (incomeList: IncomeStatement[]) => void;
  clearIncomeStatementList: () => void;
}
