import { useSymbolContentListStore } from "../model/useSymbolContentListStore";
import { ContentListApiResponse } from "../types";

export async function fetchSymbolContentListToStore({
  symbol,
  page = 1,
  size = 20,
}: {
  symbol: string;
  page?: number;
  size?: number;
}) {
  const { setSymbolContentList } = useSymbolContentListStore.getState();

  try {
    const res = await fetch(
      `http://localhost:4000/contents/${symbol}?page=${page}&size=${size}`,
    );
    const json: ContentListApiResponse = await res.json();

    setSymbolContentList(json.data.items);
  } catch (e) {
    console.error("Failed to fetch symbol content list", e);
  }
}
