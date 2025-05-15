import { IncomeStatement } from "@/entities/incomeStatement";

export const useIncomeStatementRows = () => {
  return [
    {
      label: "매출액",
      getValue: (list: IncomeStatement[]) =>
        list.reduce((sum, d) => sum + d.revenue, 0),
    },
    {
      label: "매출원가",
      getValue: (list: IncomeStatement[]) =>
        list.reduce((sum, d) => sum + d.cost_of_revenue, 0),
    },
    {
      label: "매출총이익",
      getValue: (list: IncomeStatement[]) =>
        list.reduce((sum, d) => sum + d.gross_profit, 0),
    },
    {
      label: "영업이익",
      getValue: (list: IncomeStatement[]) =>
        list.reduce((sum, d) => sum + d.operating_income, 0),
    },
    {
      label: "영업이익률",
      getValue: (list: IncomeStatement[]) => {
        const rev = list.reduce((sum, d) => sum + d.revenue, 0);
        const op = list.reduce((sum, d) => sum + d.operating_income, 0);
        return rev ? ((op / rev) * 100).toFixed(1) + "%" : "-";
      },
    },
    {
      label: "순이익",
      getValue: (list: IncomeStatement[]) =>
        list.reduce((sum, d) => sum + d.net_income, 0),
    },
    {
      label: "순이익률",
      getValue: (list: IncomeStatement[]) => {
        const rev = list.reduce((sum, d) => sum + d.revenue, 0);
        const net = list.reduce((sum, d) => sum + d.net_income, 0);
        return rev ? ((net / rev) * 100).toFixed(1) + "%" : "-";
      },
    },
    {
      label: "주당순이익(EPS)",
      getValue: (list: IncomeStatement[]) => {
        const total = list.reduce((sum, d) => sum + d.eps, 0);
        return (total / list.length).toFixed(2);
      },
    },
  ];
};
