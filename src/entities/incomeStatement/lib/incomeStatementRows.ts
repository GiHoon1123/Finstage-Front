import type { IncomeStatement } from "../types";
import { calcSum, calcRatio, calcEPS } from "./calculations";

// 내부적으로 도메인 계산을 집계하는 도메인 로직
export const incomeStatementRows = () => {
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
