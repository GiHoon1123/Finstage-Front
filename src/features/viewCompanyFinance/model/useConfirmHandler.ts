import { fetchIncomeStatementListToStore } from "../api/fetchIncomeStatementListToStore";
import { useRecentSymbolStore, useSymbolListStore } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";
import { useCallback } from "react";

export function useConfirmHandler(
  filtered: Symbol[],
  selectedIndex: number,
  setLoading: (v: boolean) => void,
) {
  const { symbolList } = useSymbolListStore();
  const { addRecentSymbol } = useRecentSymbolStore();

  const handleConfirm = useCallback(
    async (query: string, display: string | null = null) => {
      let symbol = filtered[selectedIndex]?.symbol ?? "";
      const queryStr = display ?? query;

      if (!symbol) {
        const match = queryStr.match(/\(([^)]+)\)$/);
        let typedSymbol = match?.[1].trim() ?? "";

        if (!typedSymbol) {
          typedSymbol = queryStr.trim().toUpperCase();
        }

        const found = symbolList.find(
          (item) =>
            item.symbol.toUpperCase() === typedSymbol ||
            item.name.toLowerCase().includes(queryStr.toLowerCase()),
        );

        if (!found) {
          alert("정확한 회사를 선택하거나 입력해 주세요.");
          return;
        }

        symbol = found.symbol;
      }

      addRecentSymbol(symbol);
      setLoading(true);
      await fetchIncomeStatementListToStore(symbol);
      setLoading(false);
    },
    [filtered, selectedIndex, symbolList],
  );

  return { handleConfirm };
}
