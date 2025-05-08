import type { SymbolNameProps } from "../types";

export default function SymbolName({
  name,
  fontSize = "1rem",
}: SymbolNameProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{name}</span>;
}
