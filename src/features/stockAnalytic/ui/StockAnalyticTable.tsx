"use client";

import React from "react";
import { useStockAnalyticTable } from "../model/useStockAnalyticTable";
import StockAnalyticTableHeader from "./StockAnalyticTableHeader";
import StockAnalyticTableBody from "./StockAnalyticTableBody";

export default function StockAnalyticTable() {
  const {
    viewMode,
    setViewMode,
    sortOrder,
    setSortOrder,
    grouped,
    columns,
    rows,
  } = useStockAnalyticTable();

  return (
    <div>
      <div className="table-header">
        <h1 className="income-title">재무제표</h1>
        <StockAnalyticTableHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <StockAnalyticTableBody columns={columns} grouped={grouped} rows={rows} />
    </div>
  );
}
