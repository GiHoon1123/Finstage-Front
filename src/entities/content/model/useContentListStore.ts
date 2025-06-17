import { create } from "zustand";
import type { ContentListState } from "../types";

export const useContentListStore = create<ContentListState>((set) => ({
  contentList: [],
  setContentList: (contents) => set({ contentList: contents }),
  // clearContentList: () => set({ contentList: [] }),
}));
