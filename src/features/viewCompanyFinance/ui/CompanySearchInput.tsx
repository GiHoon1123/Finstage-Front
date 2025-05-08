"use client";

import { fetchSymbolListToStore } from "../api/fetchSymbolList";
import { useSelectedCompany } from "../model/useSelectedCompany";
import { useSymbolListStore } from "@/entities/symbol";
import { useState, useEffect } from "react";

export default function CompanySearchInput() {
  const { setSelectedCompanyId } = useSelectedCompany();
  const { symbolList } = useSymbolListStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (symbolList?.length === 0 || symbolList === null)
      fetchSymbolListToStore();
  }, [symbolList]);

  const filtered = symbolList.filter(
    (c) => c.name.includes(query) || c.symbol.includes(query),
  );

  return (
    <div className="mb-4">
      <input
        type="text"
        className="border px-2 py-1 text-sm w-full"
        placeholder="회사명 또는 티커 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="border mt-1 text-sm bg-white max-h-40 overflow-y-auto">
          {filtered.map((c) => (
            <li
              key={c.symbol}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedCompanyId(c.symbol);
                setQuery("");
              }}
            >
              {c.name} ({c.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
