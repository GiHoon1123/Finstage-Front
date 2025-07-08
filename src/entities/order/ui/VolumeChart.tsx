"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  createChart,
  HistogramData,
  HistogramSeries,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { useVolumeSocket } from "../model/useVolumeSocket";

export default function VolumeChart({
  onInit,
}: {
  onInit?: (chart: IChartApi) => void;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  // ✅ 실시간 캔들 수신 시 차트에 업데이트
  const handleCandle = useCallback((data: HistogramData) => {
    volumeSeriesRef.current?.update(data);
  }, []);

  useVolumeSocket({ onCandleUpdate: handleCandle });

  useEffect(() => {
    if (!chartRef.current) return;

    //차트 레이아웃 옵션
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        background: { color: "white" },
        textColor: "black",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: {
        visible: true,
        borderColor: "#ccc",
      },
      rightPriceScale: {
        visible: false,
      },
    });

    onInit?.(chart);

    //캐들옵션
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: { type: "volume" },
      priceLineVisible: false,
    });

    volumeSeriesRef.current = volumeSeries;

    //차트 데이터
    volumeSeries.setData([]);
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
      data-testid="volume-chart"
    />
  );
}
