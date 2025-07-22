import { Symbol } from "../types";

export interface SymbolState {
  symbol: Symbol;
  setSymbol: (symbol: Symbol) => void;
  // clearSymbolList: () => void;
}

export interface SymbolListState {
  symbolList: Symbol[];
  setSymbolList: (symbolList: Symbol[]) => void;
  // clearSymbolList: () => void;
}
