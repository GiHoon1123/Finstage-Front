import type { ViewMode, SortOrder, IncomeTableHeaderProps } from "../types";

export default function StockAnalyticTableHeader({
  viewMode,
  setViewMode,
  sortOrder,
  setSortOrder,
}: IncomeTableHeaderProps) {
  return (
    <div className="dropdown-group">
      <select
        className="dropdown"
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value as ViewMode)}
      >
        <option value="monthly">월간</option>
        <option value="quarterly">분기</option>
        <option value="annual">연간</option>
      </select>

      <select
        className="dropdown"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as SortOrder)}
      >
        <option value="desc">최신순</option>
        <option value="asc">과거순</option>
      </select>
    </div>
  );
}
