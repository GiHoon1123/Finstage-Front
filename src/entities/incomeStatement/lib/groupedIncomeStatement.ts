import type { ViewMode, IncomeStatement } from "../types";

// 날짜 기준으로 그룹화하는 도메인 로직
export function getLabelByViewMode(date: string, viewMode: ViewMode): string {
  const [year, month] = date.split("-");
  const monthNum = parseInt(month, 10);
  const quarter = Math.floor((monthNum - 1) / 3) + 1;
  const quarterEndMonth = quarter * 3;

  if (viewMode === "annual") return `${year}년`;
  else if (viewMode === "quarterly")
    return `${year}년 ${quarter}분기 (${quarterEndMonth}월)`;
  else return `${year}년 ${monthNum}월`;
}

// ViewMode로 도메인 표현 방식을 변경하는 로직
export function groupByViewMode(
  list: IncomeStatement[],
  viewMode: ViewMode,
): Record<string, IncomeStatement[]> {
  return list.reduce((acc, item) => {
    const key = getLabelByViewMode(item.date, viewMode);

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, IncomeStatement[]>);
}
