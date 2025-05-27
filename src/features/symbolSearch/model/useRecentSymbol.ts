import {
  // useEffect,
  useState,
} from "react";

const STORAGE_KEY = "recent-symbols";
const MAX_RECENT = 5;

export function useRecentSymbols() {
  const [recentSymbols, setRecentSymbols] = useState<string[]>([]);

  // useEffect(() => {
  //   const stored = localStorage.getItem(STORAGE_KEY);
  //   if (stored) {
  //     try {
  //       setRecentSymbols(JSON.parse(stored));
  //     } catch (e) {
  //       console.error("Failed to parse recent symbols from localStorage", e);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSymbols));
  // }, [recentSymbols]);

  const addRecentSymbol = (symbol: string) => {
    setRecentSymbols((prev) => {
      const next = [symbol, ...prev.filter((s) => s !== symbol)];
      return next.slice(0, MAX_RECENT);
    });
  };

  const clearRecentSymbols = () => {
    setRecentSymbols([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    recentSymbols,
    addRecentSymbol,
    clearRecentSymbols,
  };
}
