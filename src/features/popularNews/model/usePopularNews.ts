"use client";

import { useEffect, useState } from "react";
import { fetchSymbolContentList } from "@/entities/content";
import type { Content } from "@/entities/content";

const popularSymbols = [
  "MSFT",
  "AAPL",
  "GOOGL",
  "TSLA",
  "NVDA",
  "AMZN",
  "META",
  "NFLX",
];

export function usePopularNews() {
  const [symbolNewsMap, setSymbolNewsMap] = useState<Record<string, Content[]>>(
    {},
  );

  const fetchSingle = async (symbol: string): Promise<Content[]> => {
    try {
      const res = await fetchSymbolContentList({ symbol, page: 1, size: 1 });
      if (res) return res;
      else return [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      const result: Record<string, Content[]> = {};

      await Promise.all(
        popularSymbols.map(async (symbol) => {
          const items = await fetchSingle(symbol);
          result[symbol] = items;
        }),
      );

      setSymbolNewsMap(result);
    };

    fetchAll();
  }, []);

  return {
    symbolNewsMap,
    popularSymbols,
  };
}
