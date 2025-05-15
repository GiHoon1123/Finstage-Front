import { fetchSymbolListToStore } from "../api/fetchSymbolListToStore";
import { Symbol } from "@/entities/symbol";
import { useEffect } from "react";

export function useSymbolFetchEffect(symbolList: Symbol[]) {
  useEffect(() => {
    if (symbolList.length === 0) {
      fetchSymbolListToStore();
    }
  }, []);
}
