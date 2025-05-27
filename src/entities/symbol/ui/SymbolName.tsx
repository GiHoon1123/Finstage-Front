import type { SymbolNameProps } from "../types";

export default function SymbolName({
  name,
  fontSize = "14px",
}: SymbolNameProps) {
  return <span style={{ fontSize }}>{name}</span>;
}
