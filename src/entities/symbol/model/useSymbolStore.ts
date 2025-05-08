import { create } from "zustand";
import type { SymbolState } from "../types";

export const useSymbolStore = create<SymbolState>((set) => ({
  currentSymbol: null,
  setSymbol: (symbol) => set({ currentSymbol: symbol }),
  clearSymbol: () => set({ currentSymbol: null }),
}));
