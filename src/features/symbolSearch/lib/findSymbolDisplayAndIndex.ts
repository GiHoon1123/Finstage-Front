import { Symbol } from "@/entities/symbol";

export function findSymbolDisplayAndIndex(
  symbolList: Symbol[],
  filtered: Symbol[],
  symbol: string,
): { display: string; index: number } | null {
  const found = symbolList.find((item) => item.symbol === symbol);
  if (!found) return null;

  const display = `${found.name} (${found.symbol})`;
  const index = filtered.findIndex((item) => item.symbol === symbol);
  return { display, index };
}
