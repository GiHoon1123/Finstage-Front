import { useSymbolListStore } from "@/entities/symbol";

export function useFilteredSymbols(query: string) {
  const { symbolList } = useSymbolListStore();

  const filtered = symbolList.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  return { filtered, symbolList };
}
