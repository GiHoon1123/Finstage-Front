"use client";
import { useEffect, useState } from "react";
import ChartWidget from "./ChartWidget";
import type { ChartWidgetBox } from "../types";

export default function ChartWidgetBox({ height = 60 }: ChartWidgetBox) {
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    const calculateHeight = () => {
      const newheight = Math.floor(window.innerHeight * (height * 0.01));
      setChartHeight(newheight);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <div style={{ height: `${chartHeight}px` }}>
      <ChartWidget />
    </div>
  );
}
