"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createChart,
  CandlestickData,
  UTCTimestamp,
  CandlestickSeries,
  HistogramSeries,
  ISeriesApi,
} from "lightweight-charts";
import { useStockSocket } from "../model/useStockSocket";

export default function CombinedChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  // ✅ 실시간 캔들 수신 시 주가 + 거래량 업데이트
  const handleCandle = useCallback(
    (data: CandlestickData & { volume?: number }) => {
      candleSeriesRef.current?.update(data);

      const color = data.close > data.open ? "#26a69a" : "#ef5350";
      volumeSeriesRef.current?.update({
        time: data.time as UTCTimestamp,
        value: 1,
        color,
      });
    },
    [],
  );

  useStockSocket({ onCandleUpdate: handleCandle });

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: "black" },
        textColor: "white",
      },
      grid: {
        horzLines: { color: "#333" },
        vertLines: { color: "#222" },
      },
      rightPriceScale: { scaleMargins: { top: 0.2, bottom: 0.25 } },
    });

    // ✅ 캔들 시리즈 (주가)
    const candlestickSeries = chart.addSeries(CandlestickSeries);
    candlestickSeries.applyOptions({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      borderVisible: false,
    });
    candleSeriesRef.current = candlestickSeries;

    // ✅ 히스토그램 시리즈 (거래량)
    const volumeSeries = chart.addSeries(HistogramSeries);
    volumeSeries.applyOptions({
      priceScaleId: "", // 기본 왼쪽 스케일 제거
      priceFormat: { type: "volume" },
      priceLineVisible: false,
      autoscaleInfoProvider: () => ({
        priceRange: {
          minValue: 0,
          maxValue: 100,
        },
      }),
    });
    volumeSeriesRef.current = volumeSeries;

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartRef.current!.clientWidth });
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "500px" }}
      data-testid="combined-chart"
    />
  );
}
