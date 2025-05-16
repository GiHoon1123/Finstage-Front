import { useEffect, RefObject } from "react";

export function useMousedownEffect(
  ref: RefObject<HTMLElement | null>,
  setFocused: (v: boolean) => void,
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFocused]);
}
