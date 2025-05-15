import { SymbolSearchInput } from "@/features/symbolSearch";
import { IncomeStatementTable } from "@/features/stockAnalytic";

export default function HomePage() {
  return (
    <div className="basic-container">
      <div className="basic-search-box">
        <SymbolSearchInput />
      </div>

      <div className="basic-result-section">
        <IncomeStatementTable />
      </div>

      {/* 추후: 인기 종목, 차트, 뉴스 위젯 등 추가 가능 */}
    </div>
  );
}
