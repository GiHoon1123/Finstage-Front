import type { SymbolIdProps } from "../types";

export default function SymbolID({ symbol, fontSize = "14px" }: SymbolIdProps) {
  return <span style={{ fontSize }}>{symbol}</span>;
}
