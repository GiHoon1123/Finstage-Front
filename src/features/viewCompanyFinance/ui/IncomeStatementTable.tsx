"use client";

import {
  IncomeStatement,
  useIncomeStatementListStore,
} from "@/entities/incomeStatement";
import React from "react";

export default function IncomeStatementTable() {
  const { incomeStatementList } = useIncomeStatementListStore();

  if (incomeStatementList.length === 0) return <p>No data available.</p>;

  // 연도별로 그룹핑
  const grouped = incomeStatementList.reduce((acc, item) => {
    const year = item.date.split("-")[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, IncomeStatement[]>);

  return (
    <table className="w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Revenue</th>
          <th className="border p-2">Cost of Revenue</th>
          <th className="border p-2">Gross Profit</th>
          <th className="border p-2">Operating Margin</th>
          <th className="border p-2">Net Margin</th>
          <th className="border p-2">EPS</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([year, rows]) => (
          <React.Fragment key={year}>
            <tr className="bg-gray-100">
              <td colSpan={7} className="text-left px-2 py-1 font-bold text-sm">
                📅 {year}
              </td>
            </tr>
            {rows.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="border p-2">{s.date}</td>
                <td className="border p-2 text-right">
                  {s.revenue.toLocaleString()}
                </td>
                <td className="border p-2 text-right">
                  {s.cost_of_revenue.toLocaleString()}
                </td>
                <td className="border p-2 text-right">
                  {s.gross_profit.toLocaleString()}
                </td>
                <td
                  className={`border p-2 text-right ${
                    s.operating_income > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {((s.operating_income / s.revenue) * 100).toFixed(1)}%
                </td>
                <td
                  className={`border p-2 text-right ${
                    s.net_income > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {((s.net_income / s.revenue) * 100).toFixed(1)}%
                </td>
                <td className="border p-2 text-gray-500 text-xs text-right">
                  {s.eps.toFixed(2)}
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
