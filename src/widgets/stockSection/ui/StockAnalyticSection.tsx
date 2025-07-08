import { StockAnalyticTable } from "@/features/stockAnalytic";
import { ChartTest } from "@/entities/order";

export default function StockAnalyticSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartTest />
        <div className="basic-result-section">
          <StockAnalyticTable />
        </div>
      </div>
    </section>
  );
}
