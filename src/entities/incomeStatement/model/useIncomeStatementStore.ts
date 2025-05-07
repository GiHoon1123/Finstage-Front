import { create } from "zustand";
import type { IncomeStatementState } from "../types";

export const useIncomeStatementStore = create<IncomeStatementState>((set) => ({
  incomeStatement: null,
  setIncomeStatement: (income) => set({ incomeStatement: income }),
  clearIncomeStatement: () => set({ incomeStatement: null }),
}));
