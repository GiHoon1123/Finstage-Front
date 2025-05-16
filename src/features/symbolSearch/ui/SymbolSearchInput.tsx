"use client";

import { useSymbolSearch } from "../model/useSymbolSearch";
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
  } = useSymbolSearch();

  return (
    <div>
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
