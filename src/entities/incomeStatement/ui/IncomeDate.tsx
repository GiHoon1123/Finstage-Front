import type { IncomeDateProps } from "../types";

export default function IncomeDate({
  date,
  fontSize = "1rem",
}: IncomeDateProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{date}</span>;
}
