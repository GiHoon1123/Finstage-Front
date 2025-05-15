import { useEffect, RefObject } from "react";

export function useAutoScrollEffect(
  ref: RefObject<HTMLElement | null>,
  active: number,
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: "nearest" });
    }
  }, [active, ref]);
}
