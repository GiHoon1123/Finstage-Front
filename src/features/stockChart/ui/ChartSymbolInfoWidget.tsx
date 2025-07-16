"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChartSymbolInfoWidget() {
  const chartRef = useRef<HTMLDivElement>(null);
  const segment = usePathname();
  const symbol = segment.split("/")[2];
  //   "symbol": "BINANCE:BTCUSDT",

  useEffect(() => {
    if (!chartRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "NASDAQ:${symbol}",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "kr",
          "largeChartUrl": "http://localhost:3000/stocks/${symbol}/analytics",
          "width": "100%"
        }`;
    chartRef.current.appendChild(script);
  }, []);

  return <div className="tradingview-widget-container" ref={chartRef}></div>;
}
