import { useEffect, useState } from "react";
import type { Symbol } from "@/entities/symbol";

export function useSelectionLogic(filtered: Symbol[]) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (filtered.length > 0 && selectedIndex === -1) {
      setSelectedIndex(0);
    } else if (filtered.length === 0) {
      setSelectedIndex(-1);
    }
  }, [filtered, selectedIndex]);

  return { selectedIndex, setSelectedIndex };
}
