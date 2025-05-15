import { CompanySearchResultListProps } from "../types";

export default function SymbolSearchResultList({
  filtered,
  selectedIndex,
  selectedItemRef,
  onClick,
}: CompanySearchResultListProps) {
  if (filtered.length === 0) return null;

  return (
    <ul className="result-list">
      {filtered.map((symbolItem, idx) => {
        const display = `${symbolItem.name} (${symbolItem.symbol})`;
        return (
          <li
            key={symbolItem.symbol}
            ref={idx === selectedIndex ? selectedItemRef : null}
            className={`result-item ${idx === selectedIndex ? "selected" : ""}`}
            onClick={() => onClick(display, idx)}
          >
            {display}
          </li>
        );
      })}
    </ul>
  );
}
