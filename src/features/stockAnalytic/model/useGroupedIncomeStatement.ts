import { IncomeStatement } from "@/entities/incomeStatement";
import type { ViewMode } from "../types";

export function groupByViewMode(
  list: IncomeStatement[],
  viewMode: ViewMode,
): Record<string, IncomeStatement[]> {
  return list.reduce((acc, item) => {
    const [year, month] = item.date.split("-");
    const monthNum = parseInt(month);
    const quarter = Math.floor((monthNum - 1) / 3) + 1;
    const quarterEndMonth = quarter * 3;

    const key =
      viewMode === "annual"
        ? year
        : viewMode === "quarterly"
        ? `${year}년 ${quarter}분기 (${quarterEndMonth}월)`
        : `${year}년 ${monthNum}월`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, IncomeStatement[]>);
}
