import CompanySearchInput from "@/features/viewCompanyFinance/ui/CompanySearchInput";
import IncomeStatementTable from "@/features/viewCompanyFinance/ui/IncomeStatementTable";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* 검색 영역 */}
      <div className="home-search-box">
        <CompanySearchInput />
      </div>

      {/* 테이블 결과 */}
      <div className="home-result-section">
        <IncomeStatementTable />
      </div>

      {/* 추후: 인기 종목, 차트, 뉴스 위젯 등 추가 가능 */}
    </div>
  );
}
