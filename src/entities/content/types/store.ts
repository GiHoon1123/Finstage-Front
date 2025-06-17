import { Content } from "../types";

export interface ContentListState {
  contentList: Content[];
  setContentList: (contentList: Content[]) => void;
  // clearContentList: () => void;
}

export interface SymbolContentListState {
  symbolContentList: Content[];
  setSymbolContentList: (symbolContentList: Content[]) => void;
  // clearSymbolContentList: () => void;
}
