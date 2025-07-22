import { featSymbolToStore } from "@/entities/symbol";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useSymbolFetchEffect() {
  const segment = usePathname();
  const symbol = segment.split("/")[2];

  useEffect(() => {
    featSymbolToStore(symbol);
  }, []);
}
