import { IncomeStatement, NumericField } from "../types";

// 계산하는 도메인 로직
export function calcSum(list: IncomeStatement[], field: NumericField): number {
  return list.reduce((sum, d) => sum + (d[field] as number), 0);
}

export function calcRatio(numerator: number, denominator: number): string {
  return denominator ? ((numerator / denominator) * 100).toFixed(1) + "%" : "-";
}

export function calcEPS(list: IncomeStatement[]): string {
  const total = calcSum(list, "eps");
  return (total / list.length).toFixed(2);
}
