import { useEffect } from "react";
import { createSocket } from "../api/socket";
import type { CandleData } from "../types";

interface Props {
  onCandleUpdate: (data: CandleData) => void;
}

export function useStockSocket({ onCandleUpdate }: Props) {
  useEffect(() => {
    const socket = createSocket();

    socket.on("connect", () => {
      console.log("📡 socket.io connected");
    });

    socket.on("candle", (data) => {
      onCandleUpdate(data);
    });

    socket.on("disconnect", () => {
      console.log("❌ socket.io disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [onCandleUpdate]);
}
