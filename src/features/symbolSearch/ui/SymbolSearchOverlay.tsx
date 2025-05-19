import type { SymbolSearchOverlayProps } from "../types";

export default function SymbolSearchOverlay({
  focused,
  setFocused,
}: SymbolSearchOverlayProps) {
  if (focused) {
    return (
      <div
        className="symbol-search-overlay"
        onClick={() => setFocused(false)}
      />
    );
  }
}
