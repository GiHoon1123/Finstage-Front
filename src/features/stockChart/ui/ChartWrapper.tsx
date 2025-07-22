"use client";
import { StockInfo } from "..";
import { useStockChart } from "../model/useStockChart";
import StockChar from "./StockChar";

export default function ChartWrapper() {
  const { setChartElement, tooltipRef, symbol } = useStockChart();

  return (
    <div>
      <StockInfo symbol={symbol} />
      <StockChar chartRef={setChartElement} tooltipRef={tooltipRef} />
    </div>
  );
}
