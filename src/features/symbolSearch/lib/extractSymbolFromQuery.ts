import type { Symbol } from "@/entities/symbol";

export function extractSymbolFromQuery(
  query: string,
  symbolList: Symbol[],
): Symbol | null {
  const queryStr = query;

  const match = queryStr.match(/\(([^)]+)\)$/);
  let typedSymbol = match?.[1]?.trim() ?? "";

  if (!typedSymbol) {
    typedSymbol = queryStr.trim().toUpperCase();
  }

  const found = symbolList.find(
    (item) =>
      item.symbol.toUpperCase() === typedSymbol ||
      item.name.toLowerCase().includes(queryStr.toLowerCase()),
  );

  return found ?? null;
}
