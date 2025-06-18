import { formatRelativeTime } from "@/entities/content";
import type { Content } from "@/entities/content";

export default function TopNewsListItem({
  news,
  compact = false,
}: {
  news: Content;
  compact?: boolean;
}) {
  const hasImage = false; // 나중에 news.imgurl 생기면: !!news.thumbnail

  return (
    <div className={`list-item ${compact ? "compact" : ""}`}>
      {hasImage && (
        <div className="thumbnail-placeholder">
          <img src={"news.imgurl"} alt="" className="thumbnail" />
        </div>
      )}
      <div className="info">
        <p className="title">{news.title}</p>
        <p className="summary">{news.summary}</p>
        <p className="meta">{formatRelativeTime(news.date)} • 뉴스</p>
      </div>
    </div>
  );
}
