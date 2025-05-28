import { IncomeStatement } from "../types";

// 계산하는 도메인 로직
export function calcSum(
  list: IncomeStatement[],
  field: keyof IncomeStatement,
): number {
  return list.reduce((sum, d) => {
    const value = d[field];
    return typeof value === "number" ? sum + value : sum;
  }, 0);
}

export function calcRatio(numerator: number, denominator: number): string {
  return denominator ? ((numerator / denominator) * 100).toFixed(1) + "%" : "-";
}

export function calcEPS(list: IncomeStatement[]): string {
  const validEPSList = list.filter((item) => typeof item.eps === "number");
  if (validEPSList.length === 0) return "0.00";

  const total = calcSum(validEPSList, "eps");
  return (total / validEPSList.length).toFixed(2);
}
