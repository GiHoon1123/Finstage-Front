import type { SymbolIdProps } from "../types";

export default function SymbolID({ symbol, fontSize = "14px" }: SymbolIdProps) {
  return (
    <span data-testid="SymbolID" style={{ fontSize }}>
      {symbol}
    </span>
  );
}
