import { useSymbolStore } from "../model/useSymbolStore";
import type { Symbol } from "../types";

export async function featSymbolToStore(symbol: string) {
  const { setSymbol } = useSymbolStore.getState();

  try {
    const res = await fetch(`http://localhost:4000/api/symbols/${symbol}`);
    const data: Symbol = await res.json();
    console.log("[DEBUG] symbol response:", data);

    setSymbol(data);
  } catch (e) {
    console.error("Failed to fetch symbol list", e);
  }
}
