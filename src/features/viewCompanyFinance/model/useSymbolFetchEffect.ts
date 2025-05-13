import { useEffect } from "react";
import { fetchSymbolListToStore } from "../api/fetchSymbolListToStore";
import { useSymbolListStore } from "@/entities/symbol";

export function useSymbolFetchEffect() {
  const { symbolList } = useSymbolListStore();

  useEffect(() => {
    if (symbolList.length === 0) {
      fetchSymbolListToStore();
    }
  }, []);
}
