"use client";

import {
  IncomeStatement,
  useIncomeStatementListStore,
} from "@/entities/incomeStatement";
import React, { useState } from "react";

type ViewMode = "annual" | "quarterly" | "monthly";
type SortOrder = "desc" | "asc";

export default function IncomeStatementTable() {
  const { incomeStatementList } = useIncomeStatementListStore();
  const [viewMode, setViewMode] = useState<ViewMode>("annual");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  if (incomeStatementList.length === 0)
    return <p className="no-data">데이터가 없습니다.</p>;

  const grouped = incomeStatementList.reduce((acc, item) => {
    const [year, month] = item.date.split("-");
    const monthNum = parseInt(month);
    const quarter = Math.floor((monthNum - 1) / 3) + 1;
    const quarterEndMonth = quarter * 3;

    const key =
      viewMode === "annual"
        ? year
        : viewMode === "quarterly"
        ? `${year}년 ${quarter}분기 (${quarterEndMonth}월)`
        : `${year}년 ${monthNum}월`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, IncomeStatement[]>);

  const columns = Object.keys(grouped).sort((a, b) => {
    const getDateKey = (label: string): string => {
      if (viewMode === "annual") {
        return `${label}-12-31`;
      }
      if (viewMode === "quarterly") {
        const match = label.match(/(\d{4})년 (\d)분기/);
        if (match) {
          const year = match[1];
          const quarter = parseInt(match[2], 10);
          const month = quarter * 3;
          return `${year}-${String(month).padStart(2, "0")}-01`;
        }
      }
      if (viewMode === "monthly") {
        const match = label.match(/(\d{4})년 (\d{1,2})월/);
        if (match) {
          const year = match[1];
          const month = match[2].padStart(2, "0");
          return `${year}-${month}-01`;
        }
      }
      return label;
    };

    return sortOrder === "desc"
      ? getDateKey(b).localeCompare(getDateKey(a))
      : getDateKey(a).localeCompare(getDateKey(b));
  });

  const rows: {
    label: string;
    getValue: (list: IncomeStatement[]) => number | string;
  }[] = [
    {
      label: "매출액",
      getValue: (list) => list.reduce((sum, d) => sum + d.revenue, 0),
    },
    {
      label: "매출원가",
      getValue: (list) => list.reduce((sum, d) => sum + d.cost_of_revenue, 0),
    },
    {
      label: "매출총이익",
      getValue: (list) => list.reduce((sum, d) => sum + d.gross_profit, 0),
    },
    {
      label: "영업이익",
      getValue: (list) => list.reduce((sum, d) => sum + d.operating_income, 0),
    },
    {
      label: "영업이익률",
      getValue: (list) => {
        const rev = list.reduce((sum, d) => sum + d.revenue, 0);
        const op = list.reduce((sum, d) => sum + d.operating_income, 0);
        return rev ? ((op / rev) * 100).toFixed(1) + "%" : "-";
      },
    },
    {
      label: "순이익",
      getValue: (list) => list.reduce((sum, d) => sum + d.net_income, 0),
    },
    {
      label: "순이익률",
      getValue: (list) => {
        const rev = list.reduce((sum, d) => sum + d.revenue, 0);
        const net = list.reduce((sum, d) => sum + d.net_income, 0);
        return rev ? ((net / rev) * 100).toFixed(1) + "%" : "-";
      },
    },
    {
      label: "주당순이익(EPS)",
      getValue: (list) => {
        const total = list.reduce((sum, d) => sum + d.eps, 0);
        return (total / list.length).toFixed(2);
      },
    },
  ];

  return (
    <div>
      <div className="table-header">
        <h1 className="income-title">재무제표</h1>
        <div className="dropdown-group">
          <select
            className="dropdown"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as ViewMode)}
          >
            <option value="monthly">월간</option>
            <option value="quarterly">분기</option>
            <option value="annual">연간</option>
          </select>

          <select
            className="dropdown"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="desc">최신순</option>
            <option value="asc">과거순</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="income-table">
          <thead>
            <tr>
              <th className="sticky-label">항목</th>
              {columns.map((label) => (
                <th key={label} className="year-header">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="sticky-label row-label">{row.label}</td>
                {columns.map((label) => {
                  const list = grouped[label] || [];
                  const raw = row.getValue(list);
                  const num =
                    typeof raw === "string" ? parseFloat(raw) : Number(raw);
                  const isPositive = num > 0;
                  const isNegative = num < 0;

                  return (
                    <td
                      key={label + row.label}
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
