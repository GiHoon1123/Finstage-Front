import { StockAnalyticTable } from "@/features/stockAnalytic";
import { ChartHeader } from "@/features/stockChart";

export default function StockAnalyticSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartHeader />
        <div className="basic-result-section">
          <StockAnalyticTable />
        </div>
      </div>
    </section>
  );
}
