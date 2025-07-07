"use client";

import TopNewsList from "./TopNewsList";
import TopNewsMainCard from "./TopNewsMainCard";
import { useTopNews } from "../model/useTopNews";
import type { TopNewsPanelProps } from "../types";

export default function TopNewsPanel({
  variant = "default",
  title = "",
}: TopNewsPanelProps) {
  const { mainNews, subNews } = useTopNews();

  if (!mainNews) return null;

  return (
    <section className="top-news-section">
      <div className="top-news-header">
        <h2 className="top-news-title">{title}</h2>
      </div>

      {variant === "default" ? (
        <div className="top-news-layout">
          <TopNewsMainCard news={mainNews} />
          <TopNewsList newsList={subNews} />
        </div>
      ) : (
        <TopNewsList newsList={[mainNews, ...subNews]} compact />
      )}
    </section>
  );
}
