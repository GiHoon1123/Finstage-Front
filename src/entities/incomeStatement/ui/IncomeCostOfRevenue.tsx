import type { IncomeCostOfRevenueProps } from "../types";

export default function IncomeCostOfRevenue({
  cost_of_revenue,
  fontSize = "1rem",
}: IncomeCostOfRevenueProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{cost_of_revenue}</span>;
}
