import { useState, useRef, RefObject } from "react";
import {
  useSymbolListStore,
  filterSymbolsByQuery,
  findSymbolDisplayAndIndex,
} from "@/entities/symbol";
import { useSymbolFetchEffect } from "./useSymbolFetchEffect";
import { useSelectionLogic } from "./useSelectionLogic";
import { useAutoScrollEffect } from "./useAutoScrollEffect";
import { useConfirmHandler } from "./useConfirmHandler";
import { useRecentSymbols } from "./useRecentSymbol";

export function useSymbolSearch() {
  // 입력 상태 및 로딩 상태
  const [query, setQuery] = useState("");

  // 최근 검색 목록
  const { recentSymbols, addRecentSymbol } = useRecentSymbols();

  // symbol 목록 및 필터된 목록
  const { symbolList } = useSymbolListStore();
  const { filtered } = filterSymbolsByQuery(symbolList, query);

  // 먼저 상태 초기화
  const [focused, setFocused] = useState(false); // 또는 useSelectionLogic 내부 반환

  // 리스트 선택 인덱스 관리
  const { selectedIndex, setSelectedIndex } = useSelectionLogic(filtered);

  // 리스트 항목 자동 스크롤
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  useAutoScrollEffect(selectedItemRef as RefObject<HTMLElement>, selectedIndex);

  // 초기 symbolList 요청
  useSymbolFetchEffect(symbolList);

  // 확인 핸들러
  const { handleConfirm } = useConfirmHandler(
    symbolList,
    filtered,
    selectedIndex,
    setFocused,
    addRecentSymbol,
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
        setQuery(filtered[selectedIndex].symbol);
      }
      handleConfirm(filtered[selectedIndex].symbol);
    }
  };

  // 리스트 항목 클릭
  const handleItemClick = (symbol: string, index: number) => {
    setQuery(symbol);
    setSelectedIndex(index);
    handleConfirm(symbol);
  };

  // 최근 검색 클릭
  const handleRecentClick = (symbol: string) => {
    const result = findSymbolDisplayAndIndex(symbolList, filtered, symbol);
    if (!result) return;
    setQuery(symbol);
    setSelectedIndex(result.index);
    handleConfirm(symbol);
  };

  return {
    query,
    setQuery,
    filtered,
    focused,
    setFocused,
    selectedIndex,
    setSelectedIndex,
    selectedItemRef,
    recentSymbols,
    handleKeyDown,
    handleItemClick,
    handleRecentClick,
  };
}
