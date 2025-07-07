import type { Content } from "@/entities/content";
import { formatRelativeTime } from "@/entities/content";
import Link from "next/link";

export default function PopularNewsItem({
  news,
  symbol,
}: {
  news: Content;
  symbol: string;
}) {
  return (
    <Link className="popular-news-card" href={news.url} target="_blank">
      <div className="popular-news-thumbnail" />
      <div className="popular-news-info">
        <p className="popular-news-symbol">{symbol} News</p>
        <p className="popular-news-title-text">{news.title}</p>
        <p className="popular-news-meta">
          {formatRelativeTime(news.date)} · 뉴스
        </p>
      </div>
    </Link>
  );
}
