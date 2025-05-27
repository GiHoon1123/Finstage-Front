import type { SymbolNameProps } from "../types";

export default function SymbolName({
  name,
  fontSize = "14px",
}: SymbolNameProps) {
  return (
    <span data-testid="SymbolName" style={{ fontSize }}>
      {name}
    </span>
  );
}
