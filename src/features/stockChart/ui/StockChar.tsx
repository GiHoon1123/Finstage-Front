"use client";
import { RefObject } from "react";

interface chartType {
  chartRef: (node: HTMLDivElement | null) => void;
  tooltipRef: RefObject<HTMLDivElement | null>;
}

export default function StockChar({ chartRef, tooltipRef }: chartType) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
        data-testid="combined-chart"
      />
      <div
        ref={tooltipRef}
        style={{
          display: "none",
          zIndex: 9999,
          background: "transparent",
          color: "white",
          padding: "10px",
          fontSize: "14px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
