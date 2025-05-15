import type { Symbol } from "@/entities/symbol";

export interface CompanySearchFieldProps {
  query: string;
  setQuery: (q: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSelection: () => void;
}

export interface CompanySearchResultListProps {
  filtered: Symbol[];
  selectedIndex: number;
  selectedItemRef: React.RefObject<HTMLLIElement | null>;
  onClick: (display: string, index: number) => void;
}

export interface CompanySearchRecentListProps {
  recentSymbols: string[];
  onClick: (symbol: string) => void;
}
