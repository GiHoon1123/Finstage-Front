import {
  ChartSymbolInfoWidget,
  ChartWidget,
  ChartHeader,
  // ChartWrapper,
} from "@/features/stockChart";

export default function StockOrderSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartSymbolInfoWidget />
        <div style={{ height: "65vmin" }}>
          <ChartWidget />
        </div>
        {/* <div className="basic-result-section">
          <ChartWrapper />
        </div> */}
      </div>
    </section>
  );
}
