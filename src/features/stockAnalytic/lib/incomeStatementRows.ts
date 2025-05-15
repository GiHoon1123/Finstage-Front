import type { IncomeStatement } from "@/entities/incomeStatement";
import type { NumericField } from "../types";

// 계산 함수들 (순수 함수)
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

// 최종 행 정의 반환
export const useIncomeStatementRows = () => {
  return [
    {
      label: "매출액",
      getValue: (list: IncomeStatement[]) => calcSum(list, "revenue"),
    },
    {
      label: "매출원가",
      getValue: (list: IncomeStatement[]) => calcSum(list, "cost_of_revenue"),
    },
    {
      label: "매출총이익",
      getValue: (list: IncomeStatement[]) => calcSum(list, "gross_profit"),
    },
    {
      label: "영업이익",
      getValue: (list: IncomeStatement[]) => calcSum(list, "operating_income"),
    },
    {
      label: "영업이익률",
      getValue: (list: IncomeStatement[]) =>
        calcRatio(calcSum(list, "operating_income"), calcSum(list, "revenue")),
    },
    {
      label: "순이익",
      getValue: (list: IncomeStatement[]) => calcSum(list, "net_income"),
    },
    {
      label: "순이익률",
      getValue: (list: IncomeStatement[]) =>
        calcRatio(calcSum(list, "net_income"), calcSum(list, "revenue")),
    },
    {
      label: "주당순이익(EPS)",
      getValue: (list: IncomeStatement[]) => calcEPS(list),
    },
  ];
};
