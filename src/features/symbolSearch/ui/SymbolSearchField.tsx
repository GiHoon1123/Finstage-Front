"use client";

import { IoSearch } from "react-icons/io5";
import type { SymbolSearchFieldProps } from "../types";

export default function SymbolSearchField({
  query,
  focused,
  setFocused,
  setQuery,
  onKeyDown,
  clearSelection,
}: SymbolSearchFieldProps) {
  return (
    <div className="search-input-wrapper">
      <div
        className={`search-input-container ${focused ? "expanded" : "default"}`}
      >
        <IoSearch className="search-input-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="회사명 또는 심볼 검색..."
          value={query}
          onFocus={() => setFocused(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            clearSelection();
            setFocused(true);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
