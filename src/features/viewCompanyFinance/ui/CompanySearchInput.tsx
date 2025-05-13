"use client";

import { useCompanySearch } from "../model/useCompanySearch";
import CompanySearchField from "./CompanySearchField";
import CompanySearchRecentList from "./CompanySearchRecentList";
import CompanySearchResultList from "./CompanySearchResultList";

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
      {loading && "조회 중..."}

      <CompanySearchRecentList
        recentSymbols={recentSymbols}
        onClick={handleRecentClick}
      />

      <CompanySearchField
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
        clearSelection={() => setSelectedIndex(-1)}
      />

      {query && (
        <CompanySearchResultList
          filtered={filtered}
          selectedIndex={selectedIndex}
          selectedItemRef={selectedItemRef}
          onClick={handleItemClick}
        />
      )}
    </div>
  );
}
