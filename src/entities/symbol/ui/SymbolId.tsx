import type { SymbolProps } from "../types";

export default function SymbolId({ symbol, fontSize = "1rem" }: SymbolProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{symbol}</span>;
}
