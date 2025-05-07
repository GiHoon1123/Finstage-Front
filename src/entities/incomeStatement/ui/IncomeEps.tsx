import type { IncomeEpsProps } from "../types";

export default function IncomeEps({ eps, fontSize = "1rem" }: IncomeEpsProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{eps}</span>;
}
