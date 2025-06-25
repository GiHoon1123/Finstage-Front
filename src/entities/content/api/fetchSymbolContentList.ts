import { ContentListApiResponse } from "../types";

export async function fetchSymbolContentList({
  symbol,
  page = 1,
  size = 20,
}: {
  symbol: string;
  page?: number;
  size?: number;
}) {
  try {
    const res = await fetch(
      `http://localhost:4000/contents/${symbol}?page=${page}&size=${size}`,
    );
    const json: ContentListApiResponse = await res.json();

    return json.data.items;
  } catch (e) {
    console.error("Failed to fetch symbol content list", e);
  }
}
