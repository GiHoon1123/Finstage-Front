import { fetchSymbolListToStore } from "@/entities/symbol";
import type { Symbol } from "@/entities/symbol";
import { useEffect } from "react";

export function useSymbolFetchEffect(symbolList: Symbol[]) {
  useEffect(() => {
    if (symbolList.length === 0) {
      fetchSymbolListToStore();
    }
  }, []);
}
