import { SymbolSearchInput } from "@/features/symbolSearch";
import { IncomeStatementTable } from "@/features/stockAnalytic";

export default function StockAnalyticSection() {
  return (
    <section>
      <div className="basic-container">
        <div className="basic-search-box">
          <SymbolSearchInput />
        </div>

        <div className="basic-result-section">
          <IncomeStatementTable />
        </div>
      </div>
    </section>
  );
}
