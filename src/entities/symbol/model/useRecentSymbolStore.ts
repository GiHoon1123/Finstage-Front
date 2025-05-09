import { create } from "zustand";
import type { RecentSymbolState } from "../types";

export const useRecentSymbolStore = create<RecentSymbolState>((set) => ({
  recentSymbols: [],
  addRecentSymbol: (symbol) =>
    set((state) => {
      const next = [symbol, ...state.recentSymbols.filter((s) => s !== symbol)];
      return { recentSymbols: next.slice(0, 5) }; // 최대 5개 저장
    }),
}));
