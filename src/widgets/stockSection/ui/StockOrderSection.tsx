import {
  ChartHeader,
  ChartWidget,
  ChartWidgetBox,
} from "@/features/stockChart";

export default function StockOrderSection() {
  return (
    <section>
      <div className="basic-container">
        <ChartHeader />
        <ChartWidgetBox height={60}>
          <ChartWidget />
        </ChartWidgetBox>
      </div>
    </section>
  );
}
