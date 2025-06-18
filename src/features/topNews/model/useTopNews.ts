import { useEffect } from "react";
import {
  useContentListStore,
  fetchContentListToStore,
} from "@/entities/content";

export function useTopNews() {
  const { contentList } = useContentListStore();

  useEffect(() => {
    // 이미 데이터가 없다면 fetch
    fetchContentListToStore({ page: 1, size: 6 });
  }, []);

  return {
    mainNews: contentList[0],
    subNews: contentList.slice(1),
  };
}
