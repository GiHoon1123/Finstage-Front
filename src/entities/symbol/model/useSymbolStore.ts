import { create } from "zustand";
import type { SymbolState } from "../types";

export const useSymbolStore = create<SymbolState>((set) => ({
  symbol: {
    symbol: "",
    name: "",
    lastsale: "",
    netchange: "",
    pctchange: "",
    volume: "",
    marketCap: "",
    country: "",
    ipoyear: "",
    industry: "",
    sector: "",
    url: "",
  },
  setSymbol: (symbol) => set({ symbol: symbol }),
  // clearSymbolList: () => set({ symbolList: [] }),
}));
