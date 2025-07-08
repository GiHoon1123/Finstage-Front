import { UTCTimestamp } from "lightweight-charts";

export interface CandleData {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface VolumeData {
  time: UTCTimestamp;
  value: number;
  color: string;
}

export interface PricePoint {
  time: number;
  value: number;
}

export type Kline = {
  symbol: string;
  interval: string;
  openTimestamp: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  baseVolume: number;
  quoteVolume: number;
  takerBuyBaseVolume: number;
  takerBuyQuoteVolume: number;
};
