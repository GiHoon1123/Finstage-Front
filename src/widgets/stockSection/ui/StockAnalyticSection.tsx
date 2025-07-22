import { StockAnalyticTable } from "@/features/stockAnalytic";
import { StockInfo } from "@/features/stockChart";

export default function StockAnalyticSection() {
  return (
    <section>
      <div className="basic-container">
        <StockInfo />
        <div className="basic-result-section">
          <StockAnalyticTable />
        </div>
      </div>
    </section>
  );
}
