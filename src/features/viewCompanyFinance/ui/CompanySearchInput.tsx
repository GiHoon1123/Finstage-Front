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

  const selectedSymbol = filtered[selectedIndex]?.symbol ?? null;

  const handleConfirm = async () => {
    const symbol = selectedSymbol || query.trim();
    if (!symbol) return;
    console.log("symbol", symbol);
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
  };

  return (
    <div className="mb-4">
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
        <button
          className="px-4 py-1 text-sm bg-blue-500 text-white rounded"
          onClick={handleConfirm}
        >
          {loading ? "조회 중..." : "확인"}
        </button>
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
