import { useContentListStore } from "../model/useContentListStore";
import { ContentListApiResponse } from "../types";

export async function fetchContentListToStore({
  page = 1,
  size = 20,
}: {
  page?: number;
  size?: number;
}) {
  const { setContentList } = useContentListStore.getState();

  try {
    const res = await fetch(
      `http://localhost:4000/contents?page=${page}&size=${size}`,
    );
    const json: ContentListApiResponse = await res.json();

    console.log("[DEBUG] content list response:", json);

    setContentList(json.data.items);
  } catch (e) {
    console.error("Failed to fetch content list", e);
  }
}
