import type { SortOrder, IncomeStatement } from "../types";

// 정렬하는 도메인 로직
export function sortedColumns(
  grouped: Record<string, IncomeStatement[]>,
  sortOrder: SortOrder,
): string[] {
  const keyWithDate = Object.entries(grouped).map(([label, list]) => {
    const latestDate = list
      .map((d) => d.date)
      .sort((a, b) => b.localeCompare(a))[0]; // 가장 최신 날짜 기준 정렬

    return { label, dateKey: latestDate };
  });

  keyWithDate.sort((a, b) =>
    sortOrder === "desc"
      ? b.dateKey.localeCompare(a.dateKey)
      : a.dateKey.localeCompare(b.dateKey),
  );

  return keyWithDate.map((entry) => entry.label);
}
