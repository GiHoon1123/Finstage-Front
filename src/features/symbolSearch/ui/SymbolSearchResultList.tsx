import { SymbolID, SymbolName } from "@/entities/symbol";
import { CompanySearchResultListProps } from "../types";

export default function SymbolSearchResultList({
  filtered,
  selectedIndex,
  selectedItemRef,
  onClick,
}: CompanySearchResultListProps) {
  if (filtered.length === 0) return null;

  return (
    <>
      {filtered.map((symbolItem, idx) => {
        return (
          <li
            key={symbolItem.symbol}
            ref={idx === selectedIndex ? selectedItemRef : null}
            className={`result-item ${idx === selectedIndex ? "selected" : ""}`}
            onClick={() => onClick(symbolItem.symbol, idx)}
          >
            <span>
              <SymbolName name={symbolItem.name} />
              (<SymbolID symbol={symbolItem.symbol} />)
            </span>
          </li>
        );
      })}
    </>
  );
}
