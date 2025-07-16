"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChartWidget() {
  const chartRef = useRef<HTMLDivElement>(null);
  const segment = usePathname();
  const symbol = segment.split("/")[2];
  //   "symbol": "BINANCE:BTCUSDT",

  useEffect(() => {
    if (!chartRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
            "allow_symbol_change": false,
            "calendar": false,
            "details": false,
            "hide_side_toolbar": false,
            "hide_top_toolbar": false,
            "hide_legend": false,
            "hide_volume": false,
            "hotlist": false,
            "interval": "D",
            "locale": "kr",
            "save_image": true,
            "style": "1",
            "symbol": "NASDAQ:${symbol}",
            "theme": "dark",
            "timezone": "Asia/Seoul",
            "backgroundColor": "#0F0F0F",
            "gridColor": "rgba(242, 242, 242, 0.06)",
            "watchlist": [],
            "withdateranges": false,
            "compareSymbols": [],
            "show_popup_button": true,
            "popup_height": "650",
            "popup_width": "1000",
            "studies": [],
            "autosize": true
        }`;
    chartRef.current.appendChild(script);

    return () => {
      chartRef.current = null;
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={chartRef}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}
