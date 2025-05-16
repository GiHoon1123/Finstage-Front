import { fetchIncomeStatementListToStore } from "../api/fetchIncomeStatementListToStore";
import { extractSymbolFromQuery } from "../lib/extractSymbolFromQuery";
import { useRecentSymbolStore } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useConfirmHandler(
  symbolList: Symbol[],
  filtered: Symbol[],
  selectedIndex: number,
  setLoading: (v: boolean) => void,
) {
  const router = useRouter();
  const { addRecentSymbol } = useRecentSymbolStore();

  const handleConfirm = useCallback(
    async (query: string, display: string | null = null) => {
      let symbol = filtered[selectedIndex]?.symbol ?? "";

      if (!symbol) {
        const found = extractSymbolFromQuery(query, display, symbolList);
        if (!found) return;
        symbol = found.symbol;
      }

      addRecentSymbol(symbol);
      setLoading(true);
      await fetchIncomeStatementListToStore(symbol);
      setLoading(false);
      router.push(`/stocks/${symbol}/analytics`);
    },
    [filtered, selectedIndex, symbolList],
  );

  return { handleConfirm };
}
