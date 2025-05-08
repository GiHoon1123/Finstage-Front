import { useSymbolListStore } from "@/entities/symbol";

export async function fetchSymbolListToStore() {
  const res = await fetch("/api/symbols");
  if (!res.ok) throw new Error("Failed to fetch symbol list");
  const data = await res.json();

  // store 주입
  const { setSymbolList } = useSymbolListStore.getState();
  setSymbolList(data);
}
