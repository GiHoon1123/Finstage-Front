import type { SortOrder } from "../types";
import type { IncomeStatement } from "@/entities/incomeStatement";

export function getSortedKeys(
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
