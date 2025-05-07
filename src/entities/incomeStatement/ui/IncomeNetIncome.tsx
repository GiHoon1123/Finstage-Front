import type { IncomeNetIncomeProps } from "../types";

export default function IncomeNetIncome({
  net_income,
  fontSize = "1rem",
}: IncomeNetIncomeProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{net_income}</span>;
}
