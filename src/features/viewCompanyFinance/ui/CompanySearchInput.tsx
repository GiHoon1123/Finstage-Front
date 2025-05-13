"use client";

import { useCompanySearch } from "../model/useCompanySearch";

export default function CompanySearchInput() {
  const {
    query,
    setQuery,
    loading,
    filtered,
    selectedIndex,
    setSelectedIndex,
    selectedItemRef,
    recentSymbols,
    handleKeyDown,
    handleItemClick,
    handleRecentClick,
  } = useCompanySearch();

  return (
    <div className="mb-4">
      {loading ? "조회 중..." : ""}
      {recentSymbols.length > 0 && (
        <div className="recent-container">
          <p className="recent-title">최근 검색:</p>
          <ul className="recent-list">
            {recentSymbols.map((symbol) => (
              <li
                key={symbol}
                className="recent-item"
                onClick={() => handleRecentClick(symbol)}
              >
                {symbol}
              </li>
            ))}
          </ul>
        </div>
      )}
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
          {filtered.map((symbolItem, idx) => {
            const display = `${symbolItem.name} (${symbolItem.symbol})`;
            return (
              <li
                key={symbolItem.symbol}
                ref={idx === selectedIndex ? selectedItemRef : null}
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
