"use client";

import {
  IncomeStatement,
  useIncomeStatementListStore,
} from "@/entities/incomeStatement";
import React from "react";

export default function IncomeStatementTable() {
  const { incomeStatementList } = useIncomeStatementListStore();

  if (incomeStatementList.length === 0)
    return <p className="no-data">데이터가 없습니다.</p>;

  const grouped = incomeStatementList.reduce((acc, item) => {
    const year = item.date.split("-")[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, IncomeStatement[]>);

  const years = Object.keys(grouped).sort();

  const rows: {
    label: string;
    getValue: (d: IncomeStatement) => number | string;
  }[] = [
    { label: "매출액", getValue: (d) => d.revenue },
    { label: "매출원가", getValue: (d) => d.cost_of_revenue },
    { label: "매출총이익", getValue: (d) => d.gross_profit },
    { label: "영업이익", getValue: (d) => d.operating_income },
    {
      label: "영업이익률",
      getValue: (d) =>
        ((d.operating_income / d.revenue) * 100).toFixed(1) + "%",
    },
    { label: "순이익", getValue: (d) => d.net_income },
    {
      label: "순이익률",
      getValue: (d) => ((d.net_income / d.revenue) * 100).toFixed(1) + "%",
    },
    { label: "주당순이익(EPS)", getValue: (d) => d.eps.toFixed(2) },
  ];

  return (
    <div>
      <h1 className="income-title">재무제표</h1>
      <br />
      <div className="table-wrapper">
        <table className="income-table">
          <thead>
            <tr>
              <th className="sticky-label">항목</th>
              {years.map((year) => (
                <th key={year} className="year-header">
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="sticky-label row-label">{row.label}</td>
                {years.map((year) => {
                  const data = grouped[year]?.[0];
                  const raw = data ? row.getValue(data) : "-";

                  const num =
                    typeof raw === "string" ? parseFloat(raw) : Number(raw);
                  const isPositive = num > 0;
                  const isNegative = num < 0;

                  return (
                    <td
                      key={year + row.label}
                      className={`value-cell ${
                        isPositive
                          ? "positive"
                          : isNegative
                          ? "negative"
                          : "neutral"
                      }`}
                    >
                      {typeof raw === "number" ? raw.toLocaleString() : raw}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
