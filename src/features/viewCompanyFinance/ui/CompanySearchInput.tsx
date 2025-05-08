"use client";

import { useSelectedCompany } from "../model/useSelectedCompany";
import { useState } from "react";

const dummyCompanyList = [
  { symbol: "GOOGL", name: "구글" },
  { symbol: "005930", name: "삼성전자" },
  { symbol: "000660", name: "SK하이닉스" },
];

export default function CompanySearchInput() {
  const { setSelectedCompanyId } = useSelectedCompany();
  const [query, setQuery] = useState("");

  const filtered = dummyCompanyList.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.symbol.toLowerCase().includes(query.toLowerCase()),
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
