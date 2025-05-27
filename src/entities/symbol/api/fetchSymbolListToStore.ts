import { useSymbolListStore } from "../model/useSymbolListStore";
import { Symbol } from "../types";

export async function fetchSymbolListToStore() {
  const { setSymbolList } = useSymbolListStore.getState();

  try {
    const res = await fetch("http://localhost:4000/api/symbols");
    const data: Symbol[] = await res.json();
    console.log("[DEBUG] symbol list response:", data);

    setSymbolList(data);
  } catch (e) {
    console.error("Failed to fetch symbol list", e);
  }
}
