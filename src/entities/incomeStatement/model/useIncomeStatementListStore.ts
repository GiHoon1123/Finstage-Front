import { create } from "zustand";
import type { IncomeStatementListState } from "../types";

export const useIncomeStatementListStore = create<IncomeStatementListState>(
  (set) => ({
    incomeStatementList: null,
    setIncomeStatementList: (incomeList) =>
      set({ incomeStatementList: incomeList }),
    clearIncomeStatementList: () => set({ incomeStatementList: null }),
  }),
);
