// entities/price/ui/LivePriceChart.tsx

/**
 * ✅ Why this component belongs in `entities/price/ui/`:
 *
 * 1. This component visualizes **stock price**, which is a core business domain concept.
 * 2. According to Feature-Sliced Design, domain-level data (such as user, stock, post)
 *    and their visual representations (like avatars, charts) belong in `entities/`.
 * 3. Even though this is a UI component, its responsibility is tightly coupled with the
 *    domain logic — rendering time-series price data — not user interaction.
 * 4. It can be reused across multiple features/widgets/pages, which further qualifies it
 *    as a domain-layer unit, not a feature-specific component.
 *
 * Therefore, placing `LivePriceChart` under `entities/price/ui/` ensures clear
 * separation of concerns and aligns with FSD architecture principles.
 */

"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createChart,
  LineData,
  UTCTimestamp,
  ISeriesApi,
  LineSeries,
} from "lightweight-charts";
import { usePriceSocket } from "../model/usePriceSocket";

export default function LivePriceChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  const handlePriceUpdate = useCallback((point: LineData<UTCTimestamp>) => {
    lineSeriesRef.current?.update(point);
  }, []);

  usePriceSocket({ onPriceUpdate: handlePriceUpdate });

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const lineSeries = chart.addSeries(LineSeries);
    lineSeries.applyOptions({
      color: "#4caf50",
      lineWidth: 2,
    });
    lineSeriesRef.current = lineSeries;

    const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
    lineSeries.setData([
      { time: (now - 60) as UTCTimestamp, value: 100 },
      { time: (now - 30) as UTCTimestamp, value: 102 },
      { time: now as UTCTimestamp, value: 104 },
    ]);

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.remove();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />
  );
}
