import { Symbol } from "../types";

export interface SymbolListState {
  symbolList: Symbol[];
  setSymbolList: (symbolList: Symbol[]) => void;
  // clearSymbolList: () => void;
}
