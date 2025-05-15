import { Symbol } from "@/entities/symbol";

export function filterSymbolsByQuery(symbolList: Symbol[], query: string) {
  if (!query.trim()) return { filtered: symbolList };

  const filtered = symbolList.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  return { filtered };
}
