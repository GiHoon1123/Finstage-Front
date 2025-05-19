"use client";

import { useSymbolSearch } from "../model/useSymbolSearch";
import SymbolSearchField from "./SymbolSearchField";
import SymbolSearchOverlay from "./SymbolSearchOverlay";
import SymbolSearchRecentList from "./SymbolSearchRecentList";
import SymbolSearchResultList from "./SymbolSearchResultList";

export default function SymbolSearchInput() {
  const {
    query,
    setQuery,
    filtered,
    focused,
    setFocused,
    selectedIndex,
    setSelectedIndex,
    selectedItemRef,
    recentSymbols,
    handleKeyDown,
    handleItemClick,
    handleRecentClick,
  } = useSymbolSearch();

  return (
    <div className="search-wrapper">
      <SymbolSearchOverlay focused={focused} setFocused={setFocused} />

      <SymbolSearchField
        query={query}
        focused={focused}
        setFocused={setFocused}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
        clearSelection={() => setSelectedIndex(-1)}
      />

      {query && focused && (
        <div className="search-panel">
          <div className="result-list">
            <SymbolSearchRecentList
              recentSymbols={recentSymbols}
              onClick={handleRecentClick}
            />

            <SymbolSearchResultList
              filtered={filtered}
              selectedIndex={selectedIndex}
              selectedItemRef={selectedItemRef}
              onClick={handleItemClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
