import { CompanySearchResultListProps } from "../types";

export default function CompanySearchResultList({
  filtered,
  selectedIndex,
  selectedItemRef,
  onClick,
}: CompanySearchResultListProps) {
  if (filtered.length === 0) return null;

  return (
    <ul className="border mt-1 text-sm bg-white max-h-40 overflow-y-auto">
      {filtered.map((symbolItem, idx) => {
        const display = `${symbolItem.name} (${symbolItem.symbol})`;
        return (
          <li
            key={symbolItem.symbol}
            ref={idx === selectedIndex ? selectedItemRef : null}
            className={`px-2 py-1 cursor-pointer ${
              idx === selectedIndex
                ? "bg-blue-100 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onClick(display, idx)}
          >
            {display}
          </li>
        );
      })}
    </ul>
  );
}
