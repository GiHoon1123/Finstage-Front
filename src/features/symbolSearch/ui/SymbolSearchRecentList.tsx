import { CompanySearchRecentListProps } from "../types";

export default function CompanySearchRecentList({
  recentSymbols,
  onClick,
}: CompanySearchRecentListProps) {
  if (recentSymbols.length === 0) return null;

  return (
    <div className="recent-container">
      <p className="recent-title">최근 검색:</p>
      <ul className="recent-list">
        {recentSymbols.map((symbol) => (
          <li
            key={symbol}
            className="recent-item"
            onClick={() => onClick(symbol)}
          >
            {symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}
