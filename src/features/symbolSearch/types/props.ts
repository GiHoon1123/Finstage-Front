import type { Symbol } from "@/entities/symbol";

export interface SymbolSearchFieldProps {
  query: string;
  focused: boolean;
  setFocused: (v: boolean) => void;
  setQuery: (v: string) => void;
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

export interface SymbolSearchOverlayProps {
  focused: boolean;
  setFocused: (v: boolean) => void;
}
