import type { IncomeGrossProfitProps } from "../types";

export default function IncomeGrossProfit({
  gross_profit,
  fontSize = "1rem",
}: IncomeGrossProfitProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{gross_profit}</span>;
}
