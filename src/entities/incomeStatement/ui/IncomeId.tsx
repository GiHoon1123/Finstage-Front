import type { IncomeIDProps } from "../types";

export default function IncomeId({ id, fontSize = "1rem" }: IncomeIDProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{id}</span>;
}
