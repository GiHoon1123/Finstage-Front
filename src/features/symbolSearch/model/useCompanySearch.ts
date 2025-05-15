import { useState, useRef, RefObject } from "react";
import { useRecentSymbolStore } from "@/entities/symbol";
import { useFilteredSymbols } from "./useFilteredSymbols";
import { useSymbolFetchEffect } from "./useSymbolFetchEffect";
import { useSelectionLogic } from "./useSelectionLogic";
import { useAutoScrollEffect } from "./useAutoScrollEffect";
import { useConfirmHandler } from "./useConfirmHandler";

export function useCompanySearch() {
  // 입력 상태 및 로딩 상태
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // 최근 검색 목록
  const { recentSymbols } = useRecentSymbolStore();

  // 필터된 symbol 목록 계산
  const { filtered, symbolList } = useFilteredSymbols(query);

  // 선택 인덱스 관리
  const { selectedIndex, setSelectedIndex } = useSelectionLogic(filtered);

  // 리스트 항목 자동 스크롤
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  useAutoScrollEffect(selectedItemRef as RefObject<HTMLElement>, [
    selectedIndex,
  ]);

  // 초기 symbolList 요청
  useSymbolFetchEffect();

  // 확인 핸들러
  const { handleConfirm } = useConfirmHandler(
    filtered,
    selectedIndex,
    setLoading,
  );

  // 키보드 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        setQuery(
          `${filtered[selectedIndex].name} (${filtered[selectedIndex].symbol})`,
        );
      }
      handleConfirm(query);
    }
  };

  // 리스트 항목 클릭
  const handleItemClick = (display: string, index: number) => {
    setQuery(display);
    setSelectedIndex(index);
    handleConfirm(display);
  };

  // 최근 검색 클릭
  const handleRecentClick = (symbol: string) => {
    const found = symbolList.find((item) => item.symbol === symbol);
    if (!found) return;

    const display = `${found.name} (${found.symbol})`;
    const index = filtered.findIndex((item) => item.symbol === symbol);
    setQuery(display);
    setSelectedIndex(index);
    handleConfirm(display);
  };

  return {
    query,
    setQuery,
    loading,
    filtered,
    selectedIndex,
    setSelectedIndex,
    selectedItemRef,
    recentSymbols,
    handleKeyDown,
    handleItemClick,
    handleRecentClick,
  };
}
