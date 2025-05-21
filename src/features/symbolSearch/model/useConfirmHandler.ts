import { extractSymbolFromQuery } from "../lib/extractSymbolFromQuery";
import { useRecentSymbolStore } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useConfirmHandler(
  symbolList: Symbol[],
  filtered: Symbol[],
  selectedIndex: number,
  setFocused: (v: boolean) => void,
) {
  const router = useRouter();
  const { addRecentSymbol } = useRecentSymbolStore();

  const handleConfirm = useCallback(
    async (query: string) => {
      const found = extractSymbolFromQuery(query, symbolList);
      if (!found) return;
      const symbol = found.symbol;

      addRecentSymbol(symbol);
      setFocused(false);
      router.push(`/stocks/${symbol}/analytics`);
    },
    [filtered, selectedIndex, symbolList],
  );

  return { handleConfirm };
}
