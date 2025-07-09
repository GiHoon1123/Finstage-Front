import { StockAnalyticTable } from "@/features/stockAnalytic";
import { ChartWrapper } from "@/entities/order";

export default function StockAnalyticSection() {
  return (
    <section>
      <div className="basic-container">
        <div className="basic-result-section">
          <ChartWrapper />
        </div>
        <div className="basic-result-section">
          <StockAnalyticTable />
        </div>
      </div>
    </section>
  );
}
