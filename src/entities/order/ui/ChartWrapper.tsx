"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createChart,
  CandlestickData,
  CandlestickSeries,
  HistogramSeries,
  ISeriesApi,
  HistogramData,
} from "lightweight-charts";
import { useStockSocket } from "../model/useStockSocket";
import { useVolumeSocket } from "../model/useVolumeSocket";

export default function ChartTest() {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

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

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      localization: { locale: "ko" },
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        background: { color: "black" },
        textColor: "white",
        panes: {
          //패널 옵션
          separatorColor: "#333", //패널 색상
          separatorHoverColor: "rgba(166, 255, 0, 0.1)", //패널 반응 색상
          enableResize: true, //패널 사이즈 조정 유무
        },
      },
      grid: {
        horzLines: { color: "#333" },
        vertLines: { color: "#222" },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        rightOffset: 80, //오른쪽 여백(시작점)
        // rightBarStaysOnScroll: true,
        timeVisible: true,
      },

      handleScale: {
        axisPressedMouseMove: {
          price: false, //우측 y축
          time: false, //하단 x축 조정
        },
      },
      crosshair: {
        mode: 0, //마우스가 캔들에서 자유로워지는 모드
        // 수직선
        vertLine: {
          // width: 1,
          // style: 1,
          color: "#E2E3E5",
          labelBackgroundColor: "#A2F406",
        },
        // 수평선
        horzLine: {
          color: "#E2E3E5",
          labelBackgroundColor: "#A2F406",
        },
      },
    });

    // ✅ 캔들 시리즈 (주가)
    const candlestickSeries = chart.addSeries(CandlestickSeries);
    candlestickSeries.applyOptions({
      upColor: "#ef5350",
      downColor: "#0067a3",
      wickUpColor: "#ef5350",
      wickDownColor: "#0067a3",
      borderVisible: false,
    });
    candlestickSeries.priceScale().applyOptions({
      scaleMargins: {
        // positioning the price scale for the area series
        top: 0.1, //위쪽에 10%여백
        bottom: 0.4, //아래쪽에 40% 여백
      },
    });

    // ✅ 히스토그램 시리즈 (거래량)
    const volumeSeries = chart.addSeries(HistogramSeries);
    volumeSeries.applyOptions({
      lastValueVisible: true, //우측y 가격 표시유무
      priceLineVisible: false, //가격 라인 표시유무
      color: "#ef5350",
      priceFormat: {
        type: "volume",
      },
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.3, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });
    volumeSeries.moveToPane(1); //아래 패널
    const secondPane = volumeSeries.getPane();
    secondPane.setHeight(150);

    //차트 그리기
    candleSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;
    chart.timeScale().fitContent();
    // chart.removePane(1); //패널제거

    // 툴팁 생성 및 동기화
    chart.subscribeCrosshairMove((param) => {
      if (!tooltipRef.current) return;

      if (!param.time || !param.point) {
        // 마우스가 차트 밖으로 나간 경우 → 툴팁 숨김
        tooltipRef.current.style.display = "none";
        return;
      } else {
        tooltipRef.current.style.display = "block";
        tooltipRef.current.style.position = "absolute";
        tooltipRef.current.style.top = "0px";
        tooltipRef.current.style.left = "0px";
      }

      const candle = param.seriesData.get(candlestickSeries) as CandlestickData;
      const volume = param.seriesData.get(volumeSeries) as HistogramData;

      if (!candle || !volume) return;

      // const { point } = param;
      // tooltipRef.current.style.display = "block";
      // tooltipRef.current.style.left = `${point.x + 10}px`;
      // tooltipRef.current.style.top = `${point.y + 10}px`;
      // tooltipRef.current.innerText = `종가: ${candle.close}`;
      const text = [
        // `🕒 ${param.time}`,
        // `시가: ${candle?.open}`,
        `고가: ${candle?.high}`,
        `저가: ${candle?.low}`,
        `종가: ${candle?.close}`,
        `거래량: ${volume?.value}`,
      ].join(" | ");

      tooltipRef.current.innerText = text;
    });

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
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
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
