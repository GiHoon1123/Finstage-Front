import TopNewsListItem from "./TopNewsListItem";
import type { Content } from "@/entities/content";

export default function TopNewsList({
  newsList,
  compact = false,
}: {
  newsList: Content[];
  compact?: boolean;
}) {
  return (
    <div className={`top-news-list ${compact ? "compact" : ""}`}>
      {newsList.map((news) => (
        <TopNewsListItem key={news.id} news={news} compact={compact} />
      ))}
    </div>
  );
}
