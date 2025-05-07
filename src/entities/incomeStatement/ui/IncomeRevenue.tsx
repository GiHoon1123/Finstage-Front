import type { IncomeRevenueProps } from "../types";

export default function IncomeRevenue({
  revenue,
  fontSize = "1rem",
}: IncomeRevenueProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{revenue}</span>;
}
