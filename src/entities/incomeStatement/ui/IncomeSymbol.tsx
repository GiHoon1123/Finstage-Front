import type { IncomeSymbolProps } from "../types";

export default function IncomeSymbol({
  symbol,
  fontSize = "1rem",
}: IncomeSymbolProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{symbol}</span>;
}
