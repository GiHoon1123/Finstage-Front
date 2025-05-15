"use client";

import { useCompanySearch } from "../model/useCompanySearch";
import SymbolSearchField from "./SymbolSearchField";
import SymbolSearchRecentList from "./SymbolSearchRecentList";
import SymbolSearchResultList from "./SymbolSearchResultList";

export default function SymbolSearchInput() {
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
      {loading && "조회 중..."}

      <SymbolSearchRecentList
        recentSymbols={recentSymbols}
        onClick={handleRecentClick}
      />

      <SymbolSearchField
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
        clearSelection={() => setSelectedIndex(-1)}
      />

      {query && (
        <SymbolSearchResultList
          filtered={filtered}
          selectedIndex={selectedIndex}
          selectedItemRef={selectedItemRef}
          onClick={handleItemClick}
        />
      )}
    </div>
  );
}
