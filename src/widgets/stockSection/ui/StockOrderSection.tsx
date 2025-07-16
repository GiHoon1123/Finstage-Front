import { ChartSymbolInfoWidget, ChartWidgetBox } from "@/features/stockChart";

export default function StockOrderSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartSymbolInfoWidget />
        <ChartWidgetBox />
      </div>
    </section>
  );
}
