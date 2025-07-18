import {
  ChartHeader,
  ChartWidget,
  ChartWidgetBox,
  ChartWrapper,
  ChartSymbolWidget,
} from "@/features/stockChart";

export default function StockOrderSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartHeader />
        <ChartWrapper />
      </div>
      <div className="basic-container">
        <ChartSymbolWidget />
        <ChartWidgetBox height={60}>
          <ChartWidget />
        </ChartWidgetBox>
      </div>
    </section>
  );
}
