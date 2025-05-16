import { StockAnalyticTable } from "@/features/stockAnalytic";

export default function StockAnalyticSection() {
  return (
    <section>
      <div className="basic-container">
        <div className="basic-result-section">
          <StockAnalyticTable />
        </div>
      </div>
    </section>
  );
}
