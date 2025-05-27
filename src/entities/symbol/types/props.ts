import type { Symbol } from "./symbol";

export interface SymbolIdProps {
  symbol: Symbol["symbol"];
  fontSize?: string;
}

export interface SymbolNameProps {
  name: Symbol["name"];
  fontSize?: string;
}
