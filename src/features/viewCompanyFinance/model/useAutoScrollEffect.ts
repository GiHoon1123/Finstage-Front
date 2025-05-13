import { useEffect, RefObject, DependencyList } from "react";

export function useAutoScrollEffect(
  ref: RefObject<HTMLElement | null>,
  deps: DependencyList,
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: "nearest" });
    }
  }, deps);
}
