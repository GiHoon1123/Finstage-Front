import { formatRelativeTime } from "@/entities/content";
import type { Content } from "@/entities/content";

export default function TopNewsMainCard({ news }: { news: Content }) {
  const hasImage = false; // 나중엔: !!news.imgurl

  return (
    <div className={`main-card ${hasImage ? "with-image" : "text-only"}`}>
      {hasImage ? (
        <>
          <img
          // src={"news.imgurl" || "/sample-thumbnail.png"}
          // alt={"news.title"}
          // className="main-card-image"
          />
          <div className="main-card-overlay">
            <p className="main-card-meta">
              {formatRelativeTime(news.date)} · 뉴스
            </p>
            <h3 className="main-card-title">{news.title}</h3>
          </div>
        </>
      ) : (
        <div className="main-card-text-only">
          <h3 className="main-card-title">{news.title}</h3>
          {news.summary && <p className="main-card-summary">{news.summary}</p>}
        </div>
      )}
    </div>
  );
}
