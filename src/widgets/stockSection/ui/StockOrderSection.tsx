import {
  ChartWidget,
  ChartWidgetBox,
  ChartSymbolWidget,
} from "@/features/stockChart";
import ChartWrapper from "@/features/stockChart/ui/ChartWrapper";

export default function StockOrderSection() {
  return (
    <section>
      <div className="basic-container">
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
