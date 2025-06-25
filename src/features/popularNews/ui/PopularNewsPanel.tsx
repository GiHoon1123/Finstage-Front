"use client";

import { usePopularNews } from "../model/usePopularNews";
import PopularNewsItem from "./PopularNewsItem";

export default function PopularNewsPanel() {
  const { symbolNewsMap, popularSymbols } = usePopularNews();

  return (
    <section className="popular-news-section">
      <h2 className="popular-news-title">인기 주식 뉴스</h2>
      <div className="popular-news-grid">
        {popularSymbols.map((symbol) => {
          const items = symbolNewsMap[symbol] || [];
          return items.map((item) => (
            <PopularNewsItem
              key={`${symbol}-${item.id}`}
              news={item}
              symbol={symbol}
            />
          ));
        })}
      </div>
    </section>
  );
}
