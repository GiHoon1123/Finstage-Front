import { useEffect } from "react";
import { createSocket } from "../api/socket";
import type { VolumeData } from "../types";

interface Props {
  onCandleUpdate: (data: VolumeData) => void;
}

export function useVolumeSocket({ onCandleUpdate }: Props) {
  useEffect(() => {
    const socket = createSocket();

    socket.on("connect", () => {
      console.log("📡 socket.io connected");
    });

    socket.on("volumeCandle", (data) => {
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
