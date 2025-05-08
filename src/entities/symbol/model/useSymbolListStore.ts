import { create } from "zustand";
import type { SymbolListState } from "../types";

export const useSymbolListStore = create<SymbolListState>((set) => ({
  symbolList: null,
  setSymbolList: (symbol) => set({ symbolList: symbol }),
  clearSymbolList: () => set({ symbolList: null }),
}));
