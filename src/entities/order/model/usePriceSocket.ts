import { useEffect } from "react";
import { LineData, UTCTimestamp } from "lightweight-charts";

interface UsePriceSocketProps {
  onPriceUpdate: (data: LineData<UTCTimestamp>) => void;
}

export function usePriceSocket({ onPriceUpdate }: UsePriceSocketProps) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { time, value } = data;

        const pricePoint: LineData<UTCTimestamp> = {
          time: time as UTCTimestamp,
          value,
        };

        onPriceUpdate(pricePoint);
      } catch (error) {
        console.error("Invalid WebSocket message", error);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [onPriceUpdate]);
}
