// ChartWrapper.tsx
"use client";

import { useState, useCallback } from "react";
import CandlestickChart from "./CandlestickChart";
import VolumeChart from "./VolumeChart";
import type { IChartApi } from "lightweight-charts";

export default function ChartWrapper() {
  const [mainChart, setMainChart] = useState<IChartApi | null>(null);
  const [volumeChart, setVolumeChart] = useState<IChartApi | null>(null);

  const handleInitMainChart = useCallback((chart: IChartApi) => {
    setMainChart(chart);
  }, []);

  const handleInitVolumeChart = useCallback((chart: IChartApi) => {
    setVolumeChart(chart);
  }, []);

  // 동기화 연결
  if (mainChart && volumeChart) {
    const mainScale = mainChart.timeScale();
    const volumeScale = volumeChart.timeScale();

    mainScale.subscribeVisibleLogicalRangeChange((range) => {
      volumeScale.setVisibleLogicalRange(range);
    });

    volumeScale.subscribeVisibleLogicalRangeChange((range) => {
      mainScale.setVisibleLogicalRange(range);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div style={{ height: "400px" }}>
        <CandlestickChart onInit={handleInitMainChart} />
      </div>
      <div style={{ height: "100px" }}>
        <VolumeChart onInit={handleInitVolumeChart} />
      </div>
    </div>
  );
}
