import type { IncomeOperatingProps } from "../types";

export default function IncomeOperating({
  operating_income,
  fontSize = "1rem",
}: IncomeOperatingProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{operating_income}</span>;
}
