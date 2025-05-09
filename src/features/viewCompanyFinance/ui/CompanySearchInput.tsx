"use client";
//최근 검색 캐시 추가해야함

import { fetchIncomeStatementListToStore } from "../api/fetchIncomeStatementList";
import { fetchSymbolListToStore } from "../api/fetchSymbolList";
import { useSelectedCompany } from "../model/useSelectedCompany";
import { useSymbolListStore } from "@/entities/symbol";
import { useState, useEffect } from "react";

export default function CompanySearchInput() {
  const { setSelectedCompanyId } = useSelectedCompany();
  const { symbolList } = useSymbolListStore();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbolList.length === 0) fetchSymbolListToStore();
  }, []);

  const filtered = symbolList.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  const handleConfirm = async (display: string | null = null) => {
    const selectedSymbol = filtered[selectedIndex]?.symbol ?? null;
    let symbol = selectedSymbol ?? "";
    const queryStr = display ?? query;

    // 1. selectedSymbol이 없다면 query 기반으로 추출 시도
    if (!symbol) {
      const match = queryStr.match(/\(([^)]+)\)$/);
      let typedSymbol = match?.[1].trim() ?? "";

      // 괄호에서 추출 못했을 경우 → 전체 query를 symbol로 시도
      if (!typedSymbol) {
        typedSymbol = queryStr.trim().toUpperCase();
      }

      // symbolList에서 symbol 또는 name 기준으로 검색
      const found = symbolList.find(
        (item) =>
          item.symbol.toUpperCase() === typedSymbol ||
          item.name.toLowerCase().includes(queryStr.toLowerCase()),
      );

      if (!found) {
        alert("정확한 회사를 선택하거나 입력해 주세요.");
        return;
      }

      symbol = found.symbol;
    }

    setSelectedCompanyId(symbol);
    setLoading(true);
    await fetchIncomeStatementListToStore(symbol);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        setQuery(
          `${filtered[selectedIndex].name} (${filtered[selectedIndex].symbol})`,
        );
      }
      handleConfirm();
    }
  };

  const handleItemClick = (display: string, index: number) => {
    setQuery(display);
    setSelectedIndex(index);
    handleConfirm(display);
  };

  return (
    <div className="mb-4">
      {loading ? "조회 중..." : ""}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="border px-2 py-1 text-sm w-full"
          placeholder="회사명 또는 티커 검색..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {query && filtered.length > 0 && (
        <ul className="border mt-1 text-sm bg-white max-h-40 overflow-y-auto">
          {filtered.map((c, idx) => {
            const display = `${c.name} (${c.symbol})`;
            return (
              <li
                key={c.symbol}
                className={`px-2 py-1 cursor-pointer ${
                  idx === selectedIndex
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(display, idx)}
              >
                {display}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
