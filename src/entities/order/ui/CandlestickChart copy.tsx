"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createChart,
  ISeriesApi,
  CandlestickData,
  CandlestickSeries,
} from "lightweight-charts";
import { useStockSocket } from "../model/useStockSocket";

export default function CandlestickChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // ✅ 실시간 캔들 수신 시 차트에 업데이트
  const handleCandle = useCallback((data: CandlestickData) => {
    seriesRef.current?.update(data);
  }, []);

  useStockSocket({ onCandleUpdate: handleCandle });

  useEffect(() => {
    if (!chartRef.current) return;

    //차트 레이아웃 옵션
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        background: { color: "black" }, // ✅ 수정된 부분
        textColor: "white",
      },
      grid: {
        horzLines: {
          color: "#333333", // ✅ 연한 회색
          style: 0, // 0: 실선 (기본), 1: 점선 등
          visible: true,
        },
        vertLines: {
          color: "#222222", // 세로선도 동일하게 조정 가능
          style: 0,
          visible: true,
        },
      },
    });

    //캐들옵션
    const candlestickSeries = chart.addSeries(CandlestickSeries);
    candlestickSeries.applyOptions({
      upColor: "#26a69a",
      downColor: "#ef5350",
      // borderVisible: false,
      // wickUpColor: "#26a69a",
      // wickDownColor: "#ef5350",
    });

    seriesRef.current = candlestickSeries;

    //차트 데이터
    candlestickSeries.setData([]);
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
      data-testid="live-candle-chart"
    />
  );
}
