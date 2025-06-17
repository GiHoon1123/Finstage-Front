import { create } from "zustand";
import type { SymbolContentListState } from "../types";

export const useSymbolContentListStore = create<SymbolContentListState>(
  (set) => ({
    symbolContentList: [],
    setSymbolContentList: (contents) => set({ symbolContentList: contents }),
    // clearSymbolContentList: () => set({ symbolContentList: [] }),
  }),
);
