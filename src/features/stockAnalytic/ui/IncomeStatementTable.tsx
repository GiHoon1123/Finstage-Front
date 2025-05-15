"use client";

import React from "react";
import { useIncomeStatementTable } from "../model/useIncomeStatementTable";
import type { ViewMode, SortOrder } from "../types";

export default function IncomeStatementTable() {
  const {
    viewMode,
    setViewMode,
    sortOrder,
    setSortOrder,
    grouped,
    columns,
    rows,
  } = useIncomeStatementTable();

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
