import { useCallback, useRef } from "react";
import { CandlestickData, HistogramData, ISeriesApi } from "lightweight-charts";
import { useSymbolStore } from "@/entities/symbol";
import { useStockSocket, useVolumeSocket } from "@/entities/order";
import { useSymbolFetchEffect } from "./useSymbolFetchEffect";
import { createStockChart } from "../lib/createStockChart";

export function useStockChart() {
  const { symbol } = useSymbolStore();
  useSymbolFetchEffect();

  const tooltipRef = useRef<HTMLDivElement>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null); // ✅ null 초기화
  const setChartElement = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    // 이전 차트 제거
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    // 새 차트 생성 및 cleanup 등록
    const cleanup = createStockChart({
      chartRef: { current: node },
      tooltipRef,
      candleSeriesRef,
      volumeSeriesRef,
    });
    cleanupRef.current = cleanup ?? null;
  }, []);

  // ✅ 실시간 주가 업데이트
  const handleCandle = useCallback((data: CandlestickData) => {
    candleSeriesRef.current?.update(data);
  }, []);

  // ✅ 실시간 거래량 업데이트
  const handlevolumCandle = useCallback((data: HistogramData) => {
    volumeSeriesRef.current?.update(data);
  }, []);

  useStockSocket({ onCandleUpdate: handleCandle });
  useVolumeSocket({ onCandleUpdate: handlevolumCandle });

  return {
    symbol,
    setChartElement,
    tooltipRef,
    candleSeriesRef,
    volumeSeriesRef,
  };
}
