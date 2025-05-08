import { create } from "zustand";
import type { IncomeStatementState } from "../types";

export const useIncomeStatementStore = create<IncomeStatementState>((set) => ({
  currentIncomeStatement: null,
  setIncomeStatement: (income) => set({ currentIncomeStatement: income }),
  clearIncomeStatement: () => set({ currentIncomeStatement: null }),
}));
