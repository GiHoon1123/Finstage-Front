import type { ViewMode, SortOrder } from "../types";

export function sortGroupedKeys(
  keys: string[],
  viewMode: ViewMode,
  sortOrder: SortOrder,
): string[] {
  const getDateKey = (label: string): string => {
    if (viewMode === "annual") return `${label}-12-31`;

    if (viewMode === "quarterly") {
      const match = label.match(/(\d{4})년 (\d)분기/);
      if (match) {
        const [_, y, q] = match;
        const m = parseInt(q) * 3;
        return `${y}-${String(m).padStart(2, "0")}-01`;
      }
    }

    if (viewMode === "monthly") {
      const match = label.match(/(\d{4})년 (\d{1,2})월/);
      if (match) {
        const [_, y, m] = match;
        return `${y}-${m.padStart(2, "0")}-01`;
      }
    }

    return label;
  };

  return [...keys].sort((a, b) =>
    sortOrder === "desc"
      ? getDateKey(b).localeCompare(getDateKey(a))
      : getDateKey(a).localeCompare(getDateKey(b)),
  );
}
