import { ChartHeader, ChartWrapper } from "@/features/stockChart";

export default function StockOrderSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartHeader />
        <div className="basic-result-section">
          <ChartWrapper />
        </div>
      </div>
    </section>
  );
}
