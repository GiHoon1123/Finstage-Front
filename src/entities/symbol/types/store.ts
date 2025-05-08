import { Symbol } from "../types";

export interface SymbolState {
  currentSymbol: Symbol | null;
  setSymbol: (symbol: Symbol) => void;
  clearSymbol: () => void;
}

export interface SymbolListState {
  symbolList: Symbol[];
  setSymbolList: (symbolList: Symbol[]) => void;
  clearSymbolList: () => void;
}
